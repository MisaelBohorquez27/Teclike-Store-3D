"use client";
import { useCartContext } from "@/context/cartcontext";
import CartList from "./cartlist";
import { EmptyCart } from "./emptycart";
import CartSummary from "./cartsummary";
import { IoMdLock } from "react-icons/io";

export default function CartPage() {
  const {
    cart,
    loading,
    error,
    updateQuantity,
    removeFromCart,
    itemCount,
    clearCart,
  } = useCartContext();

  const handleUpdateQuantity = async (productId: number, quantity: number) => {
    const result = await updateQuantity(productId, quantity);
    return result.data as any;
  };

  const handleRemove = async (productId: number) => {
    const result = await removeFromCart(productId);
    return result.data as any;
  };

  const handleClearCart = async () => {
    if (!confirm("¿Estás seguro de que quieres vaciar el carrito?")) return;
    try {
      await clearCart(); // ← ya incluye getCart internamente
    } catch (err) {
      // Clear cart error
    }
  };

  const renderContent = () => {
    if (loading) return <CartPageLoading />;
    if (error) return <CartPageError error={error} />;

    // Verificar si realmente hay items en el carrito
    if (!cart || !cart.items || cart.items.length === 0) return <EmptyCart />;

    return (
      <div className="flex flex-col-reverse sm:flex-col lg:flex-row gap-6 sm:gap-8">
        <CartList
          cart={cart as any}
          onUpdateQuantity={handleUpdateQuantity}
          onRemove={handleRemove}
          onClearCart={handleClearCart}
        />
        <CartSummary cart={cart as any} itemCount={itemCount} />
      </div>
    );
  };

  return (
    <main className="bg-gray-100 text-gray-950 text-neutral min-h-screen pb-10 sm:pb-12 pt-8 sm:pt-10 md:pt-12">
      <div className="bg-transparent container mx-auto px-4 sm:px-6">
        <CartHeader itemCount={itemCount} loading={loading} />
        {renderContent()}
      </div>
    </main>
  );
}

// Subcomponents
const CartHeader = ({
  itemCount,
  loading,
}: {
  itemCount: number;
  loading: boolean;
}) => (
  <div className="flex justify-between items-center mb-6 sm:mb-8 border-b border-gray-300 pb-4">
    <div className="flex flex-row items-center gap-6">
      <h1 className="text-xl sm:text-2xl font-bold text-gray-900 pr-2">
        Carrito de Compras
      </h1>
      <p className="text-emerald-700 font-semibold flex items-center transform translate-y-0.5">
        <IoMdLock className="inline w-4 h-4 mr-2" />
        Todos los datos están protegidos
      </p>
    </div>

    {!loading && itemCount > 0 && (
      <span className="text-sm px-3 py-1 rounded-full">
        {itemCount} {itemCount === 1 ? "producto" : "productos"}
      </span>
    )}
  </div>
);

const CartPageLoading = () => (
  <div className="text-center py-12">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
    <p className="">Cargando tu carrito...</p>
  </div>
);

const CartPageError = ({ error }: { error: string }) => (
  <div className="text-center py-8">
    <div className="text-red-500 mb-4">
      <svg
        className="w-12 h-12 mx-auto"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
        />
      </svg>
    </div>
    <h3 className="text-lg font-medium mb-2">Error al cargar el carrito</h3>
    <p className=" mb-4">{error}</p>
    <button
      onClick={() => window.location.reload()}
      className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
    >
      Reintentar
    </button>
  </div>
);
