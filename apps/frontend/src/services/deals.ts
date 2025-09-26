import { apiFetch } from "./api";
import type { Deal } from "@/app/DailyOffers/DealCard";

export async function fetchDeals(limit = 100): Promise<Deal[]> {
  const data = await apiFetch<Deal[]>(`/offers?limit=${limit}`);
  
  // Normalizamos para que siempre sea array
  return Array.isArray(data) ? data : (data as any).data || [];
}
