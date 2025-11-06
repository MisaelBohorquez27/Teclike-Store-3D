import { OfferProduct } from "@/types/productss";
import httpClient from "./httpClient";

export async function fetchDeals(limit = 100): Promise<OfferProduct[]> {
  const response = await httpClient.get<OfferProduct[]>(
    `/offers?limit=${limit}`,
    {
      params: {
        limit: limit,
      }
    }
  );

  return Array.isArray(response.data) ? response.data : (response.data as any).data || [];
}
