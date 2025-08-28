// src/services/reviews.ts
import type { Review } from "../components/ui/ReviewCard"; // ajusta la ruta

export async function fetchFeaturedReviews(limit = 6): Promise<Review[]> {
  const res = await fetch(`http://localhost:5000/api/reviews?limit=${limit}`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Error al obtener reseñas");
  return res.json(); // ya viene en el formato Review
}
