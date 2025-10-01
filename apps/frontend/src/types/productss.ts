// types/product.ts

import { Key } from "readline";

// Interfaz base con los campos esenciales que todos los productos comparten.
export interface BaseProduct {
  id: number;
  name: string;
  slug: string;
  brand?: string;
  currency: string;
}

// Interfaz para la vista de listado o tarjeta de producto.
// Contiene lo necesario para una vista compacta.
export interface ProductForCard extends BaseProduct {
  category: string;
  rating: number;
  reviewCount: number;
  imageUrl: string;
  isNew?: boolean;
  inStock?: boolean;
  price: string;

  // Atributos específicos para ofertas
  discount?: string;
  originalPrice?: string;
  discountPrice?: string;
}

// Interfaz para la vista de detalle de un producto.
// Contiene toda la información completa del producto.
export interface ProductForDetail extends ProductForCard {
  priceInt?: number;
  description?: string;
  specifications?: Record<string, string>;
  reviews?: any[];
  sku?: string;
  tag?: string;
  stock?: number;
}

// Tipo para resultados de búsqueda, que se basa en la vista de tarjeta.
export interface SearchProduct extends ProductForCard {
  score?: number;
}

// Tipo para productos en el carrito

export interface ProductForCart extends BaseProduct {
  quantity: number;
  imageUrl: string;
  category: string;
  rating: number; // Valoración del producto
  reviewCount: number; // Número de reseñas
  price: number; // Precio del producto
  priceString: string; // Precio formateado como cadena
  stock: number; // Cantidad en stock
  inStock: boolean; // Disponibilidad
}

// Tipo para productos con ofertas especiales.
export interface OfferProduct extends ProductForCard {
  reactKey: Key | null | undefined;
  timeLeft?: number; // Tiempo restante para ofertas flash
}

// Tipo genérico para respuestas de API paginadas.
export interface PaginatedResponse<T> {
  items: any;
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasMore: boolean;
  };
}

// Interfaz para los filtros de productos.
export interface ProductFilters {
  category?: string;
  inStock?: boolean;
  minPrice?: number;
  maxPrice?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export interface ProductQueryOptions {
  page?: number;
  limit?: number;
  q?: string;
  category?: string;
  inStock?: boolean;
  minPrice?: number;
  maxPrice?: number;
}
