"use client";
import { CartResponse } from "@/types/cart";
import { CartItem } from "./cartitem";
import { useCartContext } from "@/context/cartcontext";

interface CartListProps {
  cart: CartResponse | null;
  onUpdateQuantity?: (
    productId: number,
    quantity: number
  ) => Promise<CartResponse>;
  onRemove: (productId: number) => Promise<CartResponse>;
}

export default function CartList({
  cart,
  onUpdateQuantity,
  onRemove,
  onClearCart,
}: CartListProps & { onClearCart: () => void }) {
  const { loading, error } = useCartContext();

  const handleClearCart = async () => {
    await onClearCart();
  };

  if (loading) return <CartLoadingState />;
  if (error) return <CartErrorState error={error} />;
  if (!cart || cart.items.length === 0) return <CartEmptyState />;

  return (
    <div className="w-full lg:w-2/3 mt-6 lg:mt-8">
      <div className="bg-transparent text-neutral rounded-lg p-4 sm:p-6">
        {/* Encabezados */}
        <CartTableHeader />
        
        {/* Items Grid */}
        <div className="space-y-4">
          {[...cart.items]
            .sort((a, b) => b.id - a.id)
            .map((item) => (
              <CartItem
                key={item.id}
                item={item}
                onUpdateQuantity={onUpdateQuantity!}
                onRemove={onRemove}
              />
            ))}
        </div>

        {/* Botón vaciar carrito */}
        <ClearCartButton loading={loading} onClearCart={handleClearCart} />
      </div>
    </div>
  );
}

const CartLoadingState = () => (
  <div className="w-full lg:w-2/3">
    <div className="section-bg text-neutral rounded-lg shadow-md p-8 sm:p-12 text-center">
      <p className="text-gray-400">Cargando carrito...</p>
    </div>
  </div>
);

const CartErrorState = ({ error }: { error: string }) => (
  <div className="w-full lg:w-2/3">
    <div className="section-bg text-neutral rounded-lg shadow-md p-6 sm:p-8 text-center">
      <p className="font-medium text-red-500 mb-2">Error al cargar el carrito</p>
      <p className="text-sm text-gray-400 mb-4">{error}</p>
      <button
        onClick={() => window.location.reload()}
        className="px-4 py-2 text-blue-600 hover:text-blue-800 text-sm font-medium"
      >
        Reintentar
      </button>
    </div>
  </div>
);

const CartEmptyState = () => (
  <div className="w-full lg:w-2/3">
    <div className="section-bg text-neutral rounded-lg shadow-md p-8 sm:p-12 text-center">
      <p className="text-lg sm:text-xl font-medium mb-4">
        No hay productos en el carrito
      </p>
      <a
        href="/products"
        className="inline-block bg-blue-600 text-white px-6 sm:px-8 py-2 sm:py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
      >
        Continuar comprando
      </a>
    </div>
  </div>
);

const CartTableHeader = () => (
  <div className="hidden md:grid grid-cols-12 gap-2 sm:gap-4 mb-4 px-4 sm:px-6 py-3 font-medium text-sm sm:text-base ">
    <div className="col-span-6">Producto</div>
    <div className="col-span-2 text-end">Precio</div>
    <div className="col-span-2 text-end">Cantidad</div>
    <div className="col-span-2 text-center">Total</div>
  </div>
);

const ClearCartButton = ({
  loading,
  onClearCart,
}: {
  loading: boolean;
  onClearCart: () => void;
}) => (
  <div className="mt-2 sm:mt-4 flex justify-end">
    <button
      disabled={loading}
      onClick={onClearCart}
      className="flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-2.5 text-red-500 hover:text-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm sm:text-base font-medium"
      title="Eliminar todos los productos del carrito"
    >
      <TrashIcon />
      <span>{loading ? "Vaciando..." : "Vaciar carrito"}</span>
    </button>
  </div>
);

const TrashIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-4 w-4"
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
);

