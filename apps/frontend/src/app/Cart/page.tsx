"use client";
import { useState } from "react";
import { CartItem } from "@/app/Cart/CartItem";
import { EmptyCart } from "@/app/Cart/EmptyCart";
import { CheckoutButton } from "@/app/Cart/CheckoutButton";
import { Navbar } from "@/components/Navbar";

export default function CartPage() {
  const [cartItems, setCartItems] = useState([
    {
      id: "1",
      name: "Mouse",
      price: 49.99,
      quantity: 1,
      image: "/products/mouse-x11.png",
      inStock: true,
    },
    {
      id: "2",
      name: "Teclado",
      price: 79.99,
      quantity: 2,
      image: "/products/teclado-z11.png",
      inStock: true,
    },
    {
      id: "3",
      name: "Audifonos",
      price: 29.99,
      quantity: 1,
      image: "/products/audifonos-razer.png",
      inStock: false,
    },
  ]);

  const updateQuantity = (id: string, newQuantity: number) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, newQuantity) } : item
      )
    );
  };

  const removeItem = (id: string) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = subtotal > 100 ? 0 : 9.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  return (

      <main className="Cart-bg min-h-screen pb-20 sm:pb-12 pt-24 sm:pt-28 md:pt-30">
        <div className="bg-transparent container mx-auto px-4 sm:px-6">
          <h1 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8">
            Carrito
          </h1>

          {cartItems.length === 0 ? (
            <EmptyCart />
          ) : (
            <div className="flex flex-col-reverse sm:flex-col lg:flex-row gap-6 sm:gap-8">
              {/* Lista de Productos - Ahora va después en el DOM pero aparece abajo por flex-col-reverse */}
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
                    {cartItems.map((item) => (
                      <CartItem
                        key={item.id}
                        item={item}
                        onUpdateQuantity={updateQuantity}
                        onRemove={removeItem}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Resumen del Pedido - Ahora primero en el DOM pero aparece arriba en mobile */}
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
                        items={cartItems}
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
                      items={cartItems}
                      total={total}
                      className="hidden sm:block"
                    />

                    <div className="mt-3 sm:mt-4 text-xs sm:text-sm text-gray-500 hidden sm:block">
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
