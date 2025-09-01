'use client';

import { useState, useEffect } from 'react';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number; // Ahora viene del backend como precio normal (no cents)
  imageUrl?: string;
  inStock: boolean;
  stock: number;
}

interface CartProduct {
  id: number;
  productId: number;
  quantity: number;
  product: Product;
}

interface Cart {
  id: number;
  userId: number;
  items: CartProduct[];
}

export const useCart = () => {
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCart = async () => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:5000/api/cart`);

      if (!response.ok) {
        throw new Error('Error al obtener el carrito');
      }
      
      const cartData = await response.json();
      setCart(cartData);
    } catch (err) {
      const error = err as Error
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (productId: number, quantity: number = 1) => {
    try {
      const response = await fetch('/api/cart/add', {
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
      const error = err as Error;
      setError(error.message);
      throw error;
    }
  };

  const updateQuantity = async (productId: number, quantity: number) => {
    try {
      const response = await fetch('/api/cart/update', {
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
      const error = err as Error;
      setError(error.message);
      throw error;
    }
  };

  const removeFromCart = async (productId: number) => {
    try {
      const response = await fetch('/api/cart/remove', {
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
      const error = err as Error;
      setError(error.message);
      throw error;
    }
  };

  const clearCart = async () => {
    try {
      const response = await fetch('/api/cart/clear', {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error('Error al vaciar el carrito');
      }
      
      setCart(null);
      return { message: 'Carrito vaciado correctamente' };
    } catch (err) {
      const error = err as Error;
      setError(error.message);
      throw error;
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  return {
    cart,
    loading,
    error,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    refetch: fetchCart
  };
};