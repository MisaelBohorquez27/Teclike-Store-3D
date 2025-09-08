import { Product } from "@/types/products";

// Obtener productos por categoría
export async function fetchProductsByCategory(category: string, limit?: number): Promise<Product[]> {
  try {
    const params = new URLSearchParams();
    if (limit) params.append('limit', String(limit));

    const res = await fetch(
      `http://localhost:5000/api/products/category/${category}?${params.toString()}`,
      { cache: "no-store" }
    );

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.message || "Error al obtener productos por categoría");
    }

    const data = await res.json();
    return Array.isArray(data) ? data : data.data || [];
  } catch (error) {
    console.error("Error en fetchProductsByCategory:", error);
    throw new Error(error instanceof Error ? error.message : "Error desconocido al obtener productos por categoría");
  }
}
