import * as cartRepo from "../repositories/cart.repository";
import * as cacheService from "./cache.service";
import { transformCart } from "../mappers/cart.formatter";

/**
 * Obtener el carrito del usuario desde caché o BD
 * Primero intenta Redis, luego la BD
 */
async function getActiveCart(userId: number) {
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

/**
 * Obtener carrito del usuario
 * Solo para usuarios autenticados
 */
export async function getCart(userId: number) {
  const cart = await getActiveCart(userId);
  if (!cart) {
    // Si no existe carrito, crear uno
    await cartRepo.createCart(userId);
    const newCart = await cartRepo.findCartWithProducts(userId);
    await cacheService.setCachedCart(userId, newCart);
    return transformCart(newCart);
  }
  return transformCart(cart);
}

/**
 * Agregar producto al carrito
 * - Valida que el producto exista y tenga stock
 * - Guarda en caché primero (Redis)
 * - Marca como "dirty" para sincronizar después
 * - Solo para usuarios autenticados
 */
export async function addToCart(
  userId: number,
  productId: number,
  quantity: number
) {
  // Validar producto
  const product = await cartRepo.findProductWithInventory(productId);
  if (!product) throw new Error("Producto no encontrado");

  const stock = product.inventory?.stock ?? 0;
  if (stock <= 0) throw new Error("Producto agotado");
  if (quantity > stock) throw new Error(`Solo hay ${stock} unidades disponibles`);

  // Obtener o crear carrito
  let cart = await getActiveCart(userId);
  if (!cart) {
    await cartRepo.createCart(userId);
    cart = await cartRepo.findCartWithProducts(userId);
  }

  // Agregar o actualizar item en BD
  await cartRepo.addOrUpdateCartItem(cart!.id, productId, quantity, stock);

  // Actualizar caché
  const updatedCart = await cartRepo.findCartWithProducts(userId);
  await cacheService.setCachedCart(userId, updatedCart);
  
  // Marcar para sincronización
  await cacheService.markCartDirty(userId);

  return transformCart(updatedCart);
}

/**
 * Actualizar cantidad de un producto en el carrito
 * - Si quantity es 0, elimina el producto
 * - Valida stock disponible
 * - Guarda en caché y marca para sincronizar
 */
export async function updateCartItem(
  userId: number,
  productId: number,
  quantity: number
) {
  // Validar cantidad
  if (quantity < 0) throw new Error("Cantidad no puede ser negativa");

  // Si cantidad es 0, eliminar el producto
  if (quantity === 0) {
    return removeFromCart(userId, productId);
  }

  // Validar producto y stock
  const product = await cartRepo.findProductWithInventory(productId);
  if (!product) throw new Error("Producto no encontrado");

  const stock = product.inventory?.stock ?? 0;
  if (quantity > stock) throw new Error(`Solo hay ${stock} unidades disponibles`);

  // Obtener carrito
  const cart = await getActiveCart(userId);
  if (!cart) throw new Error("Carrito no encontrado");

  // Actualizar en BD
  await cartRepo.updateCartItem(cart.id, productId, quantity);

  // Actualizar caché
  const updatedCart = await cartRepo.findCartWithProducts(userId);
  await cacheService.setCachedCart(userId, updatedCart);
  
  // Marcar para sincronización
  await cacheService.markCartDirty(userId);

  return transformCart(updatedCart);
}

/**
 * Eliminar un producto del carrito
 * - Remueve del caché y marca para sincronizar
 */
export async function removeFromCart(
  userId: number,
  productId: number
) {
  // Obtener carrito
  const cart = await getActiveCart(userId);
  if (!cart) throw new Error("Carrito no encontrado");

  // Remover de BD
  await cartRepo.removeCartItem(cart.id, productId);

  // Actualizar caché
  const updatedCart = await cartRepo.findCartWithProducts(userId);
  await cacheService.setCachedCart(userId, updatedCart);
  
  // Marcar para sincronización
  await cacheService.markCartDirty(userId);

  return transformCart(updatedCart);
}

/**
 * Vaciar completamente el carrito
 * - Elimina todos los items
 * - Limpia caché
 */
export async function clearCart(userId: number) {
  // Obtener carrito
  const cart = await cartRepo.findCart(userId);
  if (!cart) throw new Error("Carrito no encontrado");

  // Eliminar todos los items
  await cartRepo.clearCartItems(cart.id);

  // Limpiar caché
  await cacheService.deleteCachedCart(userId);
  await cacheService.cleanCartDirty(userId);

  // Retornar carrito vacío
  const emptyCart = await cartRepo.findCartWithProducts(userId);
  return transformCart(emptyCart);
}

/**
 * Sincronizar carrito de caché a BD
 * Se ejecuta automáticamente cada 5 minutos o cuando está marcado como "dirty"
 */
export async function syncCartToDB(userId: number) {
  const isDirty = await cacheService.isCartDirty(userId);
  if (!isDirty) return;

  const cachedCart = await cacheService.getCachedCart(userId);
  if (!cachedCart) return;

  try {
    // Sincronizar con BD
    await cartRepo.updateCart(userId, cachedCart);
    await cacheService.setLastSyncTime(userId);
    await cacheService.cleanCartDirty(userId);
  } catch (error) {
    console.error(`Error sincronizando carrito del usuario ${userId}:`, error);
    throw error;
  }
}

/**
 * Hacer merge de carrito local (localStorage) con carrito de BD al login
 * - Si solo existe en BD, usar ese
 * - Si solo existe en localStorage, usar ese
 * - Si existen ambos, hacer merge inteligente (sumar cantidades respetando stock)
 */
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
          const product = await cartRepo.findProductWithInventory(item.productId);
          if (product) {
            const stock = product.inventory?.stock ?? 0;
            await cartRepo.addOrUpdateCartItem(
              newCart!.id,
              item.productId,
              item.quantity,
              stock
            );
          }
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

    // Si llegamos aquí, retornar carrito vacío
    if (!dbCart) {
      await cartRepo.createCart(userId);
      const newCart = await cartRepo.findCartWithProducts(userId);
      await cacheService.setCachedCart(userId, newCart);
      return transformCart(newCart);
    }

    return transformCart(dbCart);
  } catch (error) {
    console.error("Error en merge de carrito:", error);
    throw error;
  }
}

/**
 * Hacer merge inteligente de items de BD y localStorage
 * - Suma cantidades para el mismo producto
 * - Respeta el stock máximo disponible
 */
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

/**
 * Persistir carrito a BD antes de logout
 * Asegura que los últimos cambios se guarden
 */
export async function persistCartBeforeLogout(userId: number) {
  await syncCartToDB(userId);
}