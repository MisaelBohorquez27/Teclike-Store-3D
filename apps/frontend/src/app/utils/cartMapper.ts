import { CartResponse } from "@/types/cart";
import { ProductForCart } from "@/types/productss";

export function mapCartItems(cart: CartResponse): ProductForCart[] {
  if (!cart?.items) return [];
  return cart.items.map(item => ({
    id: item.productId,
    name: item.product?.name || "Producto sin nombre",
    price: item.product?.price?.toString() || "0",
    quantity: item.quantity || 1,
    imageUrl: item.product?.imageUrl || "/placeholder-product.jpg",
    inStock: item.product?.inStock || false,
    stock: item.product?.stock,
    category: item.product?.category || "Sin categoría",
    rating: item.product?.rating || 0,
    reviewCount: item.product?.reviewCount || 0,
    slug: item.product?.slug || "",
    currency: item.product?.currency || "USD"
  }));
}
