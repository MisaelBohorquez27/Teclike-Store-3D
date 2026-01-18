// src/services/reviews.ts
import type { Review } from "../types/review"; // ajusta la ruta
import httpClient from "./httpclient";

export async function fetchFeaturedReviews(limit = 6): Promise<Review[]> {
  const response = await httpClient.get<Review[]>(
    `/reviews?limit=${limit}`,
    {
      params: {
        limit: limit,
      }
    }
  );

  const data = response.data;
  return Array.isArray(data) ? data : [];
}
