// services/cartService.ts
import { CartResponse } from '@/types/cart';

const API_BASE_URL = 'http://localhost:5000/api/cart';

 async function fetchCart(): Promise<CartResponse> {
  try {
    const res = await fetch(`${API_BASE_URL}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || "Error al obtener el carrito");
    }

    const cartData = await res.json();

    // Validar la estructura de los datos
    if (!cartData || typeof cartData !== "object") {
      throw new Error("Formato de respuesta inválido");
    }

    // Asegurar que items sea un array
    if (!Array.isArray(cartData.items)) {
      cartData.items = [];
    }

    // Validar cada item
    cartData.items = cartData.items.map((item: any) => ({
      id: item.id || 0,
      productId: item.productId || 0,
      quantity: item.quantity || 1,
      product: {
        id: item.product?.id || 0,
        name: item.product?.name || "Producto sin nombre",
        description: item.product?.description || "",
        price: item.product?.price || 0,
        imageUrl: item.product?.imageUrl,
        inStock: item.product?.inStock || false,
        stock: item.product?.stock || 0,
      },
    }));

    return cartData;
  } catch (error) {
    console.error("Error en fetchCart:", error);
    // Devolver un carrito vacío en caso de error
    return {
      id: 0,
      userId: 0,
      items: [],
    };
  }
}
export class CartService {
  static async getCart(): Promise<CartResponse> {
    return await fetchCart(); // Usa tu función existente
  }

  static async addToCart(productId: number, quantity: number = 1): Promise<CartResponse> {
    const response = await fetch(`${API_BASE_URL}/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ productId, quantity }),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Error al agregar al carrito');
    }
    
    const cartData = await response.json();
    return this.validateCartResponse(cartData);
  }

  static async updateQuantity(productId: number, quantity: number): Promise<CartResponse> {
    const response = await fetch(`${API_BASE_URL}/update`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ productId, quantity }),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Error al actualizar el carrito');
    }
    
    const cartData = await response.json();
    return this.validateCartResponse(cartData);
  }

  static async removeFromCart(productId: number): Promise<CartResponse> {
    const response = await fetch(`${API_BASE_URL}/remove`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ productId }),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Error al eliminar del carrito');
    }
    
    const cartData = await response.json();
    return this.validateCartResponse(cartData);
  }

  static async clearCart(): Promise<{ message: string }> {
    const response = await fetch(`${API_BASE_URL}/clear`, {
      method: 'DELETE',
    });
    
    if (!response.ok) {
      throw new Error('Error al vaciar el carrito');
    }
    
    return response.json();
  }

  // Reutilizar tu lógica de validación existente
  private static validateCartResponse(cartData: any): CartResponse {
    // Validar la estructura de los datos
    if (!cartData || typeof cartData !== "object") {
      throw new Error("Formato de respuesta inválido");
    }

    // Asegurar que items sea un array
    if (!Array.isArray(cartData.items)) {
      cartData.items = [];
    }

    // Validar cada item (usando tu misma lógica)
    cartData.items = cartData.items.map((item: any) => ({
      id: item.id || 0,
      productId: item.productId || 0,
      quantity: item.quantity || 1,
      product: {
        id: item.product?.id || 0,
        name: item.product?.name || "Producto sin nombre",
        description: item.product?.description || "",
        price: item.product?.price || 0,
        imageUrl: item.product?.imageUrl,
        inStock: item.product?.inStock || false,
        stock: item.product?.stock || 0,
      },
    }));

    return cartData;
  }
}