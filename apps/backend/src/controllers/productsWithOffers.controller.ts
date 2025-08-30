// controllers/productController.ts
import { Request, Response } from "express";
import  prisma  from "../prisma"; // ajusta la ruta

export const getDailyDealProducts = async (req: Request, res: Response) => {
  try {
    const limit = parseInt(req.query.limit as string) || 100;

    const dailyDeals = await prisma.offerProduct.findMany({
      where: {
        offer: {
          recurrence: "daily", // 🔹 solo ofertas con recurrence = daily
        },
      },
      include: {
        product: true,
        offer: true,
      },
      take: limit,
    });

    // 🔹 Transformamos los datos al formato Deal
    const result = dailyDeals.map((op) => {
      const discount = op.offer.type === "percentage" ? op.offer.value : 0;
      const originalPrice = op.product.priceCents / 100;
      const discountPrice =
        op.offer.type === "percentage"
          ? originalPrice * (1 - discount / 100)
          : originalPrice - op.offer.value / 100;

      return {
        id: op.product.id,
        name: op.product.name,
        originalPrice,
        discountPrice,
        discount,
        image: op.product.imageUrl ?? "/placeholder.png",
        timeLeft: Math.ceil(
          (new Date(op.offer.endDate).getTime() - Date.now()) /
            (1000 * 60 * 60)
        ), // horas restantes
      };
    });

    res.json(result);
  } catch (error) {
    console.error("❌ Error al obtener productos con ofertas diarias:", error);
    res.status(500).json({ error: "Error al obtener productos con ofertas diarias" });
  }
};
