"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { PaymentService } from "@/services/payment.service";

/**
 * Componente que maneja el contenido del callback de pago
 * Separado del layout para que useSearchParams funcione correctamente
 */
export function PaymentCallbackContent() {
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
          setError('Error al consultar estado de pago');
          setStatus('error');
        }
      } catch (err: any) {
        setError(err.message || 'Error procesando el callback de pago');
        setStatus('error');
      }
    };

    checkPaymentStatus();
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      {status === 'loading' && (
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-white text-lg">Verificando estado de pago...</p>
        </div>
      )}

      {status === 'success' && (
        <div className="bg-green-900/20 border border-green-500 rounded-lg p-8 max-w-md text-center">
          <div className="text-4xl mb-4">✅</div>
          <h1 className="text-2xl font-bold text-green-400 mb-2">¡Pago Exitoso!</h1>
          <p className="text-gray-300 mb-4">Tu orden ha sido procesada correctamente.</p>
          {orderData && (
            <div className="bg-black/50 rounded p-4 mb-4 text-left">
              <p className="text-gray-400 mb-2">
                <span className="font-semibold text-white">ID Orden:</span> {orderData.id}
              </p>
              <p className="text-gray-400 mb-2">
                <span className="font-semibold text-white">Monto:</span> ${orderData.total}
              </p>
              <p className="text-gray-400">
                <span className="font-semibold text-white">Estado:</span> {orderData.status}
              </p>
            </div>
          )}
          <button
            onClick={() => router.push('/home')}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded"
          >
            Volver al Inicio
          </button>
        </div>
      )}

      {status === 'cancelled' && (
        <div className="bg-red-900/20 border border-red-500 rounded-lg p-8 max-w-md text-center">
          <div className="text-4xl mb-4">❌</div>
          <h1 className="text-2xl font-bold text-red-400 mb-2">Pago Cancelado</h1>
          <p className="text-gray-300 mb-4">Tu pago fue cancelado o rechazado.</p>
          {error && <p className="text-red-300 mb-4 text-sm">{error}</p>}
          <button
            onClick={() => router.push('/cart')}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded"
          >
            Volver al Carrito
          </button>
        </div>
      )}

      {status === 'error' && (
        <div className="bg-yellow-900/20 border border-yellow-500 rounded-lg p-8 max-w-md text-center">
          <div className="text-4xl mb-4">⚠️</div>
          <h1 className="text-2xl font-bold text-yellow-400 mb-2">Error</h1>
          <p className="text-gray-300 mb-4">{error || 'Ocurrió un error procesando tu pago'}</p>
          <button
            onClick={() => router.push('/cart')}
            className="w-full bg-yellow-600 hover:bg-yellow-700 text-white font-semibold py-2 px-4 rounded"
          >
            Volver al Carrito
          </button>
        </div>
      )}
    </div>
  );
}
