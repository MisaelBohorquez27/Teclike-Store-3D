/**
 * Producto en el carrito
 */
export interface CartItem {
  id: number;
  productId: number;
  quantity: number;
  product: {
    id: number;
    name: string;
    description: string;
    priceCents: number;
    price: number;
    priceString: string;
    imageUrl: string | null;
    inStock: boolean;
    stock: number;
  };
}

/**
 * DTO del carrito completo
 */
export interface CartDTO {
  id: number;
  userId: number;
  items: CartItem[];
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  itemCount?: number;
}

/**
 * Carrito en caché (localStorage del cliente)
 */
export interface LocalCart {
  items: Array<{
    productId: number;
    quantity: number;
  }>;
  updatedAt: string;
}

/**
 * Request para sincronizar carrito
 */
export interface SyncRequest {
  localCart: LocalCart;
  lastSync?: string;
}

/**
 * Resultado de sincronización del carrito
 */
export interface CartSyncResult {
  cart: CartDTO;
  requiresFullSync: boolean;
  merged: boolean;
}