// controllers/productController.ts
import { Request, Response } from "express";
import prisma from "../prisma";

/* 🔧 Utilidad para formatear precios */
function formatCurrency(cents: number, currency: string) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(cents / 100);
}

export const getTopSellingProducts = async (req: Request, res: Response) => {
  try {
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    // 1) Agrupamos ventas por producto (ajusta el modelo si es `orderProduct`)
    const topProducts = await prisma.orderProducts.groupBy({
      by: ["productId"],
      where: {
        createdAt: { gte: oneWeekAgo }, 
      },
      _sum: {
        quantity: true,
      },
      orderBy: {
        _sum: {
          quantity: "desc",
        },
      },
      take: 5,
    });

    if (topProducts.length === 0) {
      return res.json([]); // nada vendido en la última semana
    }

    // 2) Buscar info completa de esos productos
    const productDetails = await prisma.product.findMany({
      where: {
        id: { in: topProducts.map((p) => p.productId) },
      },
      include: {
        categoryProducts: { include: { category: true } },
        reviews: true,
        inventory: true,
      },
    });

    // 3) Mapear al formato estándar (igual que en products.controller.ts)
    const result = topProducts.map((tp) => {
      const product = productDetails.find((p) => p.id === tp.productId);
      if (!product) return null;

      const rating =
        product.reviews.length > 0
          ? product.reviews.reduce((sum, r) => sum + r.rating, 0) /
            product.reviews.length
          : 0;

      const category =
        product.categoryProducts?.[0]?.category?.name ?? "Uncategorized";

      const isNew =
        new Date().getTime() - new Date(product.createdAt).getTime() <
        30 * 24 * 60 * 60 * 1000;

      return {
        id: product.id,
        name: product.name,
        brand: product.brand ?? "",
        slug: product.slug,
        category,
        rating,
        reviewCount: product.reviews.length,
        image: product.imageUrl ?? "/products/default.png",
        price: formatCurrency(product.priceCents, product.currency),
        inStock: (product.inventory?.stock ?? 0) > 0,
        isNew,
        description: product.description ?? "",
      };
    }).filter(Boolean);

    res.json(result);
  } catch (error) {
    console.error("❌ Error fetching top-selling products:", error);
    res.status(500).json({ message: "Error al obtener productos más vendidos" });
  }
};
