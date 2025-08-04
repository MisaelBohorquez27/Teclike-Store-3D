"use client";
import { useState } from "react";
import { CartItem } from "@/app/Cart/CartItem";
import { EmptyCart } from "@/app/Cart/EmptyCart";
import { CheckoutButton } from "@/app/Cart/CheckoutButton";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function CartPage() {
  const [cartItems, setCartItems] = useState([
    {
      id: "1",
      name: "Modelo 3D Sala Moderna",
      price: 49.99,
      quantity: 1,
      image: "/products/living-room.jpg",
      inStock: true,
    },
    {
      id: "2",
      name: "Paquete de Muebles Vintage",
      price: 79.99,
      quantity: 2,
      image: "/products/furniture-pack.jpg",
      inStock: true,
    },
    {
      id: "3",
      name: "Lámpara Minimalista LED",
      price: 29.99,
      quantity: 1,
      image: "/products/lamp.jpg",
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
    <>
      <Navbar />
      <main className="bg-gray-50 min-h-screen py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-8">Carrito</h1>

          {cartItems.length === 0 ? (
            <EmptyCart />
          ) : (
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Lista de Productos */}
              <div className="lg:w-2/3">
                <div className="bg-white rounded-lg shadow-md p-6">
                  <div className="hidden md:grid grid-cols-12 gap-4 mb-4 font-medium text-gray-500">
                    <div className="col-span-5">Producto</div>
                    <div className="col-span-2 text-center">Precio</div>
                    <div className="col-span-3 text-center">Cantidad</div>
                    <div className="col-span-2 text-right">Total</div>
                  </div>

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

              {/* Resumen del Pedido */}
              <div className="lg:w-1/3">
                <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
                  <h2 className="text-xl font-bold mb-4">Resumen del Pedido</h2>

                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between">
                      <span>Subtotal:</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Envío:</span>
                      <span>
                        {shipping === 0 ? "Gratis" : `$${shipping.toFixed(2)}`}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Impuestos (8%):</span>
                      <span>${tax.toFixed(2)}</span>
                    </div>
                    <div className="border-t pt-3 mt-3 flex justify-between font-bold text-lg">
                      <span>Total:</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </div>

                  <CheckoutButton items={cartItems} total={total} />

                  <div className="mt-4 text-sm text-gray-500">
                    <p>
                      ¿Necesitas ayuda?{" "}
                      <a href="#" className="text-blue-600">
                        Contáctanos
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
