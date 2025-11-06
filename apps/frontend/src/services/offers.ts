// src/services/offers.ts
import { OfferProduct } from "@/types/productss";
import httpClient from "./httpClient";

export async function fetchFeaturedOffers(limit = 6): Promise<OfferProduct[]> {
  const response = await httpClient.get<OfferProduct[]>(
    '/offers',
    {
      params: {
        limit: limit,
      }
    }
  );
  const data = response.data; 
  return Array.isArray(data) ? data : []; 
}