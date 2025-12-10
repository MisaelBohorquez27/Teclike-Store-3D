import * as cartRepo from "../repositories/cart.repository";
import * as cacheService from "./cache.service";
import { transformCart } from "../mappers/cart.formatter";
import crypto from "crypto";

function hashCart(cart: any): string {
  return crypto.createHash("md5").update(JSON.stringify(cart)).digest("hex");
}

async function getActiveCart(userId: number, isAuthenticated: boolean) {
  if (!isAuthenticated) {
    return null; // localStorage manejado en frontend
  }

  // Intentar obtener del caché primero (Redis)
  let cart = await cacheService.getCachedCart(userId);
  if (cart) return cart;

  // Si no está en caché, obtener de BD
  cart = await cartRepo.findCartWithProducts(userId);
  if (cart) {
    await cacheService.setCachedCart(userId, cart);
  }
  return cart;
}

export async function getCart(userId: number, isAuthenticated: boolean) {
  const cart = await getActiveCart(userId, isAuthenticated);
  if (!cart && isAuthenticated) throw new Error("Carrito no encontrado");
  return transformCart(cart);
}

export async function addToCart(
  userId: number,
  productId: number,
  quantity: number,
  isAuthenticated: boolean
) {
  const product = await cartRepo.findProductWithInventory(productId);
  if (!product) throw new Error("Producto no encontrado");

  const stock = product.inventory?.stock ?? 0;
  if (stock <= 0) throw new Error("Producto agotado");
  if (quantity > stock) throw new Error(`Solo hay ${stock} unidades disponibles`);

  if (!isAuthenticated) {
    return null; // localStorage manejado en frontend
  }

  let cart = await getActiveCart(userId, isAuthenticated);
  if (!cart) {
    await cartRepo.createCart(userId);
    cart = await cartRepo.findCartWithProducts(userId);
  }

  await cartRepo.addOrUpdateCartItem(cart!.id, productId, quantity, stock);

  const updatedCart = await cartRepo.findCartWithProducts(userId);
  await cacheService.setCachedCart(userId, updatedCart);
  await cacheService.markCartDirty(userId);
  return transformCart(updatedCart);
}

export async function updateCartItem(
  userId: number,
  productId: number,
  quantity: number,
  isAuthenticated: boolean
) {
  const product = await cartRepo.findProductWithInventory(productId);
  if (!product) throw new Error("Producto no encontrado");

  const stock = product.inventory?.stock ?? 0;
  if (quantity > stock) throw new Error(`Solo hay ${stock} unidades disponibles`);

  if (!isAuthenticated) {
    return null;
  }

  const cart = await getActiveCart(userId, isAuthenticated);
  if (!cart) throw new Error("Carrito no encontrado");

  await cartRepo.updateCartItem(cart.id, productId, quantity);
  const updatedCart = await cartRepo.findCartWithProducts(userId);
  await cacheService.setCachedCart(userId, updatedCart);
  await cacheService.markCartDirty(userId);
  return transformCart(updatedCart);
}

export async function removeFromCart(
  userId: number,
  productId: number,
  isAuthenticated: boolean
) {
  if (!isAuthenticated) {
    return null;
  }

  const cart = await getActiveCart(userId, isAuthenticated);
  if (!cart) throw new Error("Carrito no encontrado");

  await cartRepo.removeCartItem(cart.id, productId);
  const updatedCart = await cartRepo.findCartWithProducts(userId);
  await cacheService.setCachedCart(userId, updatedCart);
  await cacheService.markCartDirty(userId);
  return transformCart(updatedCart);
}

export async function clearCart(userId: number, isAuthenticated: boolean) {
  if (!isAuthenticated) {
    return null;
  }

  const cart = await cartRepo.findCart(userId);
  if (!cart) throw new Error("Carrito no encontrado");

  await cartRepo.clearCartItems(cart.id);
  await cacheService.deleteCachedCart(userId);
  await cacheService.cleanCartDirty(userId);
  const emptyCart = await cartRepo.findCartWithProducts(userId);
  return transformCart(emptyCart);
}

export async function syncCartToDB(userId: number, isAuthenticated: boolean) {
  if (!isAuthenticated) return;

  const isDirty = await cacheService.isCartDirty(userId);
  if (!isDirty) return;

  const cachedCart = await cacheService.getCachedCart(userId);
  if (!cachedCart) return;

  // Sincronizar con BD
  await cartRepo.updateCart(userId, cachedCart);
  await cacheService.setLastSyncTime(userId);
  await cacheService.cleanCartDirty(userId);
}

export async function mergeCartOnLogin(userId: number, localStorageCart: any) {
  try {
    // Obtener carrito de BD
    const dbCart = await cartRepo.findCartWithProducts(userId);

    if (!dbCart) {
      // Si no existe carrito en BD, crear uno con los items del localStorage
      if (localStorageCart && localStorageCart.items?.length > 0) {
        await cartRepo.createCart(userId);
        const newCart = await cartRepo.findCartWithProducts(userId);

        for (const item of localStorageCart.items) {
          await cartRepo.addOrUpdateCartItem(
            newCart!.id,
            item.productId,
            item.quantity,
            item.product.stock
          );
        }

        const mergedCart = await cartRepo.findCartWithProducts(userId);
        await cacheService.setCachedCart(userId, mergedCart);
        return transformCart(mergedCart);
      }
    } else {
      // Si existe carrito en BD, hacer merge inteligente
      if (localStorageCart && localStorageCart.items?.length > 0) {
        const mergedCart = await mergeCartItems(dbCart, localStorageCart, userId);
        await cacheService.setCachedCart(userId, mergedCart);
        return transformCart(mergedCart);
      } else {
        // No hay carrito local, usar el de BD
        await cacheService.setCachedCart(userId, dbCart);
        return transformCart(dbCart);
      }
    }
  } catch (error) {
    console.error("Error en merge de carrito:", error);
    throw error;
  }
}

async function mergeCartItems(dbCart: any, localCart: any, userId: number) {
  const cartId = dbCart.id;
  const mergedItems = new Map();

  // Agregar items de BD
  for (const item of dbCart.cartProducts) {
    mergedItems.set(item.productId, {
      productId: item.productId,
      quantity: item.quantity,
      source: "db",
    });
  }

  // Merge con items locales (suma cantidades)
  for (const item of localCart.items) {
    const existing = mergedItems.get(item.productId);
    if (existing) {
      existing.quantity += item.quantity;
      existing.source = "merged";
    } else {
      mergedItems.set(item.productId, {
        productId: item.productId,
        quantity: item.quantity,
        source: "local",
      });
    }
  }

  // Aplicar cambios a BD
  for (const [productId, item] of mergedItems) {
    const product = await cartRepo.findProductWithInventory(productId);
    if (product) {
      const stock = product.inventory?.stock ?? 0;
      const finalQuantity = Math.min(item.quantity, stock);
      await cartRepo.addOrUpdateCartItem(cartId, productId, finalQuantity, stock);
    }
  }

  // Retornar carrito actualizado
  const mergedCart = await cartRepo.findCartWithProducts(userId);
  return mergedCart;
}

export async function persistCartBeforeLogout(userId: number) {
  // Sincronizar carrito a BD antes de logout
  await syncCartToDB(userId, true);
}
