"use client";

import { useState, useCallback, useEffect } from "react";
import { CartService } from "@/services/Cart.service";
import { CartResponse } from "@/types/cart";
import { mapCartItems } from "@/utils/cartMapper";

interface UseCartReturn {
  cart: CartResponse | null;
  cartItems: ReturnType<typeof mapCartItems>;
  loading: boolean;
  error: string | null;
  itemCount: number;
  cartTotal: number;
  addToCart: (
    productId: number, 
    quantity?: number,
    productData?: {
      name?: string;
      price?: number;
      imageUrl?: string;
      description?: string;
    }
  ) => Promise<void>;
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
      const response = await CartService.getCart();
      setCart(response.data);
    } catch (err: any) {
      const errorMessage = err.message || "Error al cargar el carrito";
      console.error(errorMessage);
      setError(errorMessage);
      setCart(null);
    } finally {
      setLoading(false);
    }
  }, []);

  // Sincronizar carrito cuando el usuario se loguea
  const syncCartOnLogin = useCallback(async () => {
    try {
      setError(null);
      await fetchCart();
      console.log('✅ Carrito sincronizado después del login');
    } catch (err: any) {
      const errorMessage = err.message || "Error al sincronizar carrito";
      console.warn(errorMessage);
      // No lanzar error, solo avisar
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
    async (
      productId: number, 
      quantity: number = 1,
      productData?: {
        name?: string;
        price?: number;
        imageUrl?: string;
        description?: string;
      }
    ) => {
      try {
        setError(null);
        const response = await CartService.addToCart(productId, quantity, productData);
        setCart(response.data);
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
        const response = await CartService.updateCartItem(productId, quantity);
        setCart(response.data);
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
      const response = await CartService.removeFromCart(productId);
      setCart(response.data);
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
      const response = await CartService.clearCart();
      setCart(response.data);
    } catch (err: any) {
      const errorMessage = err.message || "Error al vaciar el carrito";
      setError(errorMessage);
      throw err;
    }
  }, []);

  // Calcular estadísticas del carrito
  const itemCount = cart?.itemCount || 0;
  const cartTotal = cart?.total || 0;
  
  // Verificar si producto está en carrito
  const isProductInCart = (productId: number): boolean => {
    return cart?.items?.some(item => item.productId === productId) || false;
  };

  // Obtener cantidad de un producto
  const getProductQuantity = (productId: number): number => {
    const item = cart?.items?.find(item => item.productId === productId);
    return item?.quantity || 0;
  };

  const cartItems = mapCartItems(cart);

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
    isProductInCart,
    getProductQuantity,
    refetchCart: fetchCart,
    syncCartOnLogin,
  };
};

export type { CartResponse };
