// src/services/offers.ts
import httpClient from "./httpClient";
import { OffersResponse } from "@/types/offers";

export async function fetchFeaturedOffers(limit = Number): Promise<OffersResponse> {
  const response = await httpClient.get<OffersResponse>(
    '/offers',
    {
      params: {
        limit: limit,
      }
    }
  );
  const data = response.data; 
  return Array.isArray(data) ? data : { ...data, data: data.data || [] }; 
}