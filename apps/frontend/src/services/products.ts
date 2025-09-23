// services/productService.ts
import { ProductForDetail, ProductQueryOptions } from "@/types/productss";

/* -------------------- Tipos -------------------- */

export interface PaginatedResponse<T> {
  items: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasMore: boolean;
  };
}

/* -------------------- Base Fetch -------------------- */
async function fetchProductsBase(
  options: ProductQueryOptions = {}
): Promise<PaginatedResponse<ProductForDetail>> {
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
    `http://localhost:5000/api/products?${params.toString()}`,
    { cache: "no-store" }
  );

  if (!res.ok) throw new Error("Error al obtener productos");

  return res.json();
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
export const fetchAllProducts = (filters: any) =>
  fetchProductsBase({ page: 1, limit: 1000, ...filters });

// 📌 Producto por ID
export async function fetchProductById(id: number): Promise<ProductForDetail> {
  const res = await fetch(`http://localhost:5000/api/products/id/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Error al obtener el producto");

  return res.json();
}

// 📌 Producto por Slug
export async function fetchProductBySlug(slug: string): Promise<ProductForDetail> {
  const res = await fetch(`http://localhost:5000/api/products/slug/${slug}`, {
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Error al obtener el producto");

  return res.json();
}
