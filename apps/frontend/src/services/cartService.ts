import httpClient from './httpClient';
import { CartResponse } from '@/types/cart';
import { validateCartStructure } from '@/utils/cartMapper';

const CART_STORAGE_KEY = 'localCart';

export class CartService {
  /**
   * Verifica si el usuario está autenticado
   */
  static isAuthenticated(): boolean {
    return !!localStorage.getItem('accessToken');
  }

  /**
   * Obtiene el carrito actual (del servidor si está logueado, del localStorage si no)
   */
  static async getCart(): Promise<CartResponse> {
    try {
      if (this.isAuthenticated()) {
        // Usuario logueado: obtener del servidor
        const response = await httpClient.get<CartResponse>('/cart');
        const validatedCart = validateCartStructure(response.data);
        console.log('✅ Carrito del servidor obtenido:', validatedCart);
        return validatedCart;
      } else {
        // Usuario no logueado: obtener del localStorage
        const localCart = this.getLocalCart();
        console.log('✅ Carrito local obtenido:', localCart);
        return localCart;
      }
    } catch (error: any) {
      console.error('❌ Error en getCart:', error.message);
      // Si falla y no está logueado, devolver carrito local
      if (!this.isAuthenticated()) {
        return this.getLocalCart();
      }
      return this.getEmptyCart();
    }
  }

  /**
   * Agrega un producto al carrito
   */
  static async addToCart(
    productId: number,
    quantity: number = 1
  ): Promise<CartResponse> {
    try {
      // Validar entrada
      if (!productId || productId <= 0) {
        throw new Error('ID de producto inválido');
      }
      if (quantity < 1) {
        throw new Error('Cantidad debe ser mayor a 0');
      }

      console.log(`🛒 Agregando ${quantity}x producto ${productId} al carrito`);

      if (this.isAuthenticated()) {
        // Usuario logueado: agregar en el servidor
        const response = await httpClient.post<CartResponse>('/cart/add', {
          productId: Number(productId),
          quantity: Math.max(1, Math.floor(quantity)),
        });

        const validatedCart = validateCartStructure(response.data);
        console.log('✅ Producto agregado al servidor:', validatedCart);
        return validatedCart;
      } else {
        // Usuario no logueado: agregar en localStorage
        const localCart = this.getLocalCart();
        const existingItem = localCart.items.find((item) => item.productId === productId);

        if (existingItem) {
          existingItem.quantity += Math.floor(quantity);
        } else {
          // Crear item nuevo (necesitamos datos básicos del producto)
          localCart.items.push({
            id: Math.random(),
            productId: Number(productId),
            quantity: Math.floor(quantity),
            product: {
              id: Number(productId),
              name: `Producto ${productId}`,
              price: 0,
              priceString: '$0',
              inStock: true,
              stock: 999,
              quantity: 0,
              imageUrl: '',
              category: '',
              rating: 0,
              reviewCount: 0,
              slug: '',
              currency: ''
            },
          });
        }

        // Recalcular totales
        this.calculateCartTotals(localCart);
        this.saveLocalCart(localCart);

        console.log('✅ Producto agregado a localStorage:', localCart);
        return localCart;
      }
    } catch (error: any) {
      console.error('❌ Error en addToCart:', error.message);
      throw new Error(
        error.response?.data?.message || 
        'No se pudo agregar el producto al carrito'
      );
    }
  }

  /**
   * Actualiza la cantidad de un producto en el carrito
   */
  static async updateQuantity(
    productId: number,
    quantity: number
  ): Promise<CartResponse> {
    try {
      // Validar entrada
      if (!productId || productId <= 0) {
        throw new Error('ID de producto inválido');
      }
      if (quantity < 0) {
        throw new Error('Cantidad no puede ser negativa');
      }

      console.log(`📝 Actualizando cantidad de producto ${productId} a ${quantity}`);

      // Si cantidad es 0, eliminar el producto
      if (quantity === 0) {
        return this.removeFromCart(productId);
      }

      const response = await httpClient.put<CartResponse>('/cart/update', {
        productId: Number(productId),
        quantity: Math.max(1, Math.floor(quantity)),
      });

      const validatedCart = validateCartStructure(response.data);
      console.log('✅ Cantidad actualizada:', validatedCart);
      return validatedCart;
    } catch (error: any) {
      console.error('❌ Error en updateQuantity:', error.message);
      throw new Error(
        error.response?.data?.message || 
        'No se pudo actualizar la cantidad'
      );
    }
  }

