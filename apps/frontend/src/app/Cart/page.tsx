"use client";
import { useCart } from "@/hooks/useCart";
import CartList from "./CartList";
import { EmptyCart } from "./EmptyCart";
import CartSummary from "./cartSummary";

export default function CartPage() {
  const { cart, loading, error, updateQuantity, removeFromCart, clearCart, refetch } = useCart();

  if (loading) {
    return (
      <main className="Cart-bg min-h-screen pb-20 sm:pb-12 pt-24 sm:pt-28 md:pt-30">
        <div className="bg-transparent container mx-auto px-4 sm:px-6">
          <h1 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8">Carrito</h1>
          <div className="text-center py-8">Cargando carrito...</div>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="Cart-bg min-h-screen pb-20 sm:pb-12 pt-24 sm:pt-28 md:pt-30">
        <div className="bg-transparent container mx-auto px-4 sm:px-6">
          <h1 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8">Carrito</h1>
          <div className="text-center py-8 text-red-500">Error: {error}</div>
        </div>
      </main>
    );
  }

  const hasItems = cart && cart.items && cart.items.length > 0;

  return (
    <main className="Cart-bg min-h-screen pb-20 sm:pb-12 pt-24 sm:pt-28 md:pt-30">
      <div className="bg-transparent container mx-auto px-4 sm:px-6">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8">Carrito</h1>

        {!hasItems ? (
          <EmptyCart />
        ) : (
          <div className="flex flex-col-reverse sm:flex-col lg:flex-row gap-6 sm:gap-8">
            <CartList 
              cart={cart} 
              onUpdateQuantity={async (productId: number, quantity: number) => { await updateQuantity(productId, quantity); }}
              onRemoveItem={async (productId: number) => { await removeFromCart(productId); }}
              onClearCart={async () => { await clearCart(); }}
              onRefetch={refetch}
            />
            <CartSummary cart={cart} />
          </div>
        )}
      </div>
    </main>
  );
}