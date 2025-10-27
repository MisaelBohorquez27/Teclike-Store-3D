import httpClient from "./httpClient";
import type { Deal } from "@/app/DailyOffers/components/DealCard";

export async function fetchDeals(limit = 100): Promise<Deal[]> {
  const response = await httpClient.get<Deal[]>(
    `/offers?limit=${limit}`,
    {
      params: {
        limit: limit,
      }
    }
  );

  return Array.isArray(response.data) ? response.data : (response.data as any).data || [];
}
