import * as cartRepo from "../repositories/cart.repository";
import { transformCart } from "../mappers/Cart.formatter";

export async function getCart(userId: number) {
  const cart = await cartRepo.findCartWithProducts(userId);
  if (!cart) throw new Error("Carrito no encontrado");
  return transformCart(cart);
}

export async function addToCart(userId: number, productId: number, quantity: number) {
  const product = await cartRepo.findProductWithInventory(productId);
  if (!product) throw new Error("Producto no encontrado");

  const stock = product.inventory?.stock ?? 0;
  if (stock <= 0) throw new Error("Producto agotado");
  if (quantity > stock) throw new Error(`Solo hay ${stock} unidades disponibles`);

  let cart = await cartRepo.findCartWithProducts(userId);
  if (!cart) {
    await cartRepo.createCart(userId);
    cart = await cartRepo.findCartWithProducts(userId);
  }

  await cartRepo.addOrUpdateCartItem(cart!.id, productId, quantity, stock);

  const updatedCart = await cartRepo.findCartWithProducts(userId);
  return transformCart(updatedCart);
}

export async function updateCartItem(userId: number, productId: number, quantity: number) {
  const product = await cartRepo.findProductWithInventory(productId);
  if (!product) throw new Error("Producto no encontrado");

  const stock = product.inventory?.stock ?? 0;
  if (quantity > stock) throw new Error(`Solo hay ${stock} unidades disponibles`);

  const cart = await cartRepo.findCartWithProducts(userId);
  if (!cart) throw new Error("Carrito no encontrado");

  await cartRepo.updateCartItem(cart.id, productId, quantity);
  const updatedCart = await cartRepo.findCartWithProducts(userId);
  return transformCart(updatedCart);
}

export async function removeFromCart(userId: number, productId: number) {
  const cart = await cartRepo.findCartWithProducts(userId);
  if (!cart) throw new Error("Carrito no encontrado");

  await cartRepo.removeCartItem(cart.id, productId);
  const updatedCart = await cartRepo.findCartWithProducts(userId);
  return transformCart(updatedCart);
}

export async function clearCart(userId: number) {
  const cart = await cartRepo.findCart(userId);
  if (!cart) throw new Error("Carrito no encontrado");

  await cartRepo.clearCartItems(cart.id);
  const emptyCart = await cartRepo.findCartWithProducts(userId);
  return transformCart(emptyCart);
}
