// app/Cart/CartSummary.tsx
"use client";
import { CartResponse } from "@/types/cart";
import { CheckoutButton } from "./CheckoutButton";

interface CartSummaryProps {
  cart: CartResponse;
}

export default function CartSummary({ cart }: CartSummaryProps) {
  
  const calculateSubtotal = (): number => {
    if (!cart?.items) return 0;
    
    return cart.items.reduce((sum, item) => {
      const price = parseInt(item.product?.price || "0");
      const quantity = item.quantity || 1;
      return sum + (price * quantity);
    }, 0);
  };

  const subtotal = calculateSubtotal();
  const shipping = subtotal > 100 ? 0 : 9.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const getLocalItems = () => {
    if (!cart?.items) return [];
    
    return cart.items.map(item => ({
      id: item.productId?.toString() || Math.random().toString(),
      name: item.product?.name || "Producto sin nombre",
      price: item.product?.price || 0,
      quantity: item.quantity || 1,
      imageUrl: item.product?.imageUrl || "/placeholder-product.jpg",
      inStock: item.product?.inStock || false,
      stock: item.product?.stock
    }));
  };

  const localItems = getLocalItems();

  return (
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
  );
}