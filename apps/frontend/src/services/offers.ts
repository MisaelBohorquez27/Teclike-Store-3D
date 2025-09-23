// src/services/offers.ts

import { ProductForCard } from "@/types/productss";

export async function fetchFeaturedOffers(limit = 6): Promise<ProductForCard[]> {
  const res = await fetch(`http://localhost:5000/api/offers?limit=${limit}`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Error al obtener ofertas");
  return res.json(); // ya viene en el formato ProductForCard
}
