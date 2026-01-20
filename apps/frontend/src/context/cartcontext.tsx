"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { CartService } from "@/services/cart.service";
import type { CartResponse } from "@/types/cart";
import { useAuth } from "@/context/authcontext";

interface CartItem {
  id: string | number;
  productId: number;
  quantity: number;
  product?: any;
}

interface CartData {
  id: number;
  userId: number;
  items: CartItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  itemCount: number;
}

interface CartContextType {
  cart: CartData | null;
  loading: boolean;
  error: string | null;
  itemCount: number;
  addToCart: (
    productId: number, 
    quantity?: number,
    productData?: {
      name?: string;
      price?: number;
      priceString?: string;
      imageUrl?: string;
      description?: string;
    }
  ) => Promise<{ success: boolean; data: CartResponse }>;
  updateQuantity: (productId: number, quantity: number) => Promise<{ success: boolean; data: CartResponse }>;
  removeFromCart: (productId: number) => Promise<{ success: boolean; data: CartResponse }>;
  clearCart: () => Promise<{ success: boolean; data: CartResponse }>;
  refreshCart: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  const [cart, setCart] = useState<CartData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Función para cargar el carrito
  const loadCart = useCallback(async () => {
    if (!isAuthenticated) {
      setCart(null);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const response = await CartService.getCart();
      if (response.success && response.data) {
        setCart(response.data);
      }
    } catch (err: any) {
      const message = err.message || "Error al cargar el carrito";
      setError(message);
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated]);

  // Cargar carrito cuando el usuario se autentica
  useEffect(() => {
    loadCart();
  }, [loadCart]);

  // Agregar producto al carrito
  const addToCart = async (
    productId: number, 
    quantity: number = 1,
    productData?: {
      name?: string;
      price?: number;
      priceString?: string;
      imageUrl?: string;
      description?: string;
    }
  ) => {
    try {
      setError(null);
      const response = await CartService.addToCart(productId, quantity, productData);
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

  // Actualizar cantidad de un producto
  const updateQuantity = async (productId: number, quantity: number) => {
    try {
      setError(null);
      const response = await CartService.updateCartItem(productId, quantity);
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

  // Eliminar producto del carrito
  const removeFromCart = async (productId: number) => {
    try {
      setError(null);
      const response = await CartService.removeFromCart(productId);
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

  // Vaciar carrito
  const clearCart = async () => {
    try {
      setError(null);
      const response = await CartService.clearCart();
      if (response.success && response.data) {
        setCart(response.data);
      }
      return response;
    } catch (err: any) {
      const message = err.message || "Error al vaciar carrito";
      setError(message);
      console.error("❌ Error vaciando carrito:", message);
      throw err;
    }
  };

  // Refrescar carrito manualmente
  const refreshCart = async () => {
    await loadCart();
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        loading,
        error,
        itemCount: cart?.itemCount ?? 0,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        refreshCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCartContext() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCartContext must be used within a CartProvider");
  }
  return context;
}
