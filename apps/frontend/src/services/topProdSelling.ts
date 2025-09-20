// src/services/TopProdSelling.ts
import { TopProductsSell } from "@/components/BestSellerWeek/BSWCard";

export async function fetchFeatured(limit = 6): Promise<TopProductsSell[]> {
  const res = await fetch(`http://localhost:5000/api/topSellingProd?limit=${limit}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Error al obtener productos más vendidos");
  }

  return res.json();
}
