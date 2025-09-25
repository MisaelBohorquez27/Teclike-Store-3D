// services/search.ts
import { SearchSuggestion } from "../types/searchSuggestions";

export interface SearchResult extends SearchSuggestion {

  rating: number;
  reviewCount: number;
  price: number;
  imageUrl?: string;
  category: string;
}

export async function fetchSearchResults(
  query: string,
  options?: {
    page?: number;
    limit?: number;
    category?: string;
    inStock?: boolean;
  }
): Promise<{
  data: SearchResult[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasMore: boolean;
  };
}> {
  const params = new URLSearchParams({
    q: query,
    category: options?.category || "",
    page: String(options?.page ?? 1),
    limit: String(options?.limit ?? 12),
    ...(options?.category ? { category: options.category } : {}),
    ...(options?.inStock !== undefined
      ? { inStock: String(options.inStock) }
      : {}),
  });

  const res = await fetch(
    `http://localhost:5000/api/search?${params.toString()}`
  );
  if (!res.ok) throw new Error("Error al obtener resultados de búsqueda");

  return res.json();
}
