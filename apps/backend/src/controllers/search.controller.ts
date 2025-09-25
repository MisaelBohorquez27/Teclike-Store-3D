// controllers/searchController.ts
import { Request, Response } from "express";
import { SearchService } from "../services/search.service";
import { SearchParams } from "../types/search";

// 🔹 Formatear precio
function formatCurrency(cents: number, currency: string) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(cents / 100);
}

// 🔹 Formato "tarjeta"
function formatForCard(p: any) {
  const primaryCategory =
    p.categoryProducts?.[0]?.category?.name ?? "Uncategorized";
  const isNew =
    (Date.now() - new Date(p.createdAt).getTime()) / (1000 * 60 * 60 * 24) <=
    30;

  return {
    id: p.id,
    name: p.name,
    slug: p.slug,
    price: formatCurrency(p.priceCents, p.currency), // 👈 string
    image: p.imageUrl ?? "/placeholder.png",
    category: primaryCategory,
    rating: p.rating ?? 0,
    reviewCount: p._count?.reviews ?? 0,
    score: p._score ?? 0,
    inStock: p.stock > 0, // 👈 boolean
  };
}

export const searchProducts = async (req: Request, res: Response) => {
  try {
    const { q: query, category, inStock, limit, page } = req.query;

    const pageNum = parseInt(page as string) || 1;
    const limitNum = parseInt(limit as string) || 12;

    if (!query || typeof query !== "string" || query.trim().length < 2) {
      return res.status(400).json({
        message:
          "Término de búsqueda inválido. Mínimo 2 caracteres requeridos.",
      });
    }

    const searchParams: SearchParams = {
      query: query.trim(),
      category: category as string,
      inStock: inStock ? inStock === "true" : undefined,
      limit: limitNum,
      page: pageNum,
    };

    const { results, total } = await SearchService.searchProducts(searchParams);

    return res.json({
      success: true,
      data: results.map(formatForCard),
      pagination: {
        page: searchParams.page,
        limit: searchParams.limit,
        total,
        totalPages: Math.ceil(total / searchParams.limit!),
        hasMore: results.length === searchParams.limit,
      },
    });
  } catch (error) {
    console.error("❌ Error en búsqueda de productos:", error);
    res.status(500).json({
      success: false,
      message: "Error interno del servidor al buscar productos",
    });
  }
};

export const getSearchSuggestions = async (req: Request, res: Response) => {
  try {
    const { q: query, limit } = req.query;

    // Validaciones
    if (!query || typeof query !== "string") {
      return res.status(400).json({
        success: false,
        message: "Parámetro de búsqueda requerido",
      });
    }

    if (query.trim().length < 2) {
      return res.json([]);
    }

    const limitNumber = limit ? parseInt(limit as string) : 5;

    if (isNaN(limitNumber) || limitNumber < 1 || limitNumber > 20) {
      return res.status(400).json({
        success: false,
        message: "Límite debe ser entre 1 y 20",
      });
    }

    const suggestions = await SearchService.getSearchSuggestions(
      query,
      limitNumber
    );

    res.json(suggestions);
  } catch (error) {
    console.error("❌ Error en getSearchSuggestions:", error);
    res.status(500).json({
      success: false,
      message: "Error interno del servidor",
    });
  }
};
