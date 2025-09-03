// controllers/searchController.ts
import { Request, Response } from "express";
import { SearchService, SearchParams } from "../services/search.service";

export const searchProducts = async (req: Request, res: Response) => {
  try {
    const {
      q: query,
      category,
      minPrice,
      maxPrice,
      inStock,
      limit = "10",
      page = "1"
    } = req.query;

    if (!query || typeof query !== 'string' || query.trim().length < 2) {
      return res.status(400).json({ 
        message: "Término de búsqueda inválido. Mínimo 2 caracteres requeridos." 
      });
    }

    const searchParams: SearchParams = {
      query: query.trim(),
      category: category as string,
      minPrice: minPrice ? parseFloat(minPrice as string) : undefined,
      maxPrice: maxPrice ? parseFloat(maxPrice as string) : undefined,
      inStock: inStock ? inStock === 'true' : undefined,
      limit: parseInt(limit as string),
      page: parseInt(page as string)
    };

    const results = await SearchService.searchProducts(searchParams);

    res.json({
      success: true,
      data: results,
      pagination: {
        page: searchParams.page,
        limit: searchParams.limit,
        total: results.length,
        hasMore: results.length === searchParams.limit
      }
    });
  } catch (error) {
    console.error("❌ Error en búsqueda de productos:", error);
    res.status(500).json({ 
      success: false,
      message: "Error interno del servidor al buscar productos" 
    });
  }
};

export const getSearchSuggestions = async (req: Request, res: Response) => {
  try {
    const { q: query } = req.query;
    const limit = parseInt(req.query.limit as string) || 5;

    if (!query || typeof query !== 'string' || query.length < 2) {
      return res.json([]);
    }

    const suggestions = await SearchService.getSearchSuggestions(query, limit);
    res.json(suggestions);
  } catch (error) {
    console.error("❌ Error obteniendo sugerencias:", error);
    res.json([]); // Devolver array vacío en caso de error
  }
};