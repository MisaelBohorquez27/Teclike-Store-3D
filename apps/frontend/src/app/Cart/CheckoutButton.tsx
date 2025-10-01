"use client";

interface CheckoutButtonProps {
  items: any[];
  total: number;
  className?: string;
}

export function CheckoutButton({ items, className = "" }: CheckoutButtonProps) {
  const handleCheckout = () => {
    // Aquí implementarás la lógica de checkout
    alert("Funcionalidad de checkout en desarrollo");
  };

  return (
    <button
      onClick={handleCheckout}
      className={`bg-blue-600 text-white py-2 px-6 rounded hover:bg-blue-700 ${className}`}
      disabled={items.length === 0}
    >
      Proceder al pago
    </button>
  );
}