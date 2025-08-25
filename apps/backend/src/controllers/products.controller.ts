import { Request, Response } from "express";
import prisma from "../prisma";

// Me transforma los datos y tambien la moneda de cambio
const formatProduct = (product: any) => ({
  ...product,
  price: product.priceCents / 100,
  priceFormatted: new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: product.currency,
  }).format(product.priceCents / 100), // Formateo de moneda
  categories: product.categoryProducts.map((cp: any) => cp.category.name),
});

// Helper para formatear a lo que espera tu frontend
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
    rating: 0, // no tienes ratings aún; cuando tengas Reviews, cámbialo
    image: p.imageUrl ?? "/placeholder.png",
    isNew,
  };
}

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

    // Construye filtros para Prisma
    const where: any = {};

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

    // Si filtras por categoría (por nombre), usa la relación many-to-many
    if (category) {
      where.categoryProducts = {
        some: {
          category: {
            name: { equals: category as string, mode: "insensitive" },
          },
        },
      };
    }

    // Valida sortBy para evitar campos inválidos
    const allowedSort = new Set(["createdAt", "priceCents", "name"]);
    const sortKey = allowedSort.has(String(sortBy)) ? String(sortBy) : "createdAt";
    const orderBy: any = {};
    orderBy[sortKey] = sortOrder === "asc" ? "asc" : "desc";

    // Consulta con categorías
    const products = await prisma.product.findMany({
      where,
      orderBy,
      include: {
        categoryProducts: { include: { category: true } },
      },
    });

    // ⬇️ Devuelve **array directo** en el formato que espera tu UI
    res.json(products.map(formatForCard));
  } catch (error) {
    console.error("❌ Error fetching products:", error);
    res.status(500).json({ message: "Error al obtener productos" });
  }
};

export const getProduct = async (req: Request, res: Response) => {
  try {
    const product = await prisma.product.findUnique({
      where: { slug: req.params.slug },
      include: {
        categoryProducts: { include: { category: true } },
      },
    });

    if (!product) {
      return res.status(404).json({ success: false, message: "Producto no encontrado" });
    }

    res.json({ success: true, data: formatProduct(product) });
  } catch (error) {
    console.error("❌ Error fetching product by slug:", error);
    res.status(500).json({ success: false, message: "Error al obtener producto" });
  }
};