  /**
   * Elimina un producto del carrito
   */
  static async removeFromCart(productId: number): Promise<CartResponse> {
    try {
      // Validar entrada
      if (!productId || productId <= 0) {
        throw new Error('ID de producto inválido');
      }

      console.log(`🗑️ Removiendo producto ${productId} del carrito`);

      const response = await httpClient.delete<CartResponse>('/cart/remove', {
        data: { productId: Number(productId) },
      });

      const validatedCart = validateCartStructure(response.data);
      console.log('✅ Producto removido:', validatedCart);
      return validatedCart;
    } catch (error: any) {
      console.error('❌ Error en removeFromCart:', error.message);
      throw new Error(
        error.response?.data?.message || 
        'No se pudo eliminar el producto'
      );
    }
  }

  /**
   * Vacía el carrito completamente
   */
  static async clearCart(): Promise<CartResponse> {
    try {
      console.log('🗑️ Vaciando carrito...');

      const response = await httpClient.delete<CartResponse>('/cart/clear');
      const validatedCart = validateCartStructure(response.data);
      console.log('✅ Carrito vaciado:', validatedCart);
      return validatedCart;
    } catch (error: any) {
      console.error('❌ Error en clearCart:', error.message);
      throw new Error(
        error.response?.data?.message || 
        'No se pudo vaciar el carrito'
      );
    }
  }

  /**
   * Obtiene el total del carrito
   */
  static getCartTotal(cart: CartResponse | null): number {
    if (!cart) return 0;
    return cart.subtotal + cart.tax + cart.shipping;
  }

  /**
   * Obtiene la cantidad total de items en el carrito
   */
  static getCartItemCount(cart: CartResponse | null): number {
    if (!cart?.items) return 0;
    return cart.items.reduce((count, item) => count + item.quantity, 0);
  }

  /**
   * Verifica si un producto está en el carrito
   */
  static isProductInCart(cart: CartResponse | null, productId: number): boolean {
    if (!cart?.items) return false;
    return cart.items.some((item) => item.productId === productId);
  }

  /**
   * Obtiene la cantidad de un producto específico en el carrito
   */
  static getProductQuantity(
    cart: CartResponse | null,
    productId: number
  ): number {
    if (!cart?.items) return 0;
    const item = cart.items.find((item) => item.productId === productId);
    return item?.quantity || 0;
  }

  /**
   * Retorna un carrito vacío por defecto
   */
  static getEmptyCart(): CartResponse {
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

  /**
   * Obtiene el carrito local del localStorage
   */
  private static getLocalCart(): CartResponse {
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY);
      if (stored) {
        return validateCartStructure(JSON.parse(stored));
      }
    } catch (error) {
      console.error('Error al leer carrito local:', error);
    }
    return this.getEmptyCart();
  }

  /**
   * Guarda el carrito local en localStorage
   */
  private static saveLocalCart(cart: CartResponse): void {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch (error) {
      console.error('Error al guardar carrito local:', error);
    }
  }

  /**
   * Calcula los totales del carrito
   */
  private static calculateCartTotals(cart: CartResponse): void {
    const TAX_RATE = 0.08;
    const SHIPPING_THRESHOLD = 100;
    const DEFAULT_SHIPPING = 9.99;

    // Calcular subtotal
    cart.subtotal = Number(
      cart.items
        .reduce((sum, item) => sum + (item.product.price || 0) * item.quantity, 0)
        .toFixed(2)
    );

    // Calcular impuestos
    cart.tax = Number((cart.subtotal * TAX_RATE).toFixed(2));

    // Calcular envío
    cart.shipping =
      cart.subtotal >= SHIPPING_THRESHOLD || cart.subtotal === 0
        ? 0
        : DEFAULT_SHIPPING;

    // Calcular total
    cart.total = Number((cart.subtotal + cart.tax + cart.shipping).toFixed(2));
  }

  /**
   * Sincroniza el carrito local con el servidor cuando el usuario se loguea
   */
  static async syncLocalCartWithServer(): Promise<CartResponse> {
    try {
      const localCart = this.getLocalCart();

      // Si el carrito local está vacío, no hay nada que sincronizar
      if (localCart.items.length === 0) {
        // Limpiar localStorage
        localStorage.removeItem(CART_STORAGE_KEY);
        // Obtener carrito del servidor
        const serverCart = await this.getCart();
        return serverCart;
      }

      // Agregar cada item del carrito local al servidor
      let serverCart = await this.getCart();

      for (const item of localCart.items) {
        try {
          serverCart = await this.addToCart(
            item.productId,
            item.quantity
          );
        } catch (error) {
          console.warn(`No se pudo sincronizar producto ${item.productId}:`, error);
        }
      }

      // Limpiar localStorage después de sincronizar
      localStorage.removeItem(CART_STORAGE_KEY);

      console.log('✅ Carrito sincronizado con servidor:', serverCart);
      return serverCart;
    } catch (error: any) {
      console.error('❌ Error al sincronizar carrito:', error.message);
      throw error;
    }
  }

  /**
   * Limpia el carrito local
   */
  static clearLocalCart(): void {
    localStorage.removeItem(CART_STORAGE_KEY);
  }
}