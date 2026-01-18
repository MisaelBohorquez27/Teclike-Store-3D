// services/search.ts
import { SearchResult, SearchSuggestion } from "../types/search";
import httpClient from "./httpclient";

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

  const response = await httpClient.get<SearchResult[]>(`/search?${params}`);
  return response.data;
}

export async function fetchSearchSuggestions(
  query: string,
  limit = 5
): Promise<SearchSuggestion[]> {
  const params = new URLSearchParams({ q: query, limit: String(limit) }).toString();
  const response = await httpClient.get<SearchSuggestion[]>(`/search/suggestions?${params}`);
  return response.data;
}
