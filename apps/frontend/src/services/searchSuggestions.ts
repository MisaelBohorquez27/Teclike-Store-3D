import { apiFetch } from "./api";
import { SearchSuggestion } from "@/types/searchSuggestions";

// 🔹 Obtener sugerencias de búsqueda
export async function fetchSearchSuggestions(
  query: string,
  limit = 5
): Promise<SearchSuggestion[]> {
  const params = new URLSearchParams({ q: query, limit: String(limit) }).toString();
  return apiFetch<SearchSuggestion[]>(`/search/suggestions?${params}`);
}
