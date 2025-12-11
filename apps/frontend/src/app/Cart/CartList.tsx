"use client";
import { CartResponse } from "@/types/cart";
import { CartItem } from "./CartItem";
import { useCartContext } from "@/context/CartContext";

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
    <div className="w-full lg:w-2/3">
      <div className="bg-transparent text-neutral rounded-lg p-6">
        {/* Encabezados */}
        <CartTableHeader />
        {[...cart.items]
          .sort((a, b) => b.id - a.id) // o por createdAt, o por product.name
          .map((item) => (
            <CartItem
              key={item.id}
              item={item}
              onUpdateQuantity={onUpdateQuantity!}
              onRemove={onRemove}
            />
          ))}

        {/* Botón vaciar carrito */}
        <ClearCartButton loading={loading} onClearCart={handleClearCart} />
      </div>
    </div>
  );
}

const CartLoadingState = () => (
  <div className="w-full lg:w-2/3">
    <div className="section-bg text-neutral rounded-lg shadow-md p-6 text-center">
      <p className="">Cargando carrito...</p>
    </div>
  </div>
);

const CartErrorState = ({ error }: { error: string }) => (
  <div className="w-full lg:w-2/3">
    <div className="section-bg text-neutral rounded-lg shadow-md p-6 text-center text-red-500">
      <p className="font-medium">Error al cargar el carrito</p>
      <p className="text-sm mt-1">{error}</p>
      <button
        onClick={() => window.location.reload()}
        className="mt-3 text-blue-600 hover:text-blue-800 text-sm"
      >
        Reintentar
      </button>
    </div>
  </div>
);

const CartEmptyState = () => (
  <div className="w-full lg:w-2/3">
    <div className="section-bg text-neutral rounded-lg shadow-md p-6 text-center">
      <p className="text-lg mb-4">
        No hay productos en el carrito
      </p>
      <a
        href="/products"
        className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
      >
        Continuar comprando
      </a>
    </div>
  </div>
);

const CartTableHeader = () => (
  <div className="hidden md:grid grid-cols-12 gap-4 mb-4 font-medium text-sm sm:text-base">
    <div className="col-span-5">Producto</div>
    <div className="col-span-2 text-center">Precio</div>
    <div className="col-span-3 text-center">Cantidad</div>
    <div className="col-span-2 text-right">Total</div>
  </div>
);

const ClearCartButton = ({
  loading,
  onClearCart,
}: {
  loading: boolean;
  onClearCart: () => void;
}) => (
  <div className="mt-4 flex justify-end">
    <button
      disabled={loading}
      onClick={onClearCart}
      className="flex items-center text-red-500 hover:text-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm font-medium"
      title="Eliminar todos los productos del carrito"
    >
      <TrashIcon />
      {loading ? "Vaciando..." : "Vaciar carrito"}
    </button>
  </div>
);

const TrashIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-4 w-4 mr-1"
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
