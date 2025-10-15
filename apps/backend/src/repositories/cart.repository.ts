import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export function findCart(userId: number) {
  return prisma.cart.findUnique({ where: { userId } });
}

export function findCartWithProducts(userId: number) {
  return prisma.cart.findUnique({
    where: { userId },
    include: {
      cartProducts: {
        include: { product: { include: { inventory: true } } },
        orderBy: { id: "desc" },
      },
    },
  });
}

export function createCart(userId: number) {
  return prisma.cart.create({
    data: { user: { connect: { id: userId } } },
  });
}

export function findProductWithInventory(productId: number) {
  return prisma.product.findUnique({
    where: { id: productId },
    include: { inventory: true },
  });
}

export async function addOrUpdateCartItem(cartId: number, productId: number, quantity: number, stock: number) {
  const existing = await prisma.cartProduct.findFirst({ where: { cartId, productId } });
  if (existing) {
    const newQuantity = existing.quantity + quantity;
    if (newQuantity > stock) throw new Error(`Solo hay ${stock} unidades disponibles`);
    return prisma.cartProduct.update({ where: { id: existing.id }, data: { quantity: newQuantity } });
  }
  return prisma.cartProduct.create({ data: { cartId, productId, quantity } });
}

export async function updateCartItem(cartId: number, productId: number, quantity: number) {
  const existing = await prisma.cartProduct.findFirst({ where: { cartId, productId } });
  if (!existing) throw new Error("Producto no encontrado en el carrito");

  if (quantity <= 0) {
    return prisma.cartProduct.delete({ where: { id: existing.id } });
  }

  return prisma.cartProduct.update({ where: { id: existing.id }, data: { quantity } });
}

export async function removeCartItem(cartId: number, productId: number) {
  const existing = await prisma.cartProduct.findFirst({ where: { cartId, productId } });
  if (!existing) throw new Error("Producto no encontrado en el carrito");
  return prisma.cartProduct.delete({ where: { id: existing.id } });
}

export function clearCartItems(cartId: number) {
  return prisma.cartProduct.deleteMany({ where: { cartId } });
}
