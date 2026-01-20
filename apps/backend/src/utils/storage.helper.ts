export class StorageHelper {
  static getLocalCart(): any[] {
    try {
      const cartJson = localStorage.getItem('cart');
      return cartJson ? JSON.parse(cartJson) : [];
    } catch (error) {
      return [];
    }
  }

  static saveLocalCart(cart: any[]): void {
    try {
      const cartWithTimestamp = {
        products: cart,
        updatedAt: new Date().toISOString()
      };
      localStorage.setItem('cart', JSON.stringify(cartWithTimestamp));
    } catch (error) {
      // Storage error
    }
  }

  static clearLocalCart(): void {
    try {
      localStorage.removeItem('cart');
    } catch (error) {
      // Storage error
    }
  }

  static getCartSummary(cart: any[]): { total: number; itemCount: number } {
    const total = cart.reduce((sum, item) => 
      sum + (item.priceCents * item.quantity), 0
    );
    
    const itemCount = cart.reduce((sum, item) => 
      sum + item.quantity, 0
    );

    return { total, itemCount };
  }
}