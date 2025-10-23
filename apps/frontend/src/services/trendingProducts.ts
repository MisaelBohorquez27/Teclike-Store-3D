import { apiFetch } from "./httpClient";
import { ProductForCard } from "@/types/productss";

// 🔹 Obtener productos destacados (new, popular, discounted)
export async function fetchFeaturedProducts(
  type: "new" | "popular" | "discounted" = "new",
  limit = 8
): Promise<ProductForCard[]> {
  const data = await apiFetch<ProductForCard[]>(
    `/products/featured/${type}?limit=${encodeURIComponent(limit)}`);

  // Normalizamos para que siempre sea array
  return Array.isArray(data) ? data : (data as any).data || [];
}
