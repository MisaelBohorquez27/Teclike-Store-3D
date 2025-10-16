// controllers/searchController.ts
import { Request, Response } from "express";
import { SearchService } from "../services/search.service";
import { SearchParams } from "../types/search";
import { formatForCardSearch } from "../mappers/search.formatter";

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
      data: results.map(formatForCardSearch),
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
