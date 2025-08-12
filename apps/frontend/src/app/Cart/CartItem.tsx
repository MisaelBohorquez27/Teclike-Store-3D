"use client";

type CartItemProps = {
  item: {
    id: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
    inStock: boolean;
  };
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
};

export function CartItem({ item, onUpdateQuantity, onRemove }: CartItemProps) {
  return (
    <div className="py-3 sm:py-4 flex flex-col md:flex-row md:items-center gap-3 sm:gap-4">
      {/* Imagen y Nombre - Ajustado para móvil y desktop */}
      <div className="flex items-center w-full md:w-5/12">
        <img
          src={item.image}
          alt={item.name}
          className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded mr-3 sm:mr-4"
        />
        <div>
          <h3 className="font-medium text-sm sm:text-base">{item.name}</h3>
          {!item.inStock && (
            <span className="text-red-500 text-xs sm:text-sm">Agotado</span>
          )}
        </div>
      </div>

      {/* Precio Unitario - Optimizado para móvil */}
      <div className="md:w-2/12 text-center text-gray-700 text-sm sm:text-base">
        ${item.price.toFixed(2)}
      </div>

      {/* Selector de Cantidad - Mejorado para tactil */}
      <div className="md:w-3/12 flex justify-center">
        <div className="flex items-center border rounded-md">
          <button
            onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
            className="px-2 sm:px-3 py-1 text-gray-600 hover:bg-gray-100 text-sm sm:text-base"
            disabled={item.quantity <= 1}
          >
            -
          </button>
          <span className="px-2 sm:px-3 text-sm sm:text-base">
            {item.quantity}
          </span>
          <button
            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
            className="px-2 sm:px-3 py-1 text-gray-600 hover:bg-gray-100 text-sm sm:text-base"
          >
            +
          </button>
        </div>
      </div>

      {/* Precio Total y Eliminar - Ajuste de tamaño */}
      <div className="md:w-2/12 flex justify-end items-center space-x-2 sm:space-x-4">
        <span className="font-medium text-sm sm:text-base">
          ${(item.price * item.quantity).toFixed(2)}
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
