import httpClient from './httpClient';
import { CartResponse, CartItem } from '@/types/cart';
import type { ProductForCart } from '@/types/cart';

const CART_STORAGE_KEY = 'teclike_cart';
const SYNC_INTERVAL = 3000; // Reducido a 3 segundos para mejor UX (en lugar de 10s)
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
   * ✅ MEJORADO: Prioriza cambios locales si hay pendientes
   * Esto evita que productos eliminados vuelvan a aparecer después de recargar
   */
  static async getCart(): Promise<{ success: boolean; data: CartResponse }> {
    try {
      if (this.isAuthenticated()) {
        // Usuario autenticado: obtener del servidor
        console.log('📦 Obteniendo carrito del servidor...');
        
        // Verificar si hay items pendientes en localStorage PRIMERO
        const localCart = this.getLocalCart();
        const hasPendingItems = localCart.items && localCart.items.length > 0 && pendingItems.size > 0;
        
        if (hasPendingItems) {
          console.log(`⚠️ Detectado ${pendingItems.size} items pendientes - usando localStorage local`);
          // Retornar el carrito local (que tiene cambios más recientes que el servidor)
          // El sync automático se ejecutará en segundo plano
          await this.performSync();
          // Después del sync, recargar para obtener la versión sincronizada
          const syncedResponse = await httpClient.get<any>('/cart');
          if (syncedResponse.data?.data) {
            const serverCart = syncedResponse.data.data;
            const cartForStorage = {
              id: serverCart.id,
              userId: serverCart.userId,
              items: serverCart.items || [],
              subtotal: serverCart.subtotal || 0,
              shipping: serverCart.shipping || 0,
              tax: serverCart.tax || 0,
              total: serverCart.total || 0,
              itemCount: serverCart.itemCount || 0,
            };
            this.saveLocalCart(cartForStorage);
            pendingItems.clear();
            console.log('✅ Sincronización completada - usando carrito del servidor');
            return { success: true, data: cartForStorage };
          }
          // Si falla el sync, retornar el local
          return {
            success: true,
            data: localCart
          };
        } else {
          // No hay pendientes, obtener carrito del servidor
          const response = await httpClient.get<any>('/cart');
          
          if (response.data?.data) {
            const serverCart = response.data.data;
            const cartForStorage = {
              id: serverCart.id,
              userId: serverCart.userId,
              items: serverCart.items || [],
              subtotal: serverCart.subtotal || 0,
              shipping: serverCart.shipping || 0,
              tax: serverCart.tax || 0,
              total: serverCart.total || 0,
              itemCount: serverCart.itemCount || 0,
            };
            this.saveLocalCart(cartForStorage);
            pendingItems.clear();
            console.log('✅ Carrito obtenido del servidor');
            return { success: true, data: cartForStorage };
          }
          
          return response.data;
        }
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
   * 
   * IMPORTANTE: Pasar datos completos del producto para optimistic update
   * Si no los tienes, el carrito mostrará "Producto sin nombre" hasta sincronizar
   */
  static async addToCart(
    productId: number, 
    quantity: number = 1,
    productData?: {
      name?: string;
      price?: number;
      priceString?: string; // ✅ Aceptar priceString del frontend
      imageUrl?: string;
      description?: string;
    }
  ): Promise<{ success: boolean; data: CartResponse }> {
    try {
      if (!productId || productId <= 0) throw new Error('ID de producto inválido');
      if (quantity < 1) throw new Error('Cantidad debe ser mayor a 0');

      console.log(`🛒 Agregando ${quantity}x producto ${productId}`, productData);

      // OPTIMISTIC: Guardar en localStorage primero (sin esperar servidor)
      const localCart = this.getLocalCart();
      const existingItem = localCart.items.find((item: CartItem) => item.productId === productId);

      if (existingItem) {
        existingItem.quantity += Math.floor(quantity);
      } else {
        // Crear producto con datos disponibles
        const priceAsNumber = typeof productData?.price === 'string' 
          ? parseFloat(productData.price) 
          : (productData?.price || 0);
        
        // ✅ Usar priceString si viene del frontend, sino calcular
        const finalPriceString = productData?.priceString || (priceAsNumber > 0 ? `$${priceAsNumber.toFixed(2)}` : '$0.00');
        
        const product: ProductForCart | undefined = productData ? {
          id: productId,
          slug: `product-${productId}`,
          name: productData.name || `Producto ${productId}`,
          price: isNaN(priceAsNumber) ? 0 : priceAsNumber,
          priceString: finalPriceString,
          imageUrl: productData.imageUrl || '/placeholder-product.jpg',
          inStock: true,
          stock: 999,
          category: 'Producto',
          rating: 0,
          reviewCount: 0,
          currency: '$',
          brand: undefined,
        } : undefined;

        localCart.items.push({
          id: Math.random(),
          productId,
          quantity: Math.floor(quantity),
          product,
        });
      }

      this.calculateTotals(localCart);
      this.saveLocalCart(localCart);
      console.log('✅ Carrito actualizado localmente con datos completos');

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
  static async updateCartItem(productId: number, quantity: number): Promise<{ success: boolean; data: CartResponse }> {
    try {
      if (quantity < 0) throw new Error('Cantidad no puede ser negativa');

      console.log(`📝 Actualizando producto ${productId} a cantidad ${quantity}`);

      const localCart = this.getLocalCart();
      const item = localCart.items.find((i: CartItem) => i.productId === productId);

      if (!item) throw new Error('Producto no encontrado en carrito');

      if (quantity === 0) {
        localCart.items = localCart.items.filter((i: CartItem) => i.productId !== productId);
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
   * Elimina producto - OPTIMISTIC UPDATE + SYNC INMEDIATO
   * Las eliminaciones se sincronizan inmediatamente para mejor UX
   */
  static async removeFromCart(productId: number): Promise<{ success: boolean; data: CartResponse }> {
    try {
      console.log(`🗑️ Eliminando producto ${productId}`);

      const localCart = this.getLocalCart();
      localCart.items = localCart.items.filter((item: CartItem) => item.productId !== productId);

      this.calculateTotals(localCart);
      this.saveLocalCart(localCart);
      console.log('✅ Producto eliminado localmente');

      pendingItems.add(productId);

      if (this.isAuthenticated()) {
        // ⚠️ IMPORTANTE: Las eliminaciones se sincronizan INMEDIATAMENTE
        // para evitar que el usuario vea el producto reaparecer si recarga rápido
        console.log('🚀 Sincronización inmediata para eliminación');
        
        // Cancelar sync pendiente
        if (syncTimeout) clearTimeout(syncTimeout);
        syncTimeout = null;
        
        // Ejecutar sync inmediatamente
        await this.performSync();
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
  static async clearCart(): Promise<{ success: boolean; data: CartResponse }> {
    try {
      console.log('🧹 Vaciando carrito...');

      const emptyCart = {
        id: 0,
        userId: 0,
        items: [],
        subtotal: 0,
        shipping: 0,
        tax: 0,
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
      const response = await httpClient.post<any>('/cart/sync', {
        items: localCart.items.map((item: CartItem) => ({
          productId: item.productId,
          quantity: item.quantity
        }))
      });

      if (response.data?.data) {
        // ✅ Convertir respuesta del servidor al formato del localStorage
        const serverCart = response.data.data;
        const cartForStorage = {
          id: serverCart.id,
          userId: serverCart.userId,
          items: serverCart.items || [],
          subtotal: serverCart.subtotal || 0,
          shipping: serverCart.shipping || 0,
          tax: serverCart.tax || 0,
          total: serverCart.total || 0,
          itemCount: serverCart.itemCount || 0,
        };
        
        this.saveLocalCart(cartForStorage);
        pendingItems.clear();
        console.log(`✅ Sincronización completada - itemCount=${cartForStorage.itemCount}, subtotal=$${cartForStorage.subtotal}, total=$${cartForStorage.total}`);
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
      return { id: 0, userId: 0, items: [], subtotal: 0, shipping: 0, tax: 0, total: 0, itemCount: 0 };
    }

    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY);
      return stored ? JSON.parse(stored) : {
        id: 0,
        userId: 0,
        items: [],
        subtotal: 0,
        shipping: 0,
        tax: 0,
        total: 0,
        itemCount: 0,
      };
    } catch {
      return { id: 0, userId: 0, items: [], subtotal: 0, shipping: 0, tax: 0, total: 0, itemCount: 0 };
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
   * ✅ Ahora calcula el total real basado en precios
   */
  private static calculateTotals(cart: any): void {
    const itemCount = cart.items.reduce((sum: number, item: CartItem) => sum + item.quantity, 0);
    cart.itemCount = itemCount;
    
    // Calcular subtotal: sum(quantity × price)
    const subtotal = cart.items.reduce((sum: number, item: CartItem) => {
      const price = item.product?.price || 0;
      const itemTotal = price * item.quantity;
      return sum + itemTotal;
    }, 0);
    
    cart.subtotal = Math.round(subtotal * 100) / 100;
    
    // Calcular impuestos (10% del subtotal)
    const tax = Math.round(subtotal * 0.1 * 100) / 100;
    cart.tax = tax;
    
    // Envío (fijo en 5 o gratis si subtotal > 50)
    const shipping = subtotal > 50 ? 0 : 5;
    cart.shipping = shipping;
    
    // Total final
    const total = Math.round((subtotal + tax + shipping) * 100) / 100;
    cart.total = total;
    
    console.log(`💰 Totales recalculados - Items: ${itemCount}, Subtotal: $${subtotal}, Tax: $${tax}, Shipping: $${shipping}, Total: $${total}`);
  }
}