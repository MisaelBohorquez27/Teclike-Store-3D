/**
 * Servicio de integración con Payphone
 * 
 * Variables de entorno requeridas en .env:
 * - PAYPHONE_TOKEN: Token de autenticación de Payphone
 * - PAYPHONE_STORE_ID: ID de tu tienda en Payphone
 * - FRONTEND_URL: URL de tu frontend (para redirect)
 */

import axios from 'axios';
import { OrderStatus } from '@prisma/client';
import {
  PayphoneCreatePaymentRequest,
  PayphoneCreatePaymentResponse,
  PayphoneVerifyPaymentResponse,
} from '../types/payphone.types';

const PAYPHONE_BASE_URL = 'https://pay.payphonenetwork.com';

/**
 * Cliente HTTP configurado para Payphone
 */
const payphoneClient = axios.create({
  baseURL: PAYPHONE_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${process.env.PAYPHONE_TOKEN}`,
  },
  timeout: 30000, // 30 segundos
});

/**
 * Crea una nueva transacción de pago en Payphone
 * 
 * @param paymentData - Datos del pago a crear
 * @returns Respuesta de Payphone con la URL de pago
 */
export async function createPayphonePayment(
  paymentData: PayphoneCreatePaymentRequest
): Promise<PayphoneCreatePaymentResponse> {
  try {
    console.log('🔵 [PAYPHONE] Creando pago:', {
      amount: paymentData.amount / 100,
      clientTxId: paymentData.clientTransactionId,
    });

    const response = await payphoneClient.post<PayphoneCreatePaymentResponse>(
      '/api/button/Prepare',
      {
        ...paymentData,
        // Agregar configuración adicional
        responseUrl: `${process.env.FRONTEND_URL}/payment/callback`,
        cancellationUrl: `${process.env.FRONTEND_URL}/cart`,
        storeId: process.env.PAYPHONE_STORE_ID,
      }
    );

    console.log('✅ [PAYPHONE] Pago creado exitosamente:', {
      transactionId: response.data.transactionId,
      status: response.data.transactionStatus,
    });

    return response.data;
  } catch (error: any) {
    console.error('❌ [PAYPHONE] Error creando pago:', {
      message: error.message,
      response: error.response?.data,
    });

    throw new Error(
      error.response?.data?.message || 
      'Error al crear la transacción con Payphone'
    );
  }
}

/**
 * Verifica el estado de una transacción en Payphone
 * Usar esto en el webhook para confirmar que el pago es legítimo
 * 
 * @param transactionId - ID de la transacción en Payphone
 * @param clientTxId - Tu ID de transacción original
 * @returns Estado verificado de la transacción
 */
export async function verifyPayphonePayment(
  transactionId: number,
  clientTxId: string
): Promise<PayphoneVerifyPaymentResponse> {
  try {
    console.log('🔍 [PAYPHONE] Verificando pago:', {
      transactionId,
      clientTxId,
    });

    const response = await payphoneClient.post<PayphoneVerifyPaymentResponse>(
      '/api/button/Confirm',
      {
        id: transactionId,
        clientTxId: clientTxId,
      }
    );

    console.log('✅ [PAYPHONE] Pago verificado:', {
      transactionId: response.data.transactionId,
      status: response.data.transactionStatus,
      amount: response.data.amount / 100,
    });

    return response.data;
  } catch (error: any) {
    console.error('❌ [PAYPHONE] Error verificando pago:', {
      message: error.message,
      response: error.response?.data,
    });

    throw new Error(
      error.response?.data?.message || 
      'Error al verificar la transacción con Payphone'
    );
  }
}

/**
 * Mapea el código de estado de Payphone a nuestro enum interno
 * 
 * @param statusCode - Código de estado de Payphone
 * @returns Estado mapeado
 */
export function mapPayphoneStatus(statusCode: number): OrderStatus {
  const statusMap: Record<number, OrderStatus> = {
    1: OrderStatus.APPROVED,   // Aprobado
    2: OrderStatus.PENDING,    // Pendiente
    3: OrderStatus.REJECTED,   // Rechazado
    4: OrderStatus.CANCELLED,  // Cancelado
  };

  return statusMap[statusCode] || OrderStatus.PENDING;
}

/**
 * Genera un ID único de transacción para tu sistema
 * Formato: ORDER-{timestamp}-{random}
 * 
 * @returns ID único de transacción
 */
export function generateClientTransactionId(): string {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `ORDER-${timestamp}-${random}`;
}
