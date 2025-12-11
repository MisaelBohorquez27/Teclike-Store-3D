"use client";

import { useState, useCallback, useEffect } from "react";
import { CartService } from "@/services/cartService";
import { CartResponse } from "@/types/cart";
import { mapCartItems } from "@/utils/cartMapper";

interface UseCartReturn {
  cart: CartResponse | null;
  cartItems: ReturnType<typeof mapCartItems>;
  loading: boolean;
  error: string | null;
  itemCount: number;
  cartTotal: number;
  addToCart: (productId: number, quantity?: number) => Promise<void>;
  updateQuantity: (productId: number, quantity: number) => Promise<void>;
  removeFromCart: (productId: number) => Promise<void>;
  clearCart: () => Promise<void>;
  isProductInCart: (productId: number) => boolean;
  getProductQuantity: (productId: number) => number;
  refetchCart: () => Promise<void>;
  syncCartOnLogin: () => Promise<void>;
}

export const useCart = (): UseCartReturn => {
  const [cart, setCart] = useState<CartResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Obtener carrito al montar el componente
  const fetchCart = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const cartData = await CartService.getCart();
      setCart(cartData);
    } catch (err: any) {
      const errorMessage = err.message || "Error al cargar el carrito";
      console.error(errorMessage);
      setError(errorMessage);
      setCart(CartService.getEmptyCart());
    } finally {
      setLoading(false);
    }
  }, []);

  // Sincronizar carrito cuando el usuario se loguea
  const syncCartOnLogin = useCallback(async () => {
    try {
      setError(null);
      const syncedCart = await CartService.syncLocalCartWithServer();
      setCart(syncedCart);
      console.log('✅ Carrito sincronizado después del login');
    } catch (err: any) {
      const errorMessage = err.message || "Error al sincronizar carrito";
      console.warn(errorMessage);
      // No lanzar error, solo avisar
      await fetchCart(); // Cargar el carrito del servidor como fallback
    }
  }, [fetchCart]);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  // Iniciar sincronización automática cuando el usuario está autenticado
  useEffect(() => {
    if (CartService.isAuthenticated()) {
      console.log('🔄 Iniciando sincronización automática del carrito');
      CartService.startAutoSync();
    } else {
      console.log('⏹️ Deteniendo sincronización automática');
      CartService.stopAutoSync();
    }

    // Cleanup al desmontar
    return () => {
      CartService.stopAutoSync();
    };
  }, []);

  // Agregar al carrito
  const handleAddToCart = useCallback(
    async (productId: number, quantity: number = 1) => {
      try {
        setError(null);
        const updatedCart = await CartService.addToCart(productId, quantity);
        setCart(updatedCart);
      } catch (err: any) {
        const errorMessage = err.message || "Error al agregar al carrito";
        setError(errorMessage);
        throw err;
      }
    },
    []
  );

  // Actualizar cantidad
  const handleUpdateQuantity = useCallback(
    async (productId: number, quantity: number) => {
      try {
        setError(null);
        const updatedCart = await CartService.updateQuantity(productId, quantity);
        setCart(updatedCart);
      } catch (err: any) {
        const errorMessage = err.message || "Error al actualizar cantidad";
        setError(errorMessage);
        throw err;
      }
    },
    []
  );

  // Eliminar del carrito
  const handleRemoveFromCart = useCallback(async (productId: number) => {
    try {
      setError(null);
      const updatedCart = await CartService.removeFromCart(productId);
      setCart(updatedCart);
    } catch (err: any) {
      const errorMessage = err.message || "Error al eliminar del carrito";
      setError(errorMessage);
      throw err;
    }
  }, []);

  // Vaciar carrito
  const handleClearCart = useCallback(async () => {
    try {
      setError(null);
      const updatedCart = await CartService.clearCart();
      setCart(updatedCart);
    } catch (err: any) {
      const errorMessage = err.message || "Error al vaciar el carrito";
      setError(errorMessage);
      throw err;
    }
  }, []);

  const cartItems = mapCartItems(cart);
  const itemCount = CartService.getCartItemCount(cart);
  const cartTotal = CartService.getCartTotal(cart);

  return {
    cart,
    cartItems,
    loading,
    error,
    itemCount,
    cartTotal,
    addToCart: handleAddToCart,
    updateQuantity: handleUpdateQuantity,
    removeFromCart: handleRemoveFromCart,
    clearCart: handleClearCart,
    isProductInCart: (productId) => CartService.isProductInCart(cart, productId),
    getProductQuantity: (productId) => CartService.getProductQuantity(cart, productId),
    refetchCart: fetchCart,
    syncCartOnLogin,
  };
};

export type { CartResponse };
