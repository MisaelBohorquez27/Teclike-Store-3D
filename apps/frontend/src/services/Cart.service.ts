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

const CART_STORAGE_KEY = 'teclike_cart';
const SYNC_INTERVAL = 10000; // Sincronizar cada 10 segundos
let syncTimeout: NodeJS.Timeout | null = null;
let pendingItems: Set<number> = new Set(); // Items pendientes de sincronizar

/**
 * Servicio de Carrito - PATRÓN SENIOR
 * 
 * ESTRATEGIA:
 * 1. localStorage para cliente offline (rápido, sin latencia)
 * 2. Auto-sync batched (no a cada cambio, agrupa cambios)
 * 3. Optimistic updates (UI responde inmediatamente)
 * 4. Sync solo cambios pendientes (eficiente en BD)
 * 
 * FLUJO:
 * - Usuario no autenticado: Solo localStorage
 * - Usuario autenticado: localStorage + sync a servidor
 * - Cambios se guardan en localStorage primero (optimistic)
 * - Cada 10s se sincronizan cambios pendientes al servidor
 * - Si falla sync, se reintenta (con backoff)
 */
export class CartService {
  /**
   * Verifica si el usuario está autenticado
   */
  static isAuthenticated(): boolean {
    if (typeof window === 'undefined') return false;
    return !!localStorage.getItem('accessToken');
  }

  /**
   * Obtiene el carrito (local si no está autenticado, servidor si está)
   */
  static async getCart(): Promise<CartResponse> {
    try {
      if (this.isAuthenticated()) {
        // Usuario autenticado: obtener del servidor
        console.log('📦 Obteniendo carrito del servidor...');
        const response = await httpClient.get<CartResponse>('/cart');
        
        // Sincronizar con localStorage
        if (response.data?.data) {
          this.saveLocalCart(response.data.data);
          pendingItems.clear();
        }
        
        return response.data;
      } else {
        // Usuario NO autenticado: obtener del localStorage
        console.log('📦 Obteniendo carrito del localStorage...');
        const localCart = this.getLocalCart();
        return {
          success: true,
          data: localCart
        };
      }
    } catch (error: any) {
      console.error('❌ Error obteniendo carrito:', error.message);
      
      // Fallback a localStorage si falla servidor
      const localCart = this.getLocalCart();
      return {
        success: false,
        data: localCart
      };
    }
  }

  /**
   * Agrega producto - OPTIMISTIC UPDATE
   * Guarda en localStorage inmediatamente, sincroniza después
   */
  static async addToCart(productId: number, quantity: number = 1): Promise<CartResponse> {
    try {
      if (!productId || productId <= 0) throw new Error('ID de producto inválido');
      if (quantity < 1) throw new Error('Cantidad debe ser mayor a 0');

      console.log(`🛒 Agregando ${quantity}x producto ${productId}`);

      // OPTIMISTIC: Guardar en localStorage primero (sin esperar servidor)
      const localCart = this.getLocalCart();
      const existingItem = localCart.items.find(item => item.productId === productId);

      if (existingItem) {
        existingItem.quantity += Math.floor(quantity);
      } else {
        localCart.items.push({
          id: Math.random(),
          productId,
          quantity: Math.floor(quantity),
        });
      }

      this.calculateTotals(localCart);
      this.saveLocalCart(localCart);
      console.log('✅ Carrito actualizado localmente');

      // Marcar como pendiente de sincronización
      pendingItems.add(productId);

      // Si está autenticado, iniciar sync
      if (this.isAuthenticated()) {
        this.startAutoSync();
      }

      return {
        success: true,
        data: localCart
      };
    } catch (error: any) {
      console.error('❌ Error agregando al carrito:', error.message);
      throw error;
    }
  }

  /**
   * Actualiza cantidad - OPTIMISTIC UPDATE
   */
  static async updateCartItem(productId: number, quantity: number): Promise<CartResponse> {
    try {
      if (quantity < 0) throw new Error('Cantidad no puede ser negativa');

      console.log(`📝 Actualizando producto ${productId} a cantidad ${quantity}`);

      const localCart = this.getLocalCart();
      const item = localCart.items.find(i => i.productId === productId);

      if (!item) throw new Error('Producto no encontrado en carrito');

      if (quantity === 0) {
        localCart.items = localCart.items.filter(i => i.productId !== productId);
      } else {
        item.quantity = Math.floor(quantity);
      }

      this.calculateTotals(localCart);
      this.saveLocalCart(localCart);
      console.log('✅ Carrito actualizado localmente');

      pendingItems.add(productId);

      if (this.isAuthenticated()) {
        this.startAutoSync();
      }

      return {
        success: true,
        data: localCart
      };
    } catch (error: any) {
      console.error('❌ Error actualizando carrito:', error.message);
      throw error;
    }
  }

