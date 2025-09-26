import { apiFetch } from "./api";
import { Product } from "@/types/products";

// 🔹 Obtener productos destacados (new, popular, discounted)
export async function fetchFeaturedProducts(
  type: "new" | "popular" | "discounted" = "new",
  limit = 8
): Promise<Product[]> {
  const data = await apiFetch<Product[]>(
    `/products/featured/${type}?limit=${encodeURIComponent(limit)}`);

  // Normalizamos para que siempre sea array
  return Array.isArray(data) ? data : (data as any).data || [];
}
