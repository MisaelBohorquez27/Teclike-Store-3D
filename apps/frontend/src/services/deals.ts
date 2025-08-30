import type { Deal } from "@/app/DailyOffers/DealCard";

export async function fetchDeals(limit = 100): Promise<Deal[]> {
  const res = await fetch(`http://localhost:5000/api/ProductsWithoffers?limit=${limit}`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Error al obtener ofertas");
  return res.json(); // Backend ya devuelve con la forma de Deal
}
