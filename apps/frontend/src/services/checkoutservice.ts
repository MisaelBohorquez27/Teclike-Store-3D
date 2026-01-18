import httpClient from './httpclient';
import { CheckoutSummary, CreateOrderData, Order } from '@/types/checkout';

export class CheckoutService {
  /**
   * Obtiene el resumen del checkout (totales antes de pagar)
   */
  static async getCheckoutSummary(): Promise<CheckoutSummary> {
    try {
      const response = await httpClient.get<CheckoutSummary>('/checkout');
      console.log('✅ Resumen de checkout obtenido:', response.data);
      return response.data;
    } catch (error: any) {
      if (error.response?.status === 401) {
        throw new Error('Debe estar logueado para hacer checkout');
      }
      if (error.response?.status === 400) {
        throw new Error(error.response.data?.message || 'El carrito está vacío');
      }
      throw new Error(
        error.response?.data?.message || 
        'Error al obtener resumen de checkout'
      );
    }
  }

  /**
   * Crea una orden con los datos proporcionados
   */
  static async createOrder(orderData: CreateOrderData): Promise<Order> {
    try {
      const response = await httpClient.post<Order>('/checkout/create', orderData);
      console.log('✅ Orden creada:', response.data);
      return response.data;
    } catch (error: any) {
      if (error.response?.status === 401) {
        throw new Error('Debe estar logueado para crear una orden');
      }
      if (error.response?.status === 400) {
        throw new Error(error.response.data?.message || 'Datos inválidos para la orden');
      }
      throw new Error(
        error.response?.data?.message || 
        'Error al crear la orden'
      );
    }
  }

  /**
   * Procesa el pago de una orden
   */
  static async processPayment(
    orderId: number,
    paymentDetails: any
  ): Promise<{ success: boolean; message: string; orderId: number }> {
    try {
      const response = await httpClient.post('/checkout/pay', {
        orderId,
        ...paymentDetails,
      });
      console.log('✅ Pago procesado:', response.data);
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 
        'Error al procesar el pago'
      );
    }
  }

  /**
   * Obtiene el estado de una orden
   */
  static async getOrderStatus(orderId: number): Promise<Order> {
    try {
      const response = await httpClient.get<Order>(`/checkout/order/${orderId}`);
      return response.data;
    } catch (error: any) {
      throw new Error('Error al obtener el estado de la orden');
    }
  }

  /**
   * Formatea el total para mostrar
   */
  static formatCurrency(amount: number, currency: string = 'USD'): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
    }).format(amount);
  }
}
