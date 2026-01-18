"use client";

import { useAuth } from "@/context/authcontext";
import { useCheckout } from "@/hooks/usecheckout";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface CheckoutSummaryProps {
  onProceedToPay?: () => void;
  isLoading?: boolean;
}

export function CheckoutSummaryCard({
  onProceedToPay,
  isLoading = false,
}: CheckoutSummaryProps) {
  const { summary, loading, error, formatTotal } = useCheckout();
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Redirigir al login si no está autenticado
    if (!loading && !isAuthenticated) {
      router.push("/login?redirect=/checkout");
    }
  }, [isAuthenticated, loading, router]);

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <div className="space-y-4">
          <div className="h-6 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-6 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-6 bg-gray-200 rounded animate-pulse"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <p className="text-red-800 font-semibold">⚠️ Error</p>
        <p className="text-red-600 text-sm">{error}</p>
      </div>
    );
  }

  if (!summary) {
    return (
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
        <p className="text-gray-600">No hay información de checkout disponible</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 sticky top-4">
      <h2 className="text-2xl font-bold mb-6">Resumen del Pedido</h2>

      {/* Detalles del carrito */}
      <div className="space-y-4 mb-6 pb-6 border-b border-gray-200">
        <div className="flex justify-between text-gray-600">
          <span>Items ({summary.itemCount})</span>
          <span>{formatTotal(summary.subtotal)}</span>
        </div>

        <div className="flex justify-between text-gray-600">
          <span>Impuestos (8%)</span>
          <span>{formatTotal(summary.tax)}</span>
        </div>

        <div className="flex justify-between text-gray-600">
          <span>Envío</span>
          <span className={summary.shipping === 0 ? "text-green-600 font-semibold" : ""}>
            {summary.shipping === 0 ? "Gratis" : formatTotal(summary.shipping)}
          </span>
        </div>
      </div>

      {/* Total */}
      <div className="mb-6">
        <div className="flex justify-between items-center">
          <span className="text-xl font-bold text-gray-900">Total</span>
          <span className="text-3xl font-bold text-blue-600">
            {formatTotal(summary.total)}
          </span>
        </div>
        <p className="text-sm text-gray-500 mt-1">
          Moneda: {summary.currency}
        </p>
      </div>

      {/* Botón de pago */}
      <button
        onClick={onProceedToPay}
        disabled={isLoading}
        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-bold py-3 px-4 rounded-lg transition duration-200"
      >
        {isLoading ? "Procesando..." : "Proceder al Pago"}
      </button>

      {/* Nota informativa */}
      <p className="text-xs text-gray-500 text-center mt-4">
        Haz clic en "Proceder al Pago" para continuar con tu compra
      </p>
    </div>
  );
}
