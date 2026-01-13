import * as productRepo from "../repositories/products.repository";
import { formatForCard, formatDetailedProduct } from "../mappers/products.formatter";
import { SearchService } from "./search.service";

export async function getPaginatedProducts(query: any) {
  const {
    q,
    category,
    minPrice,
    maxPrice,
    inStock,
    page = "1",
    limit = "20",
  } = query;

  const pageNum = parseInt(page);
  const limitNum = parseInt(limit);
  const skip = (pageNum - 1) * limitNum;

  if (q && typeof q === "string" && q.trim().length >= 2) {
    const searchParams = {
      query: q.trim(),
      category: category as string,
      minPrice: minPrice ? parseFloat(minPrice) : undefined,
      maxPrice: maxPrice ? parseFloat(maxPrice) : undefined,
      inStock: inStock === "true",
      limit: limitNum,
      page: pageNum,
    };

    const { results, total } = await SearchService.searchProducts(searchParams);

    return {
      items: results.map(formatForCard),
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        totalPages: Math.ceil(total / limitNum),
        hasMore: results.length === limitNum,
      },
    };
  }

  const whereClause: any = {};

  if (category) {
    const categories = category.split(",").map((c: string) => c.trim()).filter(Boolean);
    if (categories.length > 0) {
      whereClause.categoryProducts = {
        some: { category: { name: { in: categories } } },
      };
    }
  }

  if (minPrice) {
    whereClause.priceCents = {
      ...whereClause.priceCents,
      gte: parseFloat(minPrice) * 100,
    };
  }

  if (maxPrice) {
    whereClause.priceCents = {
      ...whereClause.priceCents,
      lte: parseFloat(maxPrice) * 100,
    };
  }

  if (inStock) {
    whereClause.stock = { gt: inStock === "true" ? 0 : 0 };
  }

  const [products, total] = await productRepo.findFilteredProducts(whereClause, skip, limitNum);
  const totalPages = Math.ceil(total / limitNum);

  return {
    items: products.map(formatForCard),
    pagination: {
      page: pageNum,
      limit: limitNum,
      total,
      totalPages,
      hasMore: pageNum < totalPages,
    },
  };
}

export async function getProductByIdService(id: number) {
  if (!id || isNaN(id)) throw new Error("ID de producto inválido");
  const product = await productRepo.findProductById(id);
  if (!product) throw new Error("Producto no encontrado");
  return formatDetailedProduct(product);
}

export async function getProductBySlugService(slug: string) {
  const product = await productRepo.findProductBySlug(slug);
  if (!product) throw new Error("Producto no encontrado");
  return formatDetailedProduct(product);
}
