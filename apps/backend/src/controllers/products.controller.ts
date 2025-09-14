// controllers/products.controller.ts
import { Request, Response } from "express";
import prisma from "../prisma";
import { SearchService } from "../services/search.service";

// Transformador → convierte Product + Category al formato que espera el frontend
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
    price: p.priceCents / 100,
    currency: p.currency,
    rating: p.rating, // placeholder hasta que tengas reviews
    description: p.description,
    image: p.imageUrl ?? "/placeholder.png",
    isNew,
  };
}

// 📌 GET /api/products
export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await prisma.product.findMany({
      include: {
        categoryProducts: { include: { category: true } }, // relación con categorías
      },
      orderBy: { createdAt: "desc" },
    });

    res.json(products.map(formatForCard));
  } catch (error) {
    console.error("❌ Error fetching products:", error);
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
        categoryProducts: {
          include: {
            category: true,
          },
        },
        reviews: {
          include: {
            user: {
              select: {
                id: true,
                firstName: true,
                email: true, // o solo el nombre si prefieres
              },
            },
          },
          orderBy: {
            reviewDate: "desc",
          },
        },
        // Agregar imágenes si tienes una tabla separada
        // images: true,
      },
    });

    if (!product) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    // Formatear las reviews
    const formattedReviews = product.reviews.map((review) => ({
      id: review.id,
      user: review.user.firstName, // Usar el nombre del usuario
      rating: review.rating,
      comment: review.comment,
      date: review.reviewDate.toISOString().split("T")[0], // Formato YYYY-MM-DD
    }));

    const formattedProduct = {
      id: product.id,
      name: product.name,
      brand: product.brand,
      description: product.description,
      price: product.priceCents / 100,
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
          ? product.reviews.reduce((sum, review) => sum + review.rating, 0) /
            product.reviews.length
          : 5, // Rating promedio o 5 si no hay reviews
      reviews: formattedReviews,
      specifications: {
        Marca: product.brand,
        Categoría:
          product.categoryProducts?.[0]?.category?.name ?? "Uncategorized",
        Precio: `${product.currency} ${(product.priceCents / 100).toFixed(2)}`,
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

    res.json(formattedProduct);
  } catch (error) {
    console.error("❌ Error fetching product by ID:", error);
    res.status(500).json({ message: "Error al obtener el producto" });
  }
};

// controllers/products.controller.ts
export const getProductBySlug = async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;

    const product = await prisma.product.findUnique({
      where: { slug },
      include: {
        categoryProducts: {
          include: {
            category: true,
          },
        },
        reviews: {
          include: {
            user: {
              select: {
                id: true,
                firstName: true,
                email: true,
              },
            },
          },
          orderBy: {
            reviewDate: "desc",
          },
        },
      },
    });

    if (!product) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    // Usar la misma lógica de formato que getProductById
    const formattedProduct = {
      id: product.id,
      name: product.name,
      brand: product.brand,
      description: product.description,
      price: product.priceCents / 100,
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
          ? product.reviews.reduce((sum, review) => sum + review.rating, 0) /
            product.reviews.length
          : 5,
      reviews: product.reviews.map((review) => ({
        id: review.id,
        user: review.user.firstName,
        rating: review.rating,
        comment: review.comment,
        date: review.reviewDate.toISOString().split("T")[0],
      })),
      specifications: {
        Marca: product.brand,
        Categoría:
          product.categoryProducts?.[0]?.category?.name ?? "Uncategorized",
        Precio: `${product.currency} ${(product.priceCents / 100).toFixed(2)}`,
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

    res.json(formattedProduct);
  } catch (error) {
    console.error("❌ Error fetching product by slug:", error);
    res.status(500).json({ message: "Error al obtener el producto" });
  }
};

// controllers/productController.ts

export const getPaginatedProducts = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 12;
    const skip = (page - 1) * limit;

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        include: { categoryProducts: { include: { category: true } } },
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
      }),
      prisma.product.count(),
    ]);

    const totalPages = Math.ceil(total / limit);

    res.json({
      items: products.map(formatForCard),
      pagination: {
        page,
        limit,
        total,
        totalPages,
        hasMore: page < totalPages,
      },
    });
  } catch (err) {
    console.error("❌ Error paginando productos:", err);
    res.status(500).json({ message: "Error al obtener productos paginados" });
  }
};

export const getProductss = async (req: Request, res: Response) => {
  try {
    // Query params comunes
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

    // 🟢 Caso 1: hay búsqueda (`q`)
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

      const { results, total } = await SearchService.searchProducts(searchParams);

      return res.json({
        items: results.map((p) => ({
          ...formatForCard(p),
          price: p.price ?? 0,
          category: p.category ?? "Uncategorized",
        })), // ✅ para mantener formato
        pagination: {
          page: searchParams.page,
          limit: searchParams.limit,
          total,
          totalPages: Math.ceil(total / searchParams.limit),
          hasMore: results.length === searchParams.limit,
        },
      });
    }

    // 🟢 Caso 2: sin búsqueda → devolver todos los productos con paginación
    const [products, total] = await Promise.all([
      prisma.product.findMany({
        include: { categoryProducts: { include: { category: true } } },
        skip,
        take: limitNum,
        orderBy: { createdAt: "desc" },
      }),
      prisma.product.count(),
    ]);

    const totalPages = Math.ceil(total / limitNum);

    return res.json({
      items: products.map((p) => ({
        ...formatForCard(p),
        priceCents: p.priceCents ?? 0,
        price: p.priceCents / 100,
      })),
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
    return res.status(500).json({
      message: "Error al obtener productos",
    });
  }
};
