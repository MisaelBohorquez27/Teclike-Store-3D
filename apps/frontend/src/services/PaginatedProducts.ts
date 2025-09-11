// services/productService.ts
import { Product } from "@/types/products";

export async function fetchPaginatedProducts(
  page: number,
  limit: number
): Promise<{
  items: Product[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasMore: boolean;
  };
}> {
  const params = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
  });

  const url = `http://localhost:5000/api/paginated?${params}`;

  const res = await fetch(url, { cache: "no-store" });

  if (!res.ok) {
    throw new Error("Error al obtener productos paginados");
  }

  const data = await res.json();

  return {
    items: data.items, // 🔹 tu controller devuelve { items, pagination }
    pagination: data.pagination,
  };
}
