// services/searchService.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export interface SearchParams {
  query: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  inStock?: boolean;
  limit?: number;
  page?: number;
}

export interface SearchResult {
  id: number;
  name: string;
  slug: string;
  price: number;
  originalPrice?: number;
  imageUrl?: string;
  category: string;
  inStock: boolean;
  rating: number;
  reviewCount: number;
  score: number; // Para ordenar por relevancia
}

export class SearchService {
  static async searchProducts(params: SearchParams): Promise<SearchResult[]> {
    const {
      query,
      category,
      minPrice,
      maxPrice,
      inStock,
      limit = 10,
      page = 1
    } = params;

    const searchTerm = query.trim().toLowerCase();
    const skip = (page - 1) * limit;

    // Construir condiciones WHERE
    const whereConditions: any = {
      AND: []
    };

    // Búsqueda por texto
    if (searchTerm) {
      whereConditions.AND.push({
        OR: [
          {
            name: {
              contains: searchTerm,
              mode: 'insensitive' as const
            }
          },
          {
            description: {
              contains: searchTerm,
              mode: 'insensitive' as const
            }
          },
          {
            slug: {
              contains: searchTerm,
              mode: 'insensitive' as const
            }
          },
          {
            brand: {
              contains: searchTerm,
              mode: 'insensitive' as const
            }
          }
        ]
      });
    }

    // Filtros adicionales
    if (category) {
      whereConditions.AND.push({
        categoryProducts: {
          some: {
            category: {
              name: {
                equals: category,
                mode: 'insensitive' as const
              }
            }
          }
        }
      });
    }

    if (minPrice !== undefined || maxPrice !== undefined) {
      const priceCondition: any = {};
      if (minPrice !== undefined) priceCondition.gte = minPrice * 100; // Convertir a cents
      if (maxPrice !== undefined) priceCondition.lte = maxPrice * 100;
      whereConditions.AND.push({ priceCents: priceCondition });
    }

    if (inStock !== undefined) {
      whereConditions.AND.push({
        inventory: {
          stock: inStock ? { gt: 0 } : { equals: 0 }
        }
      });
    }

    // Ejecutar la consulta
    const products = await prisma.product.findMany({
      where: whereConditions.AND.length > 0 ? whereConditions : undefined,
      include: {
        categoryProducts: {
          include: {
            category: true
          }
        },
        inventory: true,
        reviews: true
      },
      skip,
      take: limit
    });

    // Calcular relevancia y formatear resultados
    const results = products.map(product => {
      const score = this.calculateRelevanceScore(product, searchTerm);
      const primaryCategory = product.categoryProducts?.[0]?.category?.name ?? "Uncategorized";
      
      return {
        id: product.id,
        name: product.name,
        slug: product.slug,
        price: product.priceCents / 100,
        imageUrl: product.imageUrl ?? undefined,
        category: primaryCategory,
        inStock: (product.inventory?.stock || 0) > 0,
        rating: product.reviews.length > 0 
          ? product.reviews.reduce((sum, r) => sum + r.rating, 0) / product.reviews.length
          : 0,
        reviewCount: product.reviews.length,
        score
      };
    });

    // Ordenar por relevancia
    return results.sort((a, b) => b.score - a.score);
  }

  private static calculateRelevanceScore(product: any, searchTerm: string): number {
    if (!searchTerm) return 0;

    let score = 0;
    const productName = product.name.toLowerCase();
    const productDescription = product.description?.toLowerCase() || '';
    const productSlug = product.slug.toLowerCase();
    const productBrand = product.brand?.toLowerCase() || '';

    // Ponderaciones para diferentes tipos de coincidencia
    const weights = {
      exactMatch: 10,
      startsWith: 5,
      contains: 3,
      wordBoundary: 4,
      categoryMatch: 2
    };

    // Coincidencia exacta
    if (productName === searchTerm) score += weights.exactMatch;
    if (productSlug === searchTerm) score += weights.exactMatch;

    // Coincidencia al inicio
    if (productName.startsWith(searchTerm)) score += weights.startsWith;
    if (productSlug.startsWith(searchTerm)) score += weights.startsWith;

    // Coincidencia en cualquier parte
    if (productName.includes(searchTerm)) score += weights.contains;
    if (productDescription.includes(searchTerm)) score += weights.contains;
    if (productSlug.includes(searchTerm)) score += weights.contains;
    if (productBrand.includes(searchTerm)) score += weights.contains;

    // Coincidencia con límites de palabra (más relevante)
    const wordRegex = new RegExp(`\\b${searchTerm}\\b`, 'i');
    if (wordRegex.test(productName)) score += weights.wordBoundary;
    if (wordRegex.test(productDescription)) score += weights.wordBoundary;

    return score;
  }

  static async getSearchSuggestions(query: string, limit: number = 5): Promise<string[]> {
    if (!query || query.length < 2) return [];

    const products = await prisma.product.findMany({
      where: {
        OR: [
          {
            name: {
              contains: query,
              mode: 'insensitive' as const
            }
          },
          {
            slug: {
              contains: query,
              mode: 'insensitive' as const
            }
          }
        ]
      },
      select: {
        name: true,
        slug: true
      },
      take: limit * 2 // Tomar más para diversidad
    });

    // Extraer sugerencias únicas
    const suggestions = new Set<string>();
    
    products.forEach(product => {
      // Sugerir nombres de productos
      suggestions.add(product.name);
      
      // Sugerir partes del slug (si son descriptivas)
      if (product.slug.includes('-')) {
        product.slug.split('-').forEach(part => {
          if (part.length > 2) suggestions.add(part);
        });
      }
    });

    return Array.from(suggestions).slice(0, limit);
  }
}