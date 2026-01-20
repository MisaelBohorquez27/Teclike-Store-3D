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

export async function addOrUpdateCartItem(
  cartId: number, 
  productId: number, 
  quantity: number, 
  stock: number,
  priceCents: number = 0
) {
  const existing = await prisma.cartProduct.findFirst({ where: { cartId, productId } });
  
  if (existing) {
    // Si el producto YA existe, solo incrementar de a 1 (ignorar quantity enviada)
    const newQuantity = existing.quantity + 1;
    if (newQuantity > stock) throw new Error(`Solo hay ${stock} unidades disponibles`);
    const result = await prisma.cartProduct.update({ 
      where: { id: existing.id }, 
      data: { quantity: newQuantity, priceCents } 
    });
    return result;
  }
  
  // Si es nuevo, usar la quantity enviada
  if (quantity > stock) throw new Error(`Solo hay ${stock} unidades disponibles`);
  const result = await prisma.cartProduct.create({ 
    data: { cartId, productId, quantity, priceCents } 
  });
  return result;
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

export async function updateCart(userId: number, cart: any) {
  const existingCart = await prisma.cart.findUnique({
    where: { userId },
    include: { cartProducts: true },
  });

  if (!existingCart) return;

  // Limpiar items actuales
  await prisma.cartProduct.deleteMany({
    where: { cartId: existingCart.id },
  });

  // Agregar nuevos items
  for (const item of cart.cartProducts) {
    await prisma.cartProduct.create({
      data: {
        cartId: existingCart.id,
        productId: item.productId,
        quantity: item.quantity,
        priceCents: item.priceCents || 0,
      },
    });
  }

  // Actualizar timestamp
  await prisma.cart.update({
    where: { userId },
    data: { updatedAt: new Date() },
  });
}

export function updateCartTimestamp(userId: number) {
  return prisma.cart.update({
    where: { userId },
    data: { updatedAt: new Date() },
  });
}
