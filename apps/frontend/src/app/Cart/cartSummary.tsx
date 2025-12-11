"use client";
import { CheckoutButton } from "./checkout/CheckoutButton";
import { CartResponse } from "@/types/cart";

interface CartSummaryProps {
  cart: CartResponse | null;
  itemCount: number;
}

export default function CartSummary({ cart, itemCount }: CartSummaryProps) {
  if (!cart) {
    return (
      <div className="w-full lg:w-1/3">
        <div className="bg-gray-200 rounded-lg p-4 sm:p-5 md:p-6 lg:sticky lg:top-4 shadow-lg sm:shadow-none text-center text-gray-500">
          Tu carrito está vacío
        </div>
      </div>
    );
  }

  const { subtotal, shipping, tax, total, items: cartItems } = cart;

  return (
    <div className="w-full lg:w-1/3">
      <div className="bg-gray-200 rounded-lg p-4 sm:p-5 md:p-6 lg:sticky lg:top-4 shadow-lg">
        {/* Mobile floating bar */}
        <MobileFloatingBar total={total} cartItems={cartItems} />

        {/* Desktop summary */}
        <DesktopSummary
          subtotal={subtotal}
          shipping={shipping}
          tax={tax}
          total={total}
          itemCount={itemCount}
          cartItems={cartItems}
        />
      </div>
    </div>
  );
}

// Subcomponents
const MobileFloatingBar = ({
  total,
  cartItems,
}: {
  total: number;
  cartItems: any[];
}) => (
  <div className="fixed bottom-0 left-0 right-0 bg-white text-gray-950 border-t shadow-lg p-4 sm:hidden z-10">
    <div className="flex justify-between items-center">
      <div>
        <span className="font-bold text-base">Total:</span>
        <span className="ml-2 font-bold text-lg">${total.toFixed(2)}</span>
      </div>
      <CheckoutButton
        items={cartItems}
        total={total}
        className="py-2 px-4 text-sm"
      />
    </div>
  </div>
);

const DesktopSummary = ({
  subtotal,
  shipping,
  tax,
  total,
  itemCount,
  cartItems,
}: {
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  itemCount: number;
  cartItems: any[];
}) => (
  <div className="hidden sm:block">
    <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">
      Resumen del Pedido
    </h2>

    {/* Order Details */}
    <OrderDetails
      subtotal={subtotal}
      shipping={shipping}
      tax={tax}
      total={total}
      itemCount={itemCount}
    />

    {/* Checkout Section */}
    <CheckoutSection cartItems={cartItems} total={total} />

    {/* Help Section */}
    <HelpSection />
  </div>
);

const OrderDetails = ({
  subtotal,
  shipping,
  tax,
  total,
  itemCount,
}: {
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  itemCount: number;
}) => (
  <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
    <div className="flex justify-between text-sm sm:text-base">
      <span>Productos ({itemCount}):</span>
      <span>${subtotal.toFixed(2)}</span>
    </div>
    <div className="flex justify-between text-sm sm:text-base">
      <span>Envío:</span>
      <span className={shipping === 0 ? "text-green-600 font-medium" : ""}>
        {shipping === 0 ? "¡Gratis!" : `$${shipping.toFixed(2)}`}
      </span>
    </div>
    <div className="flex justify-between text-sm sm:text-base">
      <span>Impuestos:</span>
      <span>${tax.toFixed(2)}</span>
    </div>
    <div className="border-t pt-2 sm:pt-3 mt-2 sm:mt-3 flex justify-between font-bold text-base sm:text-lg">
      <span>Total:</span>
      <span>${total.toFixed(2)}</span>
    </div>
  </div>
);

const CheckoutSection = ({
  cartItems,
  total,
}: {
  cartItems: any[];
  total: number;
}) => (
  <div className="space-y-3">
    <CheckoutButton
      items={cartItems}
      total={total}
      className="w-full py-3 text-base font-medium"
    />
    {cartItems.length === 0 && (
      <p className="text-sm text-gray-500 text-center">
        Agrega productos al carrito para continuar
      </p>
    )}
  </div>
);

const HelpSection = () => (
  <div className="mt-3 sm:mt-4 text-xs sm:text-sm text-gray-500">
    <p className="mb-1">
      ¿Necesitas ayuda?{" "}
      <a
        href="/contact"
        className="text-blue-600 hover:text-blue-800 underline"
      >
        Contáctanos
      </a>
    </p>
    <p className="text-xs">Política de devoluciones de 30 días</p>
  </div>
);
