// Interfaces para sugerencias y resultados de búsqueda

export interface SearchSuggestion {
  id: number;
  name: string;
  slug: string;
  inStock: boolean;
}

export interface SearchResult extends SearchSuggestion {

  rating: number;
  reviewCount: number;
  price: number;
  imageUrl?: string;
  category: string;
}