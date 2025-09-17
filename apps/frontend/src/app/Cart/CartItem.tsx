// app/Cart/CartItem.tsx
"use client";

export interface CartItemType {
  id: string;
  name: string;
  price: number | undefined; // Permitir undefined
  quantity: number;
  imageUrl: string;
  inStock: boolean;
  stock?: number;
}

interface CartItemProps {
  item: CartItemType;
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
}

export function CartItem({ item, onUpdateQuantity, onRemove }: CartItemProps) {

  // Función segura para formatear precios
  const formatPrice = (price: number | undefined): string => {
    if (price === undefined || price === null || isNaN(price)) {
      return "$0.00";
    }
    return `$${price.toFixed(2)}`;
  };

  // Función segura para calcular total
  const calculateTotal = (price: number | undefined, quantity: number): string => {
    if (price === undefined || price === null || isNaN(price)) {
      return "$0.00";
    }
    return `$${(price * quantity).toFixed(2)}`;
  };

  // Manejar cambios de cantidad con validación
  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1 && newQuantity <= (item.stock || Infinity)) {
      onUpdateQuantity(item.id, newQuantity);
    }
  };

  return (
    <div className="py-3 sm:py-4 flex flex-row items-center gap-3 sm:gap-4 h-30 max-h-35">
      {/* Imagen y Nombre */}
      <div className="flex items-center w-full md:w-5/12">
        <div className="w-1/2">
          <img
            src={item.imageUrl || "/placeholder-product.jpg"}
            alt={item.name || "Producto"}
            className="w-auto h-auto max-w-20 max-h-20 sm:max-w-31 sm:min-h-21 xl:max-w-35 xl:min-h-25 object-cover rounded mr-2 sm:mr-4"
          />
        </div>
        <div className="w-1/2 flex flex-col justify-center items-center">
          <h3 className="font-medium text-sm sm:text-base">{item.name || "Producto sin nombre"}</h3>
          {!item.inStock && (
            <span className="text-red-500 text-xs sm:text-sm">Agotado</span>
          )}
          {item.inStock && item.stock !== undefined && item.stock < 5 && (
            <span className="text-orange-500 text-xs sm:text-sm">
              Solo {item.stock} disponibles
            </span>
          )}
        </div>
      </div>

      {/* Precio Unitario */}
      <div className="md:w-2/12 text-center text-gray-700 text-sm sm:text-base">
        {formatPrice(item.price)}
      </div>

      {/* Selector de Cantidad */}
      <div className="md:w-3/12 flex justify-center">
        <div className="flex items-center border rounded-md">
          <button
            onClick={() => handleQuantityChange(item.quantity - 1)}
            className="px-2 sm:px-3 py-1 text-gray-600 hover:bg-gray-100 text-sm sm:text-base"
            disabled={item.quantity <= 1}
          >
            -
          </button>
          <span className="px-2 sm:px-3 text-sm sm:text-base">
            {item.quantity}
          </span>
          <button
            onClick={() => handleQuantityChange(item.quantity + 1)}
            className="px-2 sm:px-3 py-1 text-gray-600 hover:bg-gray-100 text-sm sm:text-base"
            disabled={!item.inStock || (item.stock !== undefined && item.quantity >= item.stock)}
          >
            +
          </button>
        </div>
      </div>

      {/* Precio Total y Eliminar */}
      <div className="md:w-2/12 flex justify-end items-center space-x-2 sm:space-x-4">
        <span className="font-medium text-sm sm:text-base">
          {calculateTotal(item.price, item.quantity)}
        </span>
        <button
          onClick={() => onRemove(item.id)}
          className="text-red-500 hover:text-red-700 p-1 sm:p-0"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 sm:h-5 sm:w-5"
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
        </button>
      </div>
    </div>
  );
}