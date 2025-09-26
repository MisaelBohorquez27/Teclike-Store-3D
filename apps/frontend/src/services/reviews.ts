// src/services/reviews.ts
import type { Review } from "../types/review"; // ajusta la ruta
import { apiFetch } from "./api";

export async function fetchFeaturedReviews(limit = 6): Promise<Review[]> {
  const data = await apiFetch<Review[]>(
    `/reviews?limit=${limit}`);

  // Normalizamos para que siempre sea array
  return Array.isArray(data) ? data : (data as any).data || [];
}
