// services/search.ts
import { SearchResult, SearchSuggestion } from "../types/search";
import { apiFetch } from "./api";

export async function fetchSearchResults(
  query: string,
  options?: {
    page?: number;
    limit?: number;
    category?: string;
    inStock?: boolean;
  }
): Promise<SearchResult[]> {
  const params = new URLSearchParams({
    q: query,
    page: String(options?.page ?? 1),
    limit: String(options?.limit ?? 12),
    ...(options?.category && { category: options.category }),
    ...(options?.inStock && { inStock: String(options.inStock) }),
  });

  return apiFetch<SearchResult[]>(`/search?${params}`);
}

export async function fetchSearchSuggestions(
  query: string,
  limit = 5
): Promise<SearchSuggestion[]> {
  const params = new URLSearchParams({ q: query, limit: String(limit) }).toString();
  return apiFetch<SearchSuggestion[]>(`/search/suggestions?${params}`);
}
