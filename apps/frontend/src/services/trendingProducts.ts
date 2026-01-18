import { ProductForCard } from "@/types/productss";
import httpClient from "./httpclient";

// 🔹 Obtener productos destacados (new, popular, discounted)
export async function fetchFeaturedProducts(
  type: "new" | "popular" | "discounted" = "new",
  limit = 8
): Promise<ProductForCard[]> {
  const response = await httpClient.get<ProductForCard[]>(
    `/products/featured/${type}?limit=${encodeURIComponent(limit)}`);

  // Normalizamos para que siempre sea array
  return Array.isArray(response.data) ? response.data : (response.data as any).data || [];
}
