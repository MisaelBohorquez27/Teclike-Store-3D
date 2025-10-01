// utils/cartUtils.ts
import { Cart, CartProduct, Product } from "@prisma/client";

const TAX_RATE = 0.08;
const SHIPPING_THRESHOLD = 100; // envío gratis a partir de $100
const DEFAULT_SHIPPING = 9.99;

export const transformCart = (cart: any) => {
  if (!cart) return null;

  const items = cart.cartProducts.map((item: any) => ({
    id: item.id,
    productId: item.productId,
    quantity: item.quantity,
    product: {
      ...item.product,
      price: item.product.priceCents / 100,
      priceString: ("$" + (item.product.priceCents / 100).toFixed(2)),
      inStock: item.product.inventory
        ? item.product.inventory.stock > 0
        : false,
      stock: item.product.inventory ? item.product.inventory.stock : 0,
    },
  }));

  // Calcular subtotal
  const subtotal = items.reduce(
    (sum: number, item: any) => sum + item.product.price * item.quantity,
    0
  );

  // Calcular impuestos
  const tax = subtotal * TAX_RATE;

  // Calcular envío
  const shipping = subtotal >= SHIPPING_THRESHOLD || subtotal === 0 ? 0 : DEFAULT_SHIPPING;

  // Calcular total
  const total = subtotal + tax + shipping;

  return {
    id: cart.id,
    userId: cart.userId,
    items,
    subtotal,
    tax,
    shipping,
    total,
  };
};
