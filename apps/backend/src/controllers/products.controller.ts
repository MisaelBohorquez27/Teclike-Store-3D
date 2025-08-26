import { Request, Response } from "express";
import prisma from "../prisma";

// 🔹 Formato completo (para vistas de detalle, con categories y priceFormatted)
const formatProduct = (product: any) => ({
  ...product,
  price: product.priceCents / 100,
  priceFormatted: new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: product.currency,
  }).format(product.priceCents / 100),
  categories: product.categoryProducts.map((cp: any) => cp.category.name),
});

// 🔹 Formato resumido (para cards / grid)
const formatForCard = (p: any) => {
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
    rating: 0, // luego se reemplaza cuando tengas reviews
    image: p.imageUrl ?? "/placeholder.png",
    isNew,
  };
};

// 📌 GET /api/products → listado filtrado
export const listProducts = async (req: Request, res: Response) => {
  try {
    const {
      category,
      search,
      minPrice,
      maxPrice,
      sortBy = "createdAt",
      sortOrder = "desc",
    } = req.query;

    const where: any = {};

    // 🔎 Filtros
    if (search) {
      where.OR = [
        { name: { contains: search as string, mode: "insensitive" } },
        { description: { contains: search as string, mode: "insensitive" } },
        { brand: { contains: search as string, mode: "insensitive" } },
      ];
    }
    if (minPrice || maxPrice) {
      where.priceCents = {};
      if (minPrice) where.priceCents.gte = Number(minPrice) * 100;
      if (maxPrice) where.priceCents.lte = Number(maxPrice) * 100;
    }
    if (category) {
      where.categoryProducts = {
        some: {
          category: {
            name: { equals: category as string, mode: "insensitive" },
          },
        },
      };
    }

    // Ordenamiento seguro
    const allowedSort = new Set(["createdAt", "priceCents", "name"]);
    const sortKey = allowedSort.has(String(sortBy))
      ? String(sortBy)
      : "createdAt";
    const orderBy: any = { [sortKey]: sortOrder === "asc" ? "asc" : "desc" };

    const products = await prisma.product.findMany({
      where,
      orderBy,
      include: {
        categoryProducts: { include: { category: true } },
      },
    });

    // ⬇️ devolver array directo
    res.json(products.map(formatForCard));
  } catch (error) {
    console.error("❌ Error fetching products:", error);
    res.status(500).json({ message: "Error al obtener productos" });
  }
};

// 📌 GET /api/products/:slug → detalle de producto
export const getProduct = async (req: Request, res: Response) => {
  try {
    const product = await prisma.product.findUnique({
      where: { slug: req.params.slug },
      include: {
        categoryProducts: { include: { category: true } },
      },
    });

    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Producto no encontrado" });
    }

    res.json(formatProduct(product)); // ⬅️ directo, sin wrapper
  } catch (error) {
    console.error("❌ Error fetching product by slug:", error);
    res
      .status(500)
      .json({ success: false, message: "Error al obtener producto" });
  }
};

// 📌 GET /api/products/trending → productos populares
export const getTrendingProducts = async (req: Request, res: Response) => {
  try {
    const products = await prisma.product.findMany({
      take: 6,
      orderBy: { createdAt: "desc" },
      include: {
        categoryProducts: { include: { category: true } },
      },
    });

    const trending = products.map((p) => ({
      id: p.id,
      name: p.name,
      category: p.categoryProducts?.[0]?.category?.name || "Uncategorized",
      price: p.priceCents / 100,
      rating: 0,
      image: p.imageUrl || "/products/default.png",
    }));

    res.json(trending); // ⬅️ array plano
  } catch (error) {
    console.error("❌ Error fetching trending products:", error);
    res.status(500).json({ message: "Error al obtener productos populares" });
  }
};

