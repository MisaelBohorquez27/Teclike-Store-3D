"use client";

import { useState, useEffect } from "react";
import { CartServiceSimple } from "@/services/cartSimple";
import type { CartResponse as CartServiceResponse } from "@/services/cartSimple";
import { useAuth } from "@/context/AuthContext";

export interface CartResponse {
  success: boolean;
  data?: {
    id: number;
    userId: number;
    items: Array<{
      id: string | number;
      productId: number;
      quantity: number;
      product?: any;
    }>;
    total: number;
    itemCount: number;
  };
}

/**
 * Hook para manejar el carrito del usuario
 * Usa API simple sin Redis o sincronización compleja
 */
export function useCartSimple() {
  const { isAuthenticated } = useAuth();
  const [cart, setCart] = useState<CartResponse['data'] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Cargar carrito al montar o cuando autenticación cambia
  useEffect(() => {
    if (isAuthenticated) {
      loadCart();
    } else {
      setCart(null);
    }
  }, [isAuthenticated]);

  const loadCart = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await CartServiceSimple.getCart();
      if (response.success && response.data) {
        setCart(response.data);
      }
    } catch (err: any) {
      const message = err.message || "Error al cargar el carrito";
      setError(message);
      console.error("❌ Error cargando carrito:", message);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (productId: number, quantity: number = 1) => {
    try {
      setError(null);
      const response = await CartServiceSimple.addToCart(productId, quantity);
      if (response.success && response.data) {
        setCart(response.data);
      }
      return response;
    } catch (err: any) {
      const message = err.message || "Error al agregar al carrito";
      setError(message);
      throw err;
    }
  };

  const updateQuantity = async (productId: number, quantity: number) => {
    try {
      setError(null);
      const response = await CartServiceSimple.updateCartItem(productId, quantity);
      if (response.success && response.data) {
        setCart(response.data);
      }
      return response;
    } catch (err: any) {
      const message = err.message || "Error al actualizar cantidad";
      setError(message);
      throw err;
    }
  };

  const removeFromCart = async (productId: number) => {
    try {
      setError(null);
      const response = await CartServiceSimple.removeFromCart(productId);
      if (response.success && response.data) {
        setCart(response.data);
      }
      return response;
    } catch (err: any) {
      const message = err.message || "Error al remover del carrito";
      setError(message);
      throw err;
    }
  };

  const clearCart = async () => {
    try {
      setError(null);
      const response = await CartServiceSimple.clearCart();
      if (response.success && response.data) {
        setCart(response.data);
      }
      return response;
    } catch (err: any) {
      const message = err.message || "Error al vaciar carrito";
      setError(message);
      throw err;
    }
  };

  return {
    cart,
    loading,
    error,
    itemCount: cart?.itemCount ?? 0,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    loadCart,
  };
}
