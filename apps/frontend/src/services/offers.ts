// src/services/offers.ts
import type { Offer } from "@/components/OfferCard"; // ajusta la ruta

export async function fetchFeaturedOffers(limit = 6): Promise<Offer[]> {
  const res = await fetch(`http://localhost:5000/api/offers/featured?limit=${limit}`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Error al obtener ofertas");
  return res.json(); // ya viene en el formato Offer
}
