"use client";

import { useState } from "react";
import { PaymentService } from "@/services/payment.service";
import { useAuth } from "@/context/authcontext";

interface CheckoutButtonProps {
  items?: any[];
  total?: number;
  className?: string;
  cartItems?: any[];
}

/**
 * Botón de checkout integrado con Payphone
 * 
 * Al hacer clic:
 * 1. Valida que haya items en el carrito
 * 2. Crea una orden en el backend
 * 3. Genera link de pago con Payphone
 * 4. Redirige al usuario a la página de pago
 */
export function CheckoutButton({ 
  items = [], 
  cartItems = [], 
  total = 0, 
  className = "" 
}: CheckoutButtonProps) {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Usar cartItems si está disponible, si no items
  const itemsArray = cartItems.length > 0 ? cartItems : items;

  const handleCheckout = async () => {
    // Validación: Carrito vacío
    if (itemsArray.length === 0) {
      setError("El carrito está vacío");
      return;
    }

    // Validación: Usuario no autenticado
    if (!user) {
      setError("Debes iniciar sesión para continuar");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      console.log('🛒 [CHECKOUT] Iniciando proceso de pago...');

      // 1. Crear orden y obtener link de pago
      const response = await PaymentService.createPayment({
        email: user.email,
        phone: user.phone || undefined,
        // Puedes agregar un modal para capturar estas direcciones
        shippingAddress: undefined,
        billingAddress: undefined,
      });

      if (!response.success || !response.data?.paymentUrl) {
        throw new Error(response.message || 'Error al generar el link de pago');
      }

      console.log('✅ [CHECKOUT] Orden creada:', {
        orderId: response.data.orderId,
        status: response.data.status,
      });

      // 2. Redirigir a Payphone
      console.log('🔄 [CHECKOUT] Redirigiendo a Payphone...');
      PaymentService.redirectToPayment(response.data.paymentUrl);

      // Nota: El usuario será redirigido, así que el código después de esto
      // podría no ejecutarse. El webhook manejará la confirmación.
    } catch (err: any) {
      console.error('❌ [CHECKOUT] Error en checkout:', err);
      setError(err.message || 'Error al procesar el pago. Intenta nuevamente.');
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <button
        onClick={handleCheckout}
        className={`bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-3 px-8 rounded-lg font-semibold hover:from-blue-700 hover:to-cyan-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95 ${className}`}
        disabled={itemsArray.length === 0 || isLoading}
      >
        {isLoading ? (
          <span className="flex items-center justify-center gap-2">
            <LoadingSpinner />
            <span>Procesando...</span>
          </span>
        ) : itemsArray.length === 0 ? (
          "Carrito Vacío"
        ) : (
          <span className="flex items-center justify-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <span>Proceder al pago - ${total.toFixed(2)}</span>
          </span>
        )}
      </button>

      {/* Mensaje de error */}
      {error && (
        <div className="text-red-500 text-sm text-center bg-red-50 border border-red-200 rounded-lg px-4 py-2">
          ⚠️ {error}
        </div>
      )}

      {/* Badge de seguridad */}
      <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
        <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
        <span>Pago seguro con Payphone</span>
      </div>
    </div>
  );
}

// Componente de loading spinner
function LoadingSpinner() {
  return (
    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
  );
}