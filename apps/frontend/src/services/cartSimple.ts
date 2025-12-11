import httpClient from './httpClient';

interface CartItem {
  id: string | number;
  productId: number;
  quantity: number;
  product?: any;
}

export interface CartResponse {
  success: boolean;
  data?: {
    id: number;
    userId: number;
    items: CartItem[];
    total: number;
    itemCount: number;
  };
}

/**
 * Servicio de Carrito SIMPLE
 * - Solo almacena en BD (no usa Redis)
 * - Responde rápido
 * - Sin sincronización compleja
 */
export class CartServiceSimple {
  /**
   * Obtiene el carrito del usuario (desde BD via API)
   */
  static async getCart(): Promise<CartResponse> {
    try {
      console.log('📦 Obteniendo carrito...');
      const response = await httpClient.get<CartResponse>('/cart');
      console.log('✅ Carrito obtenido:', response.data);
      return response.data;
    } catch (error: any) {
      console.error('❌ Error obteniendo carrito:', error.message);
      throw error;
    }
  }

  /**
   * Agrega un producto al carrito
   */
  static async addToCart(productId: number, quantity: number = 1): Promise<CartResponse> {
    try {
      console.log(`� [SERVICE] addToCart llamado - productId=${productId}, quantity=${quantity}`);
      
      if (!productId || productId <= 0) {
        throw new Error('ID de producto inválido');
      }
      if (quantity < 1) {
        throw new Error('Cantidad debe ser mayor a 0');
      }

      const payload = {
        productId: Number(productId),
        quantity: Math.max(1, Math.floor(quantity)),
      };
      
      console.log(`🔍 [SERVICE] Enviando payload:`, payload);

      const response = await httpClient.post<CartResponse>('/cart/add', payload);
      
      console.log(`✅ [SERVICE] Respuesta recibida - itemCount=${response.data.data?.itemCount}`);
      return response.data;
    } catch (error: any) {
      console.error('❌ Error agregando al carrito:', error.message);
      throw error;
    }
  }

  /**
   * Actualiza la cantidad de un producto en el carrito
   */
  static async updateCartItem(productId: number, quantity: number): Promise<CartResponse> {
    try {
      console.log(`📝 Actualizando producto ${productId} a cantidad ${quantity}`);
      
      if (quantity < 0) {
        throw new Error('Cantidad no puede ser negativa');
      }

      const response = await httpClient.put<CartResponse>('/cart/update', {
        productId: Number(productId),
        quantity: Math.max(0, Math.floor(quantity)),
      });
      
      console.log('✅ Producto actualizado:', response.data);
      return response.data;
    } catch (error: any) {
      console.error('❌ Error actualizando carrito:', error.message);
      throw error;
    }
  }

  /**
   * Elimina un producto del carrito
   */
  static async removeFromCart(productId: number): Promise<CartResponse> {
    try {
      console.log(`🗑️ Removiendo producto ${productId} del carrito`);
      
      const response = await httpClient.delete<CartResponse>('/cart/remove', {
        data: { productId: Number(productId) },
      });
      
      console.log('✅ Producto removido:', response.data);
      return response.data;
    } catch (error: any) {
      console.error('❌ Error removiendo del carrito:', error.message);
      throw error;
    }
  }

  /**
   * Vacía todo el carrito
   */
  static async clearCart(): Promise<CartResponse> {
    try {
      console.log('🧹 Vaciando carrito...');
      
      const response = await httpClient.delete<CartResponse>('/cart/clear');
      
      console.log('✅ Carrito vaciado:', response.data);
      return response.data;
    } catch (error: any) {
      console.error('❌ Error vaciando carrito:', error.message);
      throw error;
    }
  }
}
