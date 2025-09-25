// services/searchService.ts
import { PrismaClient } from "@prisma/client";
import { SearchParams, SearchResult } from "../types/search";

const prisma = new PrismaClient();

export class SearchService {
  static async searchProducts(params: SearchParams): Promise<{ 
    results: any[]; 
    total: number; 
  }> {
    const {
      query,
      category,
      inStock,
      limit = 12,
      page = 1,
    } = params;

    const searchTerm = query.trim().toLowerCase();
    const skip = (page - 1) * limit;

    // Construir condiciones WHERE
    const whereConditions: any = {
      AND: [],
    };

    // Búsqueda por texto
    if (searchTerm) {
      whereConditions.AND.push({
        OR: [
          {
            name: {
              contains: searchTerm,
              mode: "insensitive" as const,
            },
          },
          {
            description: {
              contains: searchTerm,
              mode: "insensitive" as const,
            },
          },
          {
            slug: {
              contains: searchTerm,
              mode: "insensitive" as const,
            },
          },
          {
            brand: {
              contains: searchTerm,
              mode: "insensitive" as const,
            },
          },
        ],
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
                mode: "insensitive" as const,
              },
            },
          },
        },
      });
    }

    // Filtro de stock - manejar diferentes estructuras posibles
    if (inStock !== undefined) {
      // Opción 1: Si tienes campo stock directo en Product
      whereConditions.AND.push({
        OR: [
          // Intenta con stock directo
          { stock: inStock ? { gt: 0 } : { equals: 0 } },
          // O intenta con inventory.stock
          { inventory: inStock ? { stock: { gt: 0 } } : { stock: { equals: 0 } } },
          // O si no existe ninguno, ignora el filtro
        ],
      });
    }

    // Contar total de coincidencias
    const total = await prisma.product.count({
      where: whereConditions.AND.length > 0 ? whereConditions : undefined,
    });

    // Ejecutar la consulta
    const products = await prisma.product.findMany({
      where: whereConditions.AND.length > 0 ? whereConditions : undefined,
      include: {
        categoryProducts: {
          include: {
            category: true,
          },
        },
        reviews: {
          select: {
            rating: true,
          },
        },
        inventory: {
          select: {
            stock: true,
          },
        },
        _count: {
          select: {
            reviews: true,
          },
        },
      },
      skip,
      take: limit,
    });

    // Formatear resultados según lo que espera el controller
    const results = products.map((product) => {
      const score = this.calculateRelevanceScore(product, searchTerm);
      const primaryCategory =
        product.categoryProducts?.[0]?.category?.name ?? "Uncategorized";

      // Calcular rating promedio
      const avgRating = product.reviews.length > 0
        ? product.reviews.reduce((sum, r) => sum + r.rating, 0) / product.reviews.length
        : 0;

      // Determinar stock disponible (manejar diferentes estructuras)
      const stockQuantity = product.inventory?.stock !== undefined 
        ? product.inventory.stock 
        : 0;

      return {
        id: product.id,
        name: product.name,
        slug: product.slug,
        priceCents: product.priceCents,
        currency: product.currency || "USD",
        imageUrl: product.imageUrl,
        createdAt: product.createdAt,
        categoryProducts: product.categoryProducts,
        rating: avgRating,
        stock: stockQuantity,
        _count: {
          reviews: product._count?.reviews || 0,
        },
        _score: score,
      };
    });

    // Ordenar por relevancia
    return { 
      results: results.sort((a, b) => b._score - a._score), 
      total 
    };
  }

  private static calculateRelevanceScore(
    product: any,
    searchTerm: string
  ): number {
    if (!searchTerm) return 0;

    let score = 0;
    const productName = product.name.toLowerCase();
    const productDescription = product.description?.toLowerCase() || "";
    const productSlug = product.slug.toLowerCase();
    const productBrand = product.brand?.toLowerCase() || "";

    // Ponderaciones para diferentes tipos de coincidencia
    const weights = {
      exactMatch: 10,
      startsWith: 5,
      contains: 3,
      wordBoundary: 4,
      categoryMatch: 2,
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
    const wordRegex = new RegExp(`\\b${searchTerm}\\b`, "i");
    if (wordRegex.test(productName)) score += weights.wordBoundary;
    if (wordRegex.test(productDescription)) score += weights.wordBoundary;

    return score;
  }

  static async getSearchSuggestions(
    query: string,
    limit: number = 5
  ): Promise<any[]> {
    if (!query || query.length < 2) return [];

    const products = await prisma.product.findMany({
      where: {
        OR: [
          { 
            name: { 
              contains: query, 
              mode: "insensitive" as const 
            } 
          },
          { 
            slug: { 
              contains: query, 
              mode: "insensitive" as const 
            } 
          },
        ],
      },
      include: {
        categoryProducts: {
          include: { 
            category: true 
          },
        },
        inventory: {
          select: {
            stock: true,
          },
        },
      },
      take: limit,
    });

    return products.map((product) => {
      // Determinar stock disponible
      const stockQuantity = product.inventory?.stock !== undefined 
        ? product.inventory.stock 
        : 0;

      return {
        id: product.id,
        name: product.name,
        slug: product.slug,
        stock: stockQuantity,
      };
    });
  }
}