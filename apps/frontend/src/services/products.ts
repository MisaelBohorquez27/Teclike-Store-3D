import { apiFetch } from "./api";
import { PaginatedResponse, ProductForDetail, ProductQueryOptions } from "@/types/productss";

/* -------------------- Base Fetch -------------------- */
async function fetchProductsBase(
  options: ProductQueryOptions = {}
): Promise<PaginatedResponse<ProductForDetail>> {
  const params: Record<string, string> = {
    page: String(options.page ?? 1),
    limit: String(options.limit ?? 12),
  };

  if (options.q && options.q.trim().length > 0) params.q = options.q.trim();
  if (options.category) params.category = options.category;
  if (options.inStock !== undefined) params.inStock = String(options.inStock);
  if (options.minPrice !== undefined) params.minPrice = String(options.minPrice);
  if (options.maxPrice !== undefined) params.maxPrice = String(options.maxPrice);

  return apiFetch<PaginatedResponse<ProductForDetail>>("/products", {
    ...params,
  });
}

/* -------------------- Wrappers -------------------- */

// 📌 Catálogo con filtros y paginación
export const fetchPaginatedProducts = (
  page: number,
  limit: number,
  filters?: Omit<ProductQueryOptions, "q">
) => fetchProductsBase({ page, limit, ...filters });

// 📌 Búsqueda
export const fetchSearchResults = (
  query: string,
  page: number,
  limit: number
) => fetchProductsBase({ q: query, page, limit });

// 📌 Obtener todos (sin paginación → podría ser para seeds, admin, etc.)
export const fetchAllProducts = (filters?: Partial<ProductQueryOptions>) =>
  fetchProductsBase({ page: 1, limit: 1000, ...filters });

// 📌 Producto por ID
export async function fetchProductById(
  id: number
): Promise<ProductForDetail> {
  return apiFetch<ProductForDetail>(`/products/id/${id}`);
}

// 📌 Producto por Slug
export async function fetchProductBySlug(
  slug: string
): Promise<ProductForDetail> {
  return apiFetch<ProductForDetail>(`/products/slug/${slug}`);
}
