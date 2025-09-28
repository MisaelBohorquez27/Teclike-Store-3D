// app/Cart/CartList.tsx
"use client";
import { CartResponse } from "@/types/cart";
import { CartItem } from "./CartItem";
import { ProductForCart } from "@/types/productss";
import { mapCartItems } from "../utils/cartMapper";
import { useState } from "react";

interface CartListProps {
  cart: CartResponse;
  onUpdateQuantity: (productId: number, quantity: number) => Promise<void>;
  onRemoveItem: (productId: number) => Promise<void>;
  onClearCart: () => Promise<void>;
  onRefetch: () => Promise<void>;
}

export default function CartList({
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onRefetch,
}: CartListProps) {
  const [loading, setLoading] = useState(false);

  const handleUpdateQuantity = async (id: number, newQuantity: number) => {
    try {
      await onUpdateQuantity(id, newQuantity);
      await onRefetch();
    } catch (error) {
      console.error("Error al actualizar cantidad:", error);
    }
  };

  const handleRemoveItem = async (id: number) => {
    try {
      await onRemoveItem(id);
      await onRefetch();
    } catch (error) {
      console.error("Error al eliminar producto:", error);
    }
  };

  const handleClearCart = async () => {
    try {
      setLoading(true);
      await onClearCart();
      await onRefetch();
    } finally {
      setLoading(false);
    }
  };

  // Función segura para mapear items

  const localItems = mapCartItems(cart);

  if (localItems.length === 0) {
    return (
      <div className="w-full lg:w-2/3">
        <div className="CartProducts-bg rounded-lg shadow-md p-4 sm:p-5 md:p-6 text-center">
          <p>No hay productos en el carrito</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full lg:w-2/3">
      <div className="CartProducts-bg rounded-lg shadow-md p-4 sm:p-5 md:p-6">
        {/* Encabezados de la tabla (solo desktop) */}
        <div className="hidden md:grid grid-cols-12 gap-3 sm:gap-4 mb-3 sm:mb-4 font-medium text-sm sm:text-base text-gray-500">
          <div className="col-span-5">Producto</div>
          <div className="col-span-2 text-center">Precio</div>
          <div className="col-span-3 text-center">Cantidad</div>
          <div className="col-span-2 text-right">Total</div>
        </div>

        {/* Lista de productos */}
        <div className="divide-y">
          {localItems.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              onUpdateQuantity={handleUpdateQuantity}
              onRemove={handleRemoveItem}
            />
          ))}
        </div>

        {/* Botón para vaciar carrito (solo desktop) */}
        <div className="mt-4 flex justify-end sm:block">
          <button
            disabled={loading}
            onClick={handleClearCart}
            className="text-red-500 hover:text-red-700 flex items-center text-sm"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
            {loading ? "Vaciando..." : "Vaciar carrito"}
          </button>
        </div>
      </div>
    </div>
  );
}
