import { CartResponse } from "@/types/cart";
import { ProductForCart } from "@/types/productss";

// Función única para validar la estructura del carrito
export function validateCartStructure(cartData: any): CartResponse {
  if (!cartData || typeof cartData !== "object") {
    throw new Error("Formato de respuesta inválido");
  }

  // Asegurar que items sea un array
  if (!Array.isArray(cartData.items)) {
    cartData.items = [];
  }

  // Validar y limpiar cada item
  cartData.items = cartData.items
    .filter((item: any) => item && typeof item === "object")
    .map((item: any) => ({
      id: Number(item.id) || 0,
      productId: Number(item.productId) || 0,
      quantity: Math.max(1, Number(item.quantity) || 1),
      product: {
        id: Number(item.product?.id) || 0,
        name: String(item.product?.name || "Producto sin nombre").trim(),
        description: String(item.product?.description || "").trim(),
        price: Number(item.product?.price) || 0,
        priceString: item.product?.priceString || "",
        imageUrl: item.product?.imageUrl || null,
        inStock: Boolean(item.product?.inStock),
        stock: Math.max(0, Number(item.product?.stock) || 0),
      },
    }));

  return cartData as CartResponse;
}

// Función para mapear a ProductForCart (para componentes UI)
export function mapCartItems(cart: CartResponse | null): ProductForCart[] {
  if (!cart?.items || !Array.isArray(cart.items)) return [];

  return cart.items
    .filter((item) => item && item.productId && item.product)
    .map((item) => {
      const product = item.product!;

      return {
        id: item.productId,
        name: product.name?.trim() || "Producto sin nombre",
        price: Number(product.price) || 0,
        priceString: product.priceString || "",
        quantity: Math.max(1, item.quantity || 1),
        imageUrl: product.imageUrl || "/placeholder-product.jpg",
        inStock: Boolean(product.inStock),
        stock: Math.max(0, product.stock || 0),
        category: product.category?.trim() || "Sin categoría",
        rating: Math.max(0, Math.min(5, product.rating || 0)),
        reviewCount: Math.max(0, product.reviewCount || 0),
        slug: product.slug?.trim() || `product-${item.productId}`,
        currency: product.currency?.trim() || "USD",
        productId: item.productId,
      };
    });
}