  /**
   * Elimina producto - OPTIMISTIC UPDATE
   */
  static async removeFromCart(productId: number): Promise<CartResponse> {
    try {
      console.log(`🗑️ Eliminando producto ${productId}`);

      const localCart = this.getLocalCart();
      localCart.items = localCart.items.filter(item => item.productId !== productId);

      this.calculateTotals(localCart);
      this.saveLocalCart(localCart);
      console.log('✅ Producto eliminado localmente');

      pendingItems.add(productId);

      if (this.isAuthenticated()) {
        this.startAutoSync();
      }

      return {
        success: true,
        data: localCart
      };
    } catch (error: any) {
      console.error('❌ Error eliminando del carrito:', error.message);
      throw error;
    }
  }

  /**
   * Vacía carrito
   */
  static async clearCart(): Promise<CartResponse> {
    try {
      console.log('🧹 Vaciando carrito...');

      const emptyCart = {
        id: 0,
        userId: 0,
        items: [],
        total: 0,
        itemCount: 0,
      };

      this.saveLocalCart(emptyCart);
      pendingItems.clear();

      // Sincronizar con servidor si está autenticado
      if (this.isAuthenticated()) {
        try {
          await httpClient.delete('/cart/clear');
        } catch (error) {
          console.warn('⚠️ Error limpiando en servidor:', error);
        }
      }

      console.log('✅ Carrito vaciado');

      return {
        success: true,
        data: emptyCart
      };
    } catch (error: any) {
      console.error('❌ Error vaciando carrito:', error.message);
      throw error;
    }
  }

  /**
   * SINCRONIZACIÓN AUTOMÁTICA - PATRÓN BATCHING
   * Agrupa múltiples cambios y sincroniza cada 10s
   * Reduce carga en BD significativamente
   */
  static startAutoSync(): void {
    if (!this.isAuthenticated()) return;
    if (syncTimeout) clearTimeout(syncTimeout);

    syncTimeout = setTimeout(async () => {
      await this.performSync();
    }, SYNC_INTERVAL);
  }

  /**
   * Ejecuta sincronización
   */
  private static async performSync(): Promise<void> {
    if (!this.isAuthenticated() || pendingItems.size === 0) {
      console.log('⏭️ Sync cancelado: no autenticado o sin cambios');
      return;
    }

    try {
      console.log(`🔄 Sincronizando ${pendingItems.size} items pendientes...`);
      
      const localCart = this.getLocalCart();
      
      // Enviar carrito completo (más simple y confiable que diferencias)
      const response = await httpClient.post<CartResponse>('/cart/sync', {
        items: localCart.items.map(item => ({
          productId: item.productId,
          quantity: item.quantity
        }))
      });

      if (response.data?.data) {
        // Servidor confirma - limpiar pendientes
        this.saveLocalCart(response.data.data);
        pendingItems.clear();
        console.log('✅ Sincronización completada');
      }
    } catch (error) {
      console.warn('⚠️ Error en sync (reintentando en 10s):', error);
      // Reintentar en 10 segundos
      this.startAutoSync();
    }
  }

  /**
   * Detiene sincronización automática
   */
  static stopAutoSync(): void {
    if (syncTimeout) {
      clearTimeout(syncTimeout);
      syncTimeout = null;
    }
  }

  /**
   * Obtiene carrito del localStorage
   */
  private static getLocalCart() {
    if (typeof window === 'undefined') {
      return { id: 0, userId: 0, items: [], total: 0, itemCount: 0 };
    }

    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY);
      return stored ? JSON.parse(stored) : {
        id: 0,
        userId: 0,
        items: [],
        total: 0,
        itemCount: 0,
      };
    } catch {
      return { id: 0, userId: 0, items: [], total: 0, itemCount: 0 };
    }
  }

  /**
   * Guarda carrito en localStorage
   */
  private static saveLocalCart(cart: any): void {
    if (typeof window === 'undefined') return;

    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch (error) {
      console.error('Error guardando carrito:', error);
    }
  }

  /**
   * Calcula totales del carrito
   */
  private static calculateTotals(cart: any): void {
    const itemCount = cart.items.reduce((sum: number, item: CartItem) => sum + item.quantity, 0);
    cart.itemCount = itemCount;
    cart.total = itemCount > 0 ? itemCount : 0; // Placeholder, el servidor calcula el real
  }
}