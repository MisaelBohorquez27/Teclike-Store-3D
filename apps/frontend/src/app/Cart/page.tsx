"use client";
import { useState, useEffect } from "react";
import { CartItem } from "@/app/Cart/CartItem";
import { EmptyCart } from "@/app/Cart/EmptyCart";
import { CheckoutButton } from "@/app/Cart/CheckoutButton";
import { useCart } from "@/hooks/useCart";

export default function CartPage() {
  const { cart, loading, error, updateQuantity, removeFromCart, clearCart } = useCart();
  
  type LocalCartItem = {
    id: string;
    name: string;
    price: number | undefined; // Añadimos undefined
    quantity: number;
    imageUrl: string;
    inStock: boolean;
    stock?: number;
  };

  const [localItems, setLocalItems] = useState<LocalCartItem[]>([]);

  // Sincronizar los datos del carrito con el estado local
  useEffect(() => {
    if (cart && cart.items) {
      setLocalItems(
        cart.items.map(item => ({
          id: item.productId.toString(),
          name: item.product.name || "Producto sin nombre",
          price: item.product.price, // Podría ser undefined
          quantity: item.quantity,
          imageUrl: item.product.imageUrl || "/placeholder-product.jpg",
          inStock: item.product.inStock || false,
          stock: item.product.stock
        }))
      );
    } else {
      setLocalItems([]);
    }
  }, [cart]);

  // Función segura para cálculos
  const safeCalculateSubtotal = (items: LocalCartItem[]): number => {
    return items.reduce((sum, item) => {
      const itemPrice = item.price || 0;
      return sum + itemPrice * item.quantity;
    }, 0);
  };

  const handleUpdateQuantity = async (id: string, newQuantity: number) => {
    try {
      await updateQuantity(parseInt(id), newQuantity);
    } catch (error) {
      console.error("Error al actualizar cantidad:", error);
    }
  };

  const handleRemoveItem = async (id: string) => {
    try {
      await removeFromCart(parseInt(id));
    } catch (error) {
      console.error("Error al eliminar producto:", error);
    }
  };

  const handleClearCart = async () => {
    try {
      await clearCart();
      setLocalItems([]);
    } catch (error) {
      console.error("Error al vaciar el carrito:", error);
    }
  };

  const subtotal = safeCalculateSubtotal(localItems);
  const shipping = subtotal > 100 ? 0 : 9.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  // ... el resto del código permanece igual

  if (loading) {
    return (
      <main className="Cart-bg min-h-screen pb-20 sm:pb-12 pt-24 sm:pt-28 md:pt-30">
        <div className="bg-transparent container mx-auto px-4 sm:px-6">
          <h1 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8">Carrito</h1>
          <div className="text-center py-8">Cargando carrito...</div>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="Cart-bg min-h-screen pb-20 sm:pb-12 pt-24 sm:pt-28 md:pt-30">
        <div className="bg-transparent container mx-auto px-4 sm:px-6">
          <h1 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8">Carrito</h1>
          <div className="text-center py-8 text-red-500">Error: {error}</div>
        </div>
      </main>
    );
  }

  return (
    <main className="Cart-bg min-h-screen pb-20 sm:pb-12 pt-24 sm:pt-28 md:pt-30">
      <div className="bg-transparent container mx-auto px-4 sm:px-6">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8">
          Carrito
        </h1>

        {localItems.length === 0 ? (
          <EmptyCart />
        ) : (
          <div className="flex flex-col-reverse sm:flex-col lg:flex-row gap-6 sm:gap-8">
            {/* Lista de Productos */}
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
                    Vaciar carrito
                  </button>
                </div>
              </div>
            </div>

            {/* Resumen del Pedido */}
            <div className="w-full lg:w-1/3">
              <div className="CartSummary-bg rounded-lg p-4 sm:p-5 md:p-6 lg:sticky lg:top-4 shadow-lg sm:shadow-none">
                {/* Barra flotante solo en mobile */}
                <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg p-4 sm:hidden z-10">
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="font-bold text-base">Total:</span>
                      <span className="ml-2 font-bold text-lg">
                        ${total.toFixed(2)}
                      </span>
                    </div>
                    <CheckoutButton
                      items={localItems}
                      total={total}
                      className="py-2 px-4 text-sm"
                    />
                  </div>
                </div>

                {/* Resumen completo (visible en desktop y tablet) */}
                <div className="hidden sm:block">
                  <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">
                    Resumen del Pedido
                  </h2>

                  <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
                    <div className="flex justify-between text-sm sm:text-base">
                      <span>Subtotal:</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm sm:text-base">
                      <span>Envío:</span>
                      <span>
                        {shipping === 0
                          ? "Gratis"
                          : `$${shipping.toFixed(2)}`}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm sm:text-base">
                      <span>Impuestos (8%):</span>
                      <span>${tax.toFixed(2)}</span>
                    </div>
                    <div className="border-t pt-2 sm:pt-3 mt-2 sm:mt-3 flex justify-between font-bold text-base sm:text-lg">
                      <span>Total:</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </div>

                  <CheckoutButton
                    items={localItems}
                    total={total}
                    className="w-full py-3 text-base"
                  />

                  {/* Botón para vaciar carrito en mobile dentro del resumen */}
                  <button
                    onClick={handleClearCart}
                    className="w-full mt-3 text-red-500 hover:text-red-700 flex items-center justify-center text-sm sm:hidden"
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
                    Vaciar carrito
                  </button>

                  <div className="mt-3 sm:mt-4 text-xs sm:text-sm text-gray-500">
                    <p>
                      ¿Necesitas ayuda?{" "}
                      <a
                        href="#"
                        className="text-blue-600 hover:text-blue-800"
                      >
                        Contáctanos
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}