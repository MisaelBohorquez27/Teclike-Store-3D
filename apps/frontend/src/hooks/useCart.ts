// hooks/useCart.ts
'use client';

import { useState, useEffect } from 'react';
import { fetchCart, CartResponse, CartProduct } from '@/services/cart';

export const useCart = () => {
  const [cart, setCart] = useState<CartResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getCart = async () => {
    try {
      setLoading(true);
      setError(null);
      const cartData = await fetchCart();
      setCart(cartData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (productId: number, quantity: number = 1) => {
    try {
      const response = await fetch('http://localhost:5000/api/cart/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productId, quantity }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al agregar al carrito');
      }
      
      const updatedCart = await response.json();
      setCart(updatedCart);
      return updatedCart;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error desconocido';
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  };

  const updateQuantity = async (productId: number, quantity: number) => {
    try {
      const response = await fetch('http://localhost:5000/api/cart/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productId, quantity }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al actualizar el carrito');
      }
      
      const updatedCart = await response.json();
      setCart(updatedCart);
      return updatedCart;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error desconocido';
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  };

  const removeFromCart = async (productId: number) => {
    try {
      const response = await fetch('http://localhost:5000/api/cart/remove', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productId }),
      });
      
      if (!response.ok) {
        throw new Error('Error al eliminar del carrito');
      }
      
      const updatedCart = await response.json();
      setCart(updatedCart);
      return updatedCart;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error desconocido';
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  };

  const clearCart = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/cart/clear', {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error('Error al vaciar el carrito');
      }
      
      setCart(null);
      return { message: 'Carrito vaciado correctamente' };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error desconocido';
      setError(errorMessage);
      throw new Error(errorMessage);
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

// Exportar los tipos para que otros componentes los usen
export type { CartResponse, CartProduct };