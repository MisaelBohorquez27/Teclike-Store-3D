import { Product } from "@/types/products";

// Obtener productos destacados (nuevos, mejor valorados, etc.)
export async function fetchFeaturedProducts(type: 'new' | 'popular' | 'discounted' = 'new', limit: number = 8): Promise<Product[]> {
  try {
    const res = await fetch(
      `http://localhost:5000/api/products/featured/${type}?limit=${limit}`,
      { cache: "no-store" }
    );

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.message || "Error al obtener productos destacados");
    }

    const data = await res.json();
    return Array.isArray(data) ? data : data.data || [];
  } catch (error) {
    console.error("Error en fetchFeaturedProducts:", error);
    throw new Error(error instanceof Error ? error.message : "Error desconocido al obtener productos destacados");
  }
}