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

    // 2) Buscar info completa de esos productos
    const productDetails = await prisma.product.findMany({
      where: {
        id: { in: topProducts.map((p) => p.productId) },
      },
      include: {
        categoryProducts: {
          include: {
            category: true
          }
        },
        // Incluir relaciones para rating si las tienes
        reviews: true,
        // Incluir stock si es una relación o campo directo
        inventory: true
      },
    });

    // 3) Mapear al formato ProductForCard
    const result = topProducts.map((tp) => {
      const product = productDetails.find((p) => p.id === tp.productId);
      
      // Calcular rating promedio
      const rating = product?.reviews && product.reviews.length > 0 
        ? product.reviews.reduce((sum, review) => sum + review.rating, 0) / product.reviews.length 
        : 0;
      
      // Obtener categoría
      const category = product?.categoryProducts?.[0]?.category?.name || "";
      
      // Obtener imagen (ajusta según tu estructura de datos)
      const image = product?.imageUrl || `/products/${product?.id}.jpg` || "/products/mouse-x11.png";
      
      return {
        id: product?.id ?? 0,
        name: product?.name ?? "Unknown",
        slug: product?.slug ?? `product-${product?.id}`,
        category: category,
        price: (product?.priceCents ?? 0) / 100,
        currency: product?.currency ?? "USD",
        rating: rating,
        reviewCount: product?.reviews?.length ?? 0,
        image: image,
        isNew: product?.createdAt ? 
          (new Date().getTime() - new Date(product.createdAt).getTime()) < (30 * 24 * 60 * 60 * 1000) : false, // Nuevo si creado hace menos de 30 días
        inStock: (product?.inventory?.stock ?? 0) > 0,
        brand: product?.brand ?? "",
        description: product?.description ?? "",
      };
    });

    res.json(result);
  } catch (error) {
    console.error("❌ Error fetching top-selling products:", error);
    res.status(500).json({ message: "Error al obtener productos más vendidos" });
  }
};