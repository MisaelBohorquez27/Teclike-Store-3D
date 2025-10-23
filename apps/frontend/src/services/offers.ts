// src/services/offers.ts
import { apiFetch } from "./httpClient";

import { ProductForCard } from "@/types/productss";

export async function fetchFeaturedOffers(limit = 6): Promise<ProductForCard[]> {
  const data = await apiFetch<ProductForCard[]>(
    `/offers?limit=${limit}`);

  // Normalizamos para que siempre sea array
  return Array.isArray(data) ? data : (data as any).data || [];
}
