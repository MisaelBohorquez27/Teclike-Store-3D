/**
 * Servicio para manejar pagos en el frontend
 */

import httpClient from './httpclient';

export interface CreatePaymentRequest {
  email?: string;
  phone?: string;
  shippingAddress?: string;
  billingAddress?: string;
}

export interface CreatePaymentResponse {
  success: boolean;
  data?: {
    orderId: number;
    clientTransactionId: string;
    payphoneTransactionId: number;
    paymentUrl: string;
    status: string;
  };
  message?: string;
}

export interface PaymentStatusResponse {
  success: boolean;
  data?: {
    id: number;
    clientTransactionId: string;
    status: string;
    total: number;
    orderProducts: Array<{
      id: number;
      productId: number;
      quantity: number;
      priceCents: number;
      product: any;
    }>;
  };
  message?: string;
}

/**
 * Servicio de pagos con Payphone
 */
export class PaymentService {
  /**
   * Crea una orden y genera el link de pago
   * 
   * @param paymentData - Datos del pago (email, teléfono, direcciones)
   * @returns URL de pago para redirigir al usuario
   */
  static async createPayment(
    paymentData: CreatePaymentRequest
  ): Promise<CreatePaymentResponse> {
    try {
      console.log('💳 [PAYMENT] Creando pago...');

      const response = await httpClient.post<CreatePaymentResponse>(
        '/payment/create',
        paymentData
      );

      console.log('✅ [PAYMENT] Pago creado:', {
        orderId: response.data.data?.orderId,
        status: response.data.data?.status,
      });

      return response.data;
    } catch (error: any) {
      console.error('❌ [PAYMENT] Error creando pago:', error.message);
      throw error;
    }
  }

  /**
   * Consulta el estado de una orden
   * 
   * @param orderId - ID de la orden a consultar
   * @returns Estado actual de la orden
   */
  static async getPaymentStatus(orderId: number): Promise<PaymentStatusResponse> {
    try {
      console.log('🔍 [PAYMENT] Consultando estado de orden:', orderId);

      const response = await httpClient.get<PaymentStatusResponse>(
        `/payment/status/${orderId}`
      );

      console.log('✅ [PAYMENT] Estado obtenido:', {
        orderId,
        status: response.data.data?.status,
      });

      return response.data;
    } catch (error: any) {
      console.error('❌ [PAYMENT] Error consultando estado:', error.message);
      throw error;
    }
  }

  /**
   * Redirige al usuario a la URL de pago de Payphone
   * 
   * @param paymentUrl - URL de pago generada por Payphone
   */
  static redirectToPayment(paymentUrl: string): void {
    if (typeof window !== 'undefined') {
      console.log('🔄 [PAYMENT] Redirigiendo a Payphone...');
      window.location.href = paymentUrl;
    }
  }
}
