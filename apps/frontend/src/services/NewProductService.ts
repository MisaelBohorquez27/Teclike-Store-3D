// services/productService.ts
import { Product } from "@/types/products";

export interface ProductQueryOptions {
  page?: number;
  limit?: number;
  q?: string;
  category?: string;
  inStock?: boolean;
  minPrice?: number;
  maxPrice?: number;
}

export async function fetchProductsBase(
  options: ProductQueryOptions = {}
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

  // 🔹 Paginación
  params.set("page", String(options.page ?? 1));
  params.set("limit", String(options.limit ?? 12));

  // 🔹 Búsqueda y filtros
  if (options.q && options.q.trim().length > 0) params.set("q", options.q.trim());
  if (options.category) params.set("category", options.category);
  if (options.inStock !== undefined) params.set("inStock", String(options.inStock));
  if (options.minPrice !== undefined) params.set("minPrice", String(options.minPrice));
  if (options.maxPrice !== undefined) params.set("maxPrice", String(options.maxPrice));

  const res = await fetch(
    `http://localhost:5000/api/productss?${params.toString()}`,
    { cache: "no-store" }
  );

  if (!res.ok) throw new Error("Error al obtener productos");

  return res.json();
}

/**
 * 🔹 Wrapper para catálogo general + filtros
 */
export const fetchPaginatedProducts = (
  page: number,
  limit: number,
  filters?: Omit<ProductQueryOptions, "q">
) => fetchProductsBase({ page, limit, ...filters });

/**
 * 🔹 Wrapper para búsqueda 
 */
export const fetchSearchResults = (
  query: string,
  page: number,
  limit: number
) => fetchProductsBase({ q: query, page, limit });

