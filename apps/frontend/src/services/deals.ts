import { ProductWithOffer } from "@/types/offers";
import httpClient from "./httpClient";

export async function fetchDeals(limit = 100): Promise<[ProductWithOffer]> {
  const response = await httpClient.get<[ProductWithOffer]>(
    `/offers?limit=${limit}`,
    {
      params: {
        limit: limit,
      }
    }
  );

  return Array.isArray(response.data) ? response.data : (response.data as any).data || [];
}
