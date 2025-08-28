// controllers/products.controller.ts
import { Request, Response } from "express";
import prisma from "../prisma";

// Transformador → convierte Product + Category al formato que espera el frontend
function formatForCard(p: any) {
  const primaryCategory = p.categoryProducts?.[0]?.category?.name ?? "Uncategorized";
  const isNew =
    (Date.now() - new Date(p.createdAt).getTime()) / (1000 * 60 * 60 * 24) <= 30;

  return {
    id: p.id,
    name: p.name,
    category: primaryCategory,
    price: p.priceCents / 100,
    currency: p.currency,
    rating: 5, // placeholder hasta que tengas reviews
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
        categoryProducts: { include: { category: true } }, // 🔑 relación con categorías
      },
      orderBy: { createdAt: "desc" },
    });

    res.json(products.map(formatForCard));
  } catch (error) {
    console.error("❌ Error fetching products:", error);
    res.status(500).json({ message: "Error al obtener productos" });
  }
};
