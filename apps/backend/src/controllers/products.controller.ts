// controllers/products.controller.ts
import { Request, Response } from "express";
import prisma from "../prisma";
import { SearchService } from "../services/search.service";

/* -------------------- HELPERS -------------------- */

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
    category: primaryCategory,
    price: formatCurrency(p.priceCents, p.currency), // 👈 string
    currency: p.currency,
    rating: p.rating ?? 0,
    description: p.description,
    image: p.imageUrl ?? "/placeholder.png",
    isNew,
  };
}

// 🔹 Formato detallado
function formatDetailedProduct(product: any) {
  const formattedReviews = product.reviews.map((review: any) => ({
    id: review.id,
    user: review.user.firstName,
    rating: review.rating,
    comment: review.comment,
    date: review.reviewDate.toISOString().split("T")[0],
  }));

  return {
    id: product.id,
    name: product.name,
    brand: product.brand,
    description: product.description,
    price: formatCurrency(product.priceCents, product.currency), // 👈 string
    currency: product.currency,
    image: product.imageUrl ?? "/placeholder.png",
    category:
      product.categoryProducts?.[0]?.category?.name ?? "Uncategorized",
    isNew:
      (Date.now() - new Date(product.createdAt).getTime()) /
        (1000 * 60 * 60 * 24) <=
      30,
    rating:
      product.reviews.length > 0
        ? product.reviews.reduce(
            (sum: number, review: any) => sum + review.rating,
            0
          ) / product.reviews.length
        : 5,
    reviews: formattedReviews,
    specifications: {
      Marca: product.brand,
      Categoría:
        product.categoryProducts?.[0]?.category?.name ?? "Uncategorized",
      Precio: formatCurrency(product.priceCents, product.currency),
      Estado:
        (Date.now() - new Date(product.createdAt).getTime()) /
          (1000 * 60 * 60 * 24) <=
        30
          ? "Nuevo"
          : "Usado",
    },
    createdAt: product.createdAt,
    updatedAt: product.updatedAt,
  };
}


/* -------------------- CONTROLLERS -------------------- */

// 📌 GET /api/products (unificado con filtros + paginación + búsqueda)
export const getProducts = async (req: Request, res: Response) => {
  try {
    const {
      q: query,
      category,
      minPrice,
      maxPrice,
      inStock,
      page,
      limit,
    } = req.query;

    const pageNum = parseInt(page as string) || 1;
    const limitNum = parseInt(limit as string) || 12;
    const skip = (pageNum - 1) * limitNum;

    // 🟢 Caso 1: hay búsqueda
    if (query && typeof query === "string" && query.trim().length >= 2) {
      const searchParams = {
        query: query.trim(),
        category: category as string,
        minPrice: minPrice ? parseFloat(minPrice as string) : undefined,
        maxPrice: maxPrice ? parseFloat(maxPrice as string) : undefined,
        inStock: inStock ? inStock === "true" : undefined,
        limit: limitNum,
        page: pageNum,
      };

      const { results, total } = await SearchService.searchProducts(
        searchParams
      );

      return res.json({
        items: results.map(formatForCard),
        pagination: {
          page: searchParams.page,
          limit: searchParams.limit,
          total,
          totalPages: Math.ceil(total / searchParams.limit),
          hasMore: results.length === searchParams.limit,
        },
      });
    }

    // 🟢 Caso 2: sin búsqueda → aplicar filtros
    const whereClause: any = {};

    if (category && typeof category === "string") {
      const categories = category
        .split(",")
        .map((c) => c.trim())
        .filter(Boolean);

      if (categories.length > 0) {
        whereClause.categoryProducts = {
          some: { category: { name: { in: categories } } },
        };
      }
    }

    if (minPrice) {
      whereClause.priceCents = {
        ...whereClause.priceCents,
        gte: parseFloat(minPrice as string) * 100,
      };
    }
    if (maxPrice) {
      whereClause.priceCents = {
        ...whereClause.priceCents,
        lte: parseFloat(maxPrice as string) * 100,
      };
    }
    if (inStock) {
      whereClause.stock = { gt: inStock === "true" ? 0 : 0 };
    }

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where: whereClause,
        include: { categoryProducts: { include: { category: true } } },
        skip,
        take: limitNum,
        orderBy: { createdAt: "desc" },
      }),
      prisma.product.count({ where: whereClause }),
    ]);

    const totalPages = Math.ceil(total / limitNum);

    return res.json({
      items: products.map(formatForCard),
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        totalPages,
        hasMore: pageNum < totalPages,
      },
    });
  } catch (error) {
    console.error("❌ Error obteniendo productos:", error);
    res.status(500).json({ message: "Error al obtener productos" });
  }
};

// 📌 GET /api/products/:id
export const getProductById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id || isNaN(Number(id))) {
      return res.status(400).json({ message: "ID de producto inválido" });
    }

    const product = await prisma.product.findUnique({
      where: { id: Number(id) },
      include: {
        categoryProducts: { include: { category: true } },
        reviews: { include: { user: { select: { id: true, firstName: true } } } },
      },
    });

    if (!product) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    res.json(formatDetailedProduct(product));
  } catch (error) {
    console.error("❌ Error fetching product by ID:", error);
    res.status(500).json({ message: "Error al obtener el producto" });
  }
};

// 📌 GET /api/products/slug/:slug
export const getProductBySlug = async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;

    const product = await prisma.product.findUnique({
      where: { slug },
      include: {
        categoryProducts: { include: { category: true } },
        reviews: { include: { user: { select: { id: true, firstName: true } } } },
      },
    });

    if (!product) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    res.json(formatDetailedProduct(product));
  } catch (error) {
    console.error("❌ Error fetching product by slug:", error);
    res.status(500).json({ message: "Error al obtener el producto" });
  }
};
