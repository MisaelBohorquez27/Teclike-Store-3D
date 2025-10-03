"use client";

import { useState, useEffect, useCallback, useMemo } from 'react';
import { CartService } from '@/services/cartService';
import { CartResponse } from '@/types/cart';
import { mapCartItems } from '@/app/utils/cartMapper';

interface UseCartReturn {
  cart: CartResponse | null;
  cartItems: ReturnType<typeof mapCartItems>;
  loading: boolean;
  error: string | null;
  addToCart: (productId: number, quantity?: number) => Promise<CartResponse>;
  updateQuantity: (productId: number, quantity: number) => Promise<CartResponse>;
  removeFromCart: (productId: number) => Promise<CartResponse>;
  clearCart: () => Promise<{ message: string }>;
  refetch: () => Promise<void>;
  itemCount: number;
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
}

export const useCart = (): UseCartReturn => {
  const [cart, setCart] = useState<CartResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const cartItems = useMemo(() => mapCartItems(cart), [cart]);

  const itemCount = useMemo(
    () => cartItems.reduce((count, item) => count + item.quantity, 0),
    [cartItems]
  );

  // ⚡ Ahora usamos directamente los valores del backend
  const subtotal = cart?.subtotal ?? 0;
  const tax = cart?.tax ?? 0;
  const shipping = cart?.shipping ?? 0;
  const total = cart?.total ?? 0;

  const getCart = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const cartData = await CartService.getCart();
      setCart(cartData);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Error desconocido al cargar el carrito';
      setError(errorMessage);
      console.error('Error en getCart:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const addToCart = useCallback(async (productId: number, quantity: number = 1): Promise<CartResponse> => {
    const updatedCart = await CartService.addToCart(productId, quantity);
    setCart(updatedCart);
    return updatedCart;
  }, []);

  const removeFromCart = useCallback(async (productId: number): Promise<CartResponse> => {
    const updatedCart = await CartService.removeFromCart(productId);
    setCart(updatedCart);
    return updatedCart;
  }, []);

  const updateQuantity = useCallback(
    async (productId: number, quantity: number): Promise<CartResponse> => {
      if (quantity === 0) return await removeFromCart(productId);
      const updatedCart = await CartService.updateQuantity(productId, quantity);
      setCart(updatedCart);
      return updatedCart;
    },
    [removeFromCart]
  );

  const clearCart = useCallback(async (): Promise<{ message: string }> => {
  const result = await CartService.clearCart();
  await getCart(); // ← esto asegura que el estado se actualice correctamente
  return result;
}, [getCart]);

  useEffect(() => {
    getCart();
  }, [getCart]);

  return {
    cart,
    cartItems,
    loading,
    error,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    refetch: getCart,
    itemCount,
    subtotal,
    tax,
    shipping,
    total,
  };
};

export type { CartResponse };
