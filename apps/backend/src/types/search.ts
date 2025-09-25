// Aquí van los interfaces y types 

export interface SearchParams {
  query: string;
  category?: string;
  inStock?: boolean;
  limit?: number;
  page?: number;
}

export interface SearchResult {
  id: number;
  name: string;
  slug: string;
  price: string;
  originalPrice?: string;
  imageUrl?: string;
  category: string;
  inStock: boolean;
  rating: number;
  reviewCount: number;
  score: number;
}
