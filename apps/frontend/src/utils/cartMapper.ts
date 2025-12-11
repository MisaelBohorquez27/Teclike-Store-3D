import { CartResponse } from "@/types/cart";
import { ProductForCart } from "@/types/productss";

// Función única para validar la estructura del carrito
export function validateCartStructure(cartData: any): CartResponse {
  // Si es null/undefined, retornar carrito vacío válido
  if (!cartData) {
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

  // Si no es un objeto, retornar carrito vacío
  if (typeof cartData !== "object") {
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

  // Asegurar que items sea un array
  const items = Array.isArray(cartData.items) ? cartData.items : [];

  // Validar y limpiar cada item
  const validatedItems = items
    .filter((item: any) => item && typeof item === "object")
    .map((item: any) => {
      // Validar que product existe
      const product = item.product || {};

      return {
        id: Number(item.id) || 0,
        productId: Number(item.productId) || 0,
        quantity: Math.max(1, Number(item.quantity) || 1),
        product: {
          id: Number(product.id) || 0,
          name: String(product.name || "Producto sin nombre").trim(),
          description: String(product.description || "").trim(),
          price: Number(product.price) || 0,
          priceString: product.priceString || `$${Number(product.price) || 0}`,
          imageUrl: product.imageUrl || null,
          inStock: product.inStock !== false, // Por defecto true
          stock: Math.max(0, Number(product.stock) || 0),
        },
      };
    });

  // Retornar estructura completa del carrito
  return {
    id: Number(cartData.id) || 0,
    userId: Number(cartData.userId) || 0,
    items: validatedItems,
    subtotal: Number(cartData.subtotal) || 0,
    tax: Number(cartData.tax) || 0,
    shipping: Number(cartData.shipping) || 0,
    total: Number(cartData.total) || 0,
  };
}

// Función para mapear a ProductForCart (para componentes UI)
export function mapCartItems(cart: CartResponse | null): ProductForCart[] {
  if (!cart?.items || !Array.isArray(cart.items)) return [];

  return cart.items
    .filter((item) => item && item.productId && item.product)
    .map((item) => {
      const product = item.product;

      return {
        id: item.productId,
        name: product.name?.trim() || "Producto sin nombre",
        price: Number(product.price) || 0,
        priceString: product.priceString || `$${product.price || 0}`,
        quantity: Math.max(1, item.quantity || 1),
        imageUrl: product.imageUrl || "/placeholder-product.jpg",
        inStock: Boolean(product.inStock),
        stock: Math.max(0, product.stock || 0),
        category: "Electrónica", // Por defecto si no viene
        rating: 0,
        reviewCount: 0,
        slug: `product-${item.productId}`,
        currency: "USD",
        productId: item.productId,
      };
    });
}
