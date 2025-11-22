// Tipo para productos en la vista del carrito.
import { ProductForCart } from "@/types/productss";

// services/cart.ts
export interface CartItem {
  id: number;
  productId: number;
  quantity: number;
  product: ProductForCart;
}

// Respuesta del carrito desde el backend
export interface CartResponse {
  id: number;
  userId: number;
  items: CartItem[];
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
}
