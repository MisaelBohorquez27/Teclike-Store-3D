export interface CheckoutSummary {
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  itemCount: number;
  currency: string;
}

export interface CreateOrderData {
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  billingAddress?: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  paymentMethod: 'credit_card' | 'paypal' | 'bank_transfer';
  notes?: string;
}

export interface Order {
  id: number;
  userId: number;
  status: string;
  total: number;
  tax: number;
  shipping: number;
  createdAt: string;
  items: any[];
}
