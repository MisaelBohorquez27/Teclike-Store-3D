"use client";
import { CartItem } from "./CartItem";
import { mapCartItems } from "../utils/cartMapper";
import { useCart } from "@/hooks/useCart";

export default function CartList() {
  const { cart, updateQuantity, removeFromCart, clearCart, refetch, loading, error } = useCart();

  if (loading) {
    return (
      <div className="w-full lg:w-2/3">
        <div className="CartProducts-bg rounded-lg shadow-md p-6 text-center">
          <p>Cargando carrito...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full lg:w-2/3">
        <div className="CartProducts-bg rounded-lg shadow-md p-6 text-center text-red-500">
          <p>Error: {error}</p>
        </div>
      </div>
    );
  }

  const localItems = cart ? mapCartItems(cart) : [];

  if (!localItems || localItems.length === 0) {
    return (
      <div className="w-full lg:w-2/3">
        <div className="CartProducts-bg rounded-lg shadow-md p-6 text-center">
          <p>No hay productos en el carrito</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full lg:w-2/3">
      <div className="CartProducts-bg rounded-lg shadow-md p-6">
        {/* Encabezados */}
        <div className="hidden md:grid grid-cols-12 gap-4 mb-4 font-medium text-sm sm:text-base text-gray-500">
          <div className="col-span-5">Producto</div>
          <div className="col-span-2 text-center">Precio</div>
          <div className="col-span-3 text-center">Cantidad</div>
          <div className="col-span-2 text-right">Total</div>
        </div>

        {/* Productos */}
        <div className="divide-y">
          {localItems.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              onUpdateQuantity={updateQuantity}
              onRemove={removeFromCart}
            />
          ))}
        </div>

        {/* Botón vaciar carrito */}
        <div className="mt-4 flex justify-end sm:block">
          <button
            disabled={loading}
            onClick={async () => {
              await clearCart();
              await refetch();
            }}
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
