import { CartResponse } from '@/types/cart';
import { validateCartStructure } from '@/app/utils/cartMapper';

const API_BASE_URL = 'http://localhost:5000/api/cart';

// Función auxiliar para manejar respuestas HTTP
const handleResponse = async (response: Response): Promise<any> => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: 'Error de servidor' }));
    throw new Error(errorData.message || `Error HTTP: ${response.status}`);
  }
  return response.json();
};

// Función fetchCart independiente
export async function fetchCart(): Promise<CartResponse> {
  try {
    const cartData = await handleResponse(
      await fetch(`${API_BASE_URL}`, { cache: "no-store" })
    );
    return validateCartStructure(cartData);
  } catch (error) {
    console.error("Error en fetchCart:", error);
    return {
      id: 0,
      userId: 0,
      items: [],
      subtotal: 0,
      tax: 0,
      shipping: 0,
      total: 0,
    };
  }
}

export class CartService {
  static async getCart(): Promise<CartResponse> {
    return await fetchCart();
  }

  static async addToCart(productId: number, quantity: number = 1): Promise<CartResponse> {
    try {
      const cartData = await handleResponse(
        await fetch(`${API_BASE_URL}/add`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            productId: Number(productId), 
            quantity: Math.max(1, quantity) 
          }),
        })
      );
      return validateCartStructure(cartData);
    } catch (error) {
      console.error('Error en addToCart:', error);
      throw error;
    }
  }

  static async updateQuantity(productId: number, quantity: number): Promise<CartResponse> {
    try {
      const cartData = await handleResponse(
        await fetch(`${API_BASE_URL}/update`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            productId: Number(productId), 
            quantity: Math.max(0, quantity)
          }),
        })
      );
      return validateCartStructure(cartData);
    } catch (error) {
      console.error('Error en updateQuantity:', error);
      throw error;
    }
  }

  static async removeFromCart(productId: number): Promise<CartResponse> {
    try {
      const cartData = await handleResponse(
        await fetch(`${API_BASE_URL}/remove`, {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ productId: Number(productId) }),
        })
      );
      return validateCartStructure(cartData);
    } catch (error) {
      console.error('Error en removeFromCart:', error);
      throw error;
    }
  }

  static async clearCart(): Promise<{ message: string }> {
    try {
      return await handleResponse(
        await fetch(`${API_BASE_URL}/clear`, { method: 'DELETE' })
      );
    } catch (error) {
      console.error('Error en clearCart:', error);
      throw error;
    }
  }
}