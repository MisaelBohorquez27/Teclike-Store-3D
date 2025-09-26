// hooks/useCart.ts
"use client";

import { useState, useEffect } from 'react';
import { CartService } from '@/services/cartService';
import { CartResponse } from '@/types/cart';

export const useCart = () => {
  const [cart, setCart] = useState<CartResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getCart = async () => {
    try {
      setLoading(true);
      setError(null);
      const cartData = await CartService.getCart();
      setCart(cartData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (productId: number, quantity: number = 1) => {
    try {
      setError(null);
      const updatedCart = await CartService.addToCart(productId, quantity);
      setCart(updatedCart);
      return updatedCart;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error desconocido';
      setError(errorMessage);
      throw err;
    }
  };

  const updateQuantity = async (productId: number, quantity: number) => {
    try {
      setError(null);
      const updatedCart = await CartService.updateQuantity(productId, quantity);
      setCart(updatedCart);
      return updatedCart;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error desconocido';
      setError(errorMessage);
      throw err;
    }
  };

  const removeFromCart = async (productId: number) => {
    try {
      setError(null);
      const updatedCart = await CartService.removeFromCart(productId);
      setCart(updatedCart);
      return updatedCart;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error desconocido';
      setError(errorMessage);
      throw err;
    }
  };

  const clearCart = async () => {
    try {
      setError(null);
      const result = await CartService.clearCart();
      setCart(null);
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error desconocido';
      setError(errorMessage);
      throw err;
    }
  };

  useEffect(() => {
    getCart();
  }, []);

  return {
    cart,
    loading,
    error,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    refetch: getCart
  };
};

// Exportar el tipo para que otros componentes lo usen
export type { CartResponse };