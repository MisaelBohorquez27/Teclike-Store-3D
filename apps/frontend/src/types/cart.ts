// Tipo para productos en la vista del carrito.

import { ProductForCart } from "@/types/productss";

// services/cart.ts
export interface CartProduct {
  userId: number;
  productId: number;
  quantity: number;
  product: ProductForCart;
}

export interface CartResponse {
  id: number;
  userId: number;
  items: CartProduct[];
}