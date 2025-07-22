"use client";

import { useRouter } from "next/navigation";

type CheckoutButtonProps = {
  items: Array<{
    id: string;
    name: string;
    price: number;
    quantity: number;
    inStock: boolean;
  }>;
  total: number;
};

export function CheckoutButton({ items, total }: CheckoutButtonProps) {
  const router = useRouter();
  const hasOutOfStockItems = items.some((item) => !item.inStock);

  const handleCheckout = () => {
    // Aquí iría la lógica para procesar el pago
    // Por ahora solo redirigimos a una página de confirmación
    router.push("/checkout");
  };

  return (
    <button
      onClick={handleCheckout}
      disabled={hasOutOfStockItems || items.length === 0}
      className={`w-full py-3 rounded-lg font-medium transition-colors ${
        hasOutOfStockItems || items.length === 0
          ? "bg-gray-300 cursor-not-allowed"
          : "bg-green-600 hover:bg-green-700 text-white"
      }`}
    >
      {hasOutOfStockItems
        ? "Hay productos agotados"
        : items.length === 0
        ? "Carrito vacío"
        : `Pagar $${total.toFixed(2)}`}
    </button>
  );
}
