// services/productService.ts
import { Product } from "@/types/products";

export async function fetchProductss(
  page: number,
  limit: number,
  query?: string
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
  const params = new URLSearchParams();

  // 🔹 Solo agregamos `q` si existe y tiene contenido
  if (query && query.trim().length > 0) {
    params.append("q", query.trim());
  }

  params.append("page", page.toString());
  params.append("limit", limit.toString());

  const url = `http://localhost:5000/api/productss?${params.toString()}`;

  const res = await fetch(url, { cache: "no-store" });

  if (!res.ok) {
    throw new Error("Error al obtener los productos");
  }

  const data = await res.json();

  return {
    items: data.items,
    pagination: data.pagination,
  };
}
