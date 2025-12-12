/**
 * Tipos TypeScript para la integración de Payphone
 * Documentación oficial: https://payphone.app/api-documentation
 */

// ============ REQUEST TYPES ============

export interface PayphoneCreatePaymentRequest {
  amount: number;          // Monto en centavos (ej: 1000 = $10.00)
  amountWithoutTax: number; // Monto sin IVA
  clientTransactionId: string; // ID único de tu transacción
  currency: string;        // "USD" o "EUR"
  email?: string;          // Email del cliente (opcional)
  phoneNumber?: string;    // Teléfono del cliente (opcional)
  documentId?: string;     // Cédula/RUC del cliente (opcional)
  firstName?: string;      // Nombre del cliente
  lastName?: string;       // Apellido del cliente
  description?: string;    // Descripción del pago
}

export interface PayphoneVerifyPaymentRequest {
  id: number;              // ID de la transacción de Payphone
  clientTxId: string;      // Tu clientTransactionId original
}

// ============ RESPONSE TYPES ============

export interface PayphoneCreatePaymentResponse {
  statusCode: number;
  message: string;
  transactionId: number;   // ID de Payphone
  transactionStatus: number; // 1=Aprobado, 2=Pendiente, 3=Rechazado
  payWithCard?: string;    // URL para redirigir al cliente
  clientTransactionId?: string;
}

export interface PayphoneVerifyPaymentResponse {
  statusCode: number;
  message: string;
  transactionId: number;
  clientTransactionId: string;
  transactionStatus: number;
  amount: number;
  currency: string;
  email?: string;
  phoneNumber?: string;
  documentId?: string;
  cardType?: string;       // VISA, MASTERCARD, etc.
  bin?: string;            // Primeros 6 dígitos de la tarjeta
  lastFourDigits?: string; // Últimos 4 dígitos
  statusDetail?: string;
}

// ============ WEBHOOK TYPES ============

export interface PayphoneWebhookPayload {
  id: number;              // ID de la transacción de Payphone
  clientTxId: string;      // Tu clientTransactionId
  statusCode: number;
  status: string;          // "Approved", "Pending", "Cancelled", "Rejected"
  amount: number;
  currency: string;
  detail?: string;
}

// ============ INTERNAL TYPES ============

export enum PaymentStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  CANCELLED = 'CANCELLED',
  REFUNDED = 'REFUNDED'
}

export interface CreateOrderData {
  userId: number;
  cartId: number;
  items: {
    productId: number;
    quantity: number;
    price: number;
  }[];
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  shippingAddress?: string;
  billingAddress?: string;
  email?: string;
  phone?: string;
}
