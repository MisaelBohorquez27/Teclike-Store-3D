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

  // Paginación
  params.append("page", String(options.page ?? 1));
  params.append("limit", String(options.limit ?? 12));

  // Búsqueda y filtros
  if (options.q) params.append("q", options.q.trim());
  if (options.category) params.append("category", options.category);
  if (options.inStock !== undefined)
    params.append("inStock", String(options.inStock));
  if (options.minPrice !== undefined)
    params.append("minPrice", String(options.minPrice));
  if (options.maxPrice !== undefined)
    params.append("maxPrice", String(options.maxPrice));

  const res = await fetch(
    `http://localhost:5000/api/productss?${params.toString()}`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    throw new Error("Error al obtener productos");
  }

  const data = await res.json();

  return {
    items: data.items,
    pagination: data.pagination,
  };
}

/**
 * Wrapper para catálogo general (paginación simple, sin búsqueda)
 */
export const fetchPaginatedProducts = (page = 1, limit = 12) =>
  fetchProductsBase({ page, limit });

/**
 * Wrapper para resultados de búsqueda (con query + filtros)
 */
export const fetchSearchResults = (
  query: string,
  options?: Omit<ProductQueryOptions, "q">
) =>
  fetchProductsBase({
    q: query,
    ...options,
  });
