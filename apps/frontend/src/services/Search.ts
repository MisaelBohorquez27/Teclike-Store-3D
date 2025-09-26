// services/search.ts
import { ApiResponse } from "../types/api";
import { SearchResult } from "../types/searchSuggestions";
import { apiFetch } from "./api";

export async function fetchSearchResults(
  query: string,
  options?: {
    page?: number;
    limit?: number;
    category?: string;
    inStock?: boolean;
  }
): Promise<ApiResponse<SearchResult[]>> {
  return apiFetch<ApiResponse<SearchResult[]>>("/products", {
    q: query,
    page: options?.page ?? 1,
    limit: options?.limit ?? 12,
    category: options?.category,
    inStock: options?.inStock,
  });
}
