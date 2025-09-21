import { Request, Response } from "express";
import prisma from "../prisma";

export const getTopSellingProducts = async (req: Request, res: Response) => {
  try {
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    // 1) Agrupamos por producto
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
      take: 5, // top 5 más vendidos
    });

    // 2) Buscar info de esos productos
    const productDetails = await prisma.product.findMany({
      where: {
        id: { in: topProducts.map((p) => p.productId) },
      },
    });

    // 3) Mapear al formato esperado
    const result = topProducts.map((tp) => {
      const product = productDetails.find((p) => p.id === tp.productId);
      return {
        id: product?.id ?? 0,
        title: product?.name ?? "Unknown",
        description: product?.description ?? "",
        price: (product?.priceCents ?? 0) / 100,
        currency: product?.currency ?? "USD",
      };
    });

    res.json(result);
  } catch (error) {
    console.error("❌ Error fetching top-selling products:", error);
    res.status(500).json({ message: "Error al obtener productos más vendidos" });
  }
};
