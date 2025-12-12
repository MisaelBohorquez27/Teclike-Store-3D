"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { PaymentService } from "@/services/payment.service";

/**
 * Página de callback después del pago con Payphone
 * 
 * Payphone redirige aquí después de que el usuario complete o cancele el pago.
 * Esta página consulta el estado final de la orden y muestra el resultado.
 */
export default function PaymentCallbackPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [status, setStatus] = useState<'loading' | 'success' | 'error' | 'cancelled'>('loading');
  const [orderData, setOrderData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const checkPaymentStatus = async () => {
      try {
        // Obtener parámetros de la URL
        const orderId = searchParams.get('orderId');
        const clientTxId = searchParams.get('clientTxId');

        if (!orderId) {
          setError('No se encontró información de la orden');
          setStatus('error');
          return;
        }

        console.log('🔍 [CALLBACK] Verificando estado de orden:', orderId);

        // Consultar el estado de la orden
        const response = await PaymentService.getPaymentStatus(parseInt(orderId));

        if (response.success && response.data) {
          setOrderData(response.data);

          // Mapear estados
          switch (response.data.status.toUpperCase()) {
            case 'APPROVED':
              setStatus('success');
              break;
            case 'CANCELLED':
            case 'REJECTED':
              setStatus('cancelled');
              break;
            default:
              setStatus('loading');
          }
        } else {
          throw new Error('No se pudo obtener el estado de la orden');
        }
      } catch (err: any) {
        console.error('❌ [CALLBACK] Error:', err);
        setError(err.message || 'Error al verificar el pago');
        setStatus('error');
      }
    };

    checkPaymentStatus();
  }, [searchParams]);

  // Renderizado según el estado
  if (status === 'loading') {
    return <LoadingView />;
  }

  if (status === 'success') {
    return <SuccessView orderData={orderData} router={router} />;
  }

  if (status === 'cancelled') {
    return <CancelledView router={router} />;
  }

  return <ErrorView error={error} router={router} />;
}

// ============ VISTAS ============

function LoadingView() {
  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4">
      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 max-w-md w-full text-center">
        <div className="w-16 h-16 mx-auto mb-4 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
        <h2 className="text-2xl font-bold text-white mb-2">
          Verificando tu pago
        </h2>
        <p className="text-gray-400">
          Por favor espera mientras confirmamos tu transacción...
        </p>
      </div>
    </div>
  );
}

function SuccessView({ orderData, router }: any) {
  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4">
      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 max-w-md w-full text-center">
        {/* Icono de éxito */}
        <div className="w-20 h-20 mx-auto mb-6 bg-green-500/20 rounded-full flex items-center justify-center">
          <svg className="w-12 h-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h2 className="text-3xl font-bold text-white mb-2">
          ¡Pago Exitoso!
        </h2>
        <p className="text-gray-400 mb-6">
          Tu orden ha sido procesada correctamente
        </p>

        {/* Detalles de la orden */}
        <div className="bg-gray-800/50 rounded-lg p-4 mb-6 text-left">
          <div className="flex justify-between mb-2">
            <span className="text-gray-400">Orden:</span>
            <span className="text-white font-mono">#{orderData?.id}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="text-gray-400">Total:</span>
            <span className="text-white font-bold">${(orderData?.total / 100).toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Estado:</span>
            <span className="text-green-500 font-semibold">Aprobado</span>
          </div>
        </div>

        {/* Información adicional */}
        <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 mb-6">
          <p className="text-sm text-blue-400">
            📧 Recibirás un email de confirmación con los detalles de tu compra.
          </p>
        </div>

        {/* Botones */}
        <div className="flex gap-3">
          <button
            onClick={() => router.push('/orders')}
            className="flex-1 bg-gray-800 text-white py-3 px-4 rounded-lg hover:bg-gray-700 transition-colors"
          >
            Ver mis órdenes
          </button>
          <button
            onClick={() => router.push('/')}
            className="flex-1 bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-3 px-4 rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-colors"
          >
            Ir al inicio
          </button>
        </div>
      </div>
    </div>
  );
}

function CancelledView({ router }: any) {
  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4">
      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 max-w-md w-full text-center">
        {/* Icono de cancelado */}
        <div className="w-20 h-20 mx-auto mb-6 bg-yellow-500/20 rounded-full flex items-center justify-center">
          <svg className="w-12 h-12 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>

        <h2 className="text-3xl font-bold text-white mb-2">
          Pago Cancelado
        </h2>
        <p className="text-gray-400 mb-6">
          No se completó la transacción. Puedes intentarlo nuevamente cuando desees.
        </p>

        {/* Botones */}
        <div className="flex gap-3">
          <button
            onClick={() => router.push('/cart')}
            className="flex-1 bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-3 px-4 rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-colors"
          >
            Volver al carrito
          </button>
          <button
            onClick={() => router.push('/')}
            className="flex-1 bg-gray-800 text-white py-3 px-4 rounded-lg hover:bg-gray-700 transition-colors"
          >
            Ir al inicio
          </button>
        </div>
      </div>
    </div>
  );
}

function ErrorView({ error, router }: any) {
  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4">
      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 max-w-md w-full text-center">
        {/* Icono de error */}
        <div className="w-20 h-20 mx-auto mb-6 bg-red-500/20 rounded-full flex items-center justify-center">
          <svg className="w-12 h-12 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>

        <h2 className="text-3xl font-bold text-white mb-2">
          Error en el Pago
        </h2>
        <p className="text-gray-400 mb-6">
          {error || 'Hubo un problema al procesar tu pago'}
        </p>

        {/* Botones */}
        <div className="flex gap-3">
          <button
            onClick={() => router.push('/cart')}
            className="flex-1 bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-3 px-4 rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-colors"
          >
            Reintentar
          </button>
          <button
            onClick={() => router.push('/')}
            className="flex-1 bg-gray-800 text-white py-3 px-4 rounded-lg hover:bg-gray-700 transition-colors"
          >
            Ir al inicio
          </button>
        </div>
      </div>
    </div>
  );
}
