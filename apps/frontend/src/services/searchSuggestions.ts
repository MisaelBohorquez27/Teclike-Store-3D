export interface SearchSuggestion {
  id: number;
  name: string;
  slug: string;
  price: number;
  imageUrl?: string;
  category: string;
  inStock: boolean;
}

export async function fetchSearchSuggestions(query: string, limit = 5): Promise<SearchSuggestion[]> {
  const res = await fetch(
    `http://localhost:5000/api/search/suggestions?q=${encodeURIComponent(query)}&limit=${limit}`
  );

  if (!res.ok) {
    throw new Error("Error al obtener sugerencias");
  }

  return res.json();
}
