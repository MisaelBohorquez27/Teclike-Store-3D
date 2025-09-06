// types/product.ts
export interface Product {
  id: number;
  name: string;
  slug: string;
  category: string;
  price: number;
  currency: string;
  rating: number;
  reviewCount: number;
  description?: string;
  image: string;
  imageUrl?: string;
  isNew?: boolean;
  inStock?: boolean;
  brand?: string;
  specifications?: Record<string, string>;
  reviews?: any[];
}

// Tipo para resultados de búsqueda
export interface SearchProduct extends Product {
  score?: number;
}