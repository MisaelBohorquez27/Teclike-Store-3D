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
      const response = await httpClient.post<CreatePaymentResponse>(
        '/payment/create',
        paymentData
      );

      return response.data;
    } catch (error: any) {
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
      const response = await httpClient.get<PaymentStatusResponse>(
        `/payment/status/${orderId}`
      );

      return response.data;
    } catch (error: any) {
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
      window.location.href = paymentUrl;
    }
  }
}
