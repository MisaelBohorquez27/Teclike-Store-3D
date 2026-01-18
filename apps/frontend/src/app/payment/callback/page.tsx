"use client";

import { Suspense } from "react";
import { PaymentCallbackContent } from "./PaymentCallbackContent";

/**
 * Página de callback después del pago con Payphone
 * 
 * Payphone redirige aquí después de que el usuario complete o cancele el pago.
 * Esta página consulta el estado final de la orden y muestra el resultado.
 */
export default function PaymentCallbackPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-black flex items-center justify-center p-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-white text-lg">Cargando...</p>
          </div>
        </div>
      }
    >
      <PaymentCallbackContent />
    </Suspense>
  );
}
