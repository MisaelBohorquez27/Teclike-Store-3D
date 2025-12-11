"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { CartServiceSimple } from "@/services/cartSimple";
import type { CartResponse as CartServiceResponse } from "@/services/cartSimple";
import { useAuth } from "@/context/AuthContext";

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
  total: number;
  itemCount: number;
  subtotal?: number;
  shipping?: number;
  tax?: number;
}

interface CartContextType {
  cart: CartData | null;
  loading: boolean;
  error: string | null;
  itemCount: number;
  addToCart: (productId: number, quantity?: number) => Promise<CartServiceResponse>;
  updateQuantity: (productId: number, quantity: number) => Promise<CartServiceResponse>;
  removeFromCart: (productId: number) => Promise<CartServiceResponse>;
  clearCart: () => Promise<CartServiceResponse>;
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
      console.log('🔄 Cargando carrito desde CartContext...');
      const response = await CartServiceSimple.getCart();
      if (response.success && response.data) {
        setCart(response.data);
        console.log('✅ Carrito cargado:', response.data);
      }
    } catch (err: any) {
      const message = err.message || "Error al cargar el carrito";
      setError(message);
      console.error("❌ Error cargando carrito:", message);
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated]);

  // Cargar carrito cuando el usuario se autentica
  useEffect(() => {
    loadCart();
  }, [loadCart]);

  // Agregar producto al carrito
  const addToCart = async (productId: number, quantity: number = 1) => {
    try {
      setError(null);
      console.log(`🔍 [CONTEXT] addToCart llamado - productId=${productId}, quantity=${quantity}`);
      const response = await CartServiceSimple.addToCart(productId, quantity);
      if (response.success && response.data) {
        setCart(response.data);
        console.log(`✅ [CONTEXT] Producto agregado - itemCount=${response.data.itemCount}`);
      }
      return response;
    } catch (err: any) {
      const message = err.message || "Error al agregar al carrito";
      setError(message);
      console.error("❌ Error agregando al carrito:", message);
      throw err;
    }
  };

  // Actualizar cantidad de un producto
  const updateQuantity = async (productId: number, quantity: number) => {
    try {
      setError(null);
      console.log(`🔄 Actualizando cantidad del producto ${productId} a ${quantity}...`);
      const response = await CartServiceSimple.updateCartItem(productId, quantity);
      if (response.success && response.data) {
        setCart(response.data);
        console.log('✅ Cantidad actualizada');
      }
      return response;
    } catch (err: any) {
      const message = err.message || "Error al actualizar cantidad";
      setError(message);
      console.error("❌ Error actualizando cantidad:", message);
      throw err;
    }
  };

  // Eliminar producto del carrito
  const removeFromCart = async (productId: number) => {
    try {
      setError(null);
      console.log(`🗑️ Eliminando producto ${productId} del carrito...`);
      const response = await CartServiceSimple.removeFromCart(productId);
      if (response.success && response.data) {
        setCart(response.data);
        console.log('✅ Producto eliminado');
      }
      return response;
    } catch (err: any) {
      const message = err.message || "Error al remover del carrito";
      setError(message);
      console.error("❌ Error eliminando del carrito:", message);
      throw err;
    }
  };

  // Vaciar carrito
  const clearCart = async () => {
    try {
      setError(null);
      console.log('🧹 Vaciando carrito...');
      const response = await CartServiceSimple.clearCart();
      if (response.success && response.data) {
        setCart(response.data);
        console.log('✅ Carrito vaciado');
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
