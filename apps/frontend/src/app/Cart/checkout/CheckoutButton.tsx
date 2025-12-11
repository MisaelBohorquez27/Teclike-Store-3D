"use client";

interface CheckoutButtonProps {
  items?: any[];
  total?: number;
  className?: string;
  cartItems?: any[];
}

export function CheckoutButton({ 
  items = [], 
  cartItems = [], 
  total = 0, 
  className = "" 
}: CheckoutButtonProps) {
  // Usar cartItems si está disponible, si no items
  const itemsArray = cartItems.length > 0 ? cartItems : items;

  const handleCheckout = () => {
    if (itemsArray.length === 0) {
      alert("El carrito está vacío");
      return;
    }
    // Aquí implementarás la lógica de checkout
    alert("Funcionalidad de checkout en desarrollo");
  };

  return (
    <button
      onClick={handleCheckout}
      className={`bg-blue-600 text-white py-2 px-6 rounded hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
      disabled={itemsArray.length === 0}
    >
      {itemsArray.length === 0 ? "Carrito Vacío" : "Proceder al pago"}
    </button>
  );
}