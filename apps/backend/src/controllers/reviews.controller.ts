import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * Obtener reviews de un producto con info de usuario y producto
 */
export const getProductReviews = async (req: Request, res: Response) => {
  try {
    const productId = Number(req.params.productId);
    if (isNaN(productId)) {
      return res.status(400).json({ error: "El ID de producto no es válido" });
    }

    const reviews = await prisma.review.findMany({
      where: { productId },
      include: {
        user: { select: { id: true, firstName: true, photoURL: true } },
        product: { select: { id: true, name: true } },
      },
      orderBy: { reviewDate: "desc" },
    });

    const formattedReviews = reviews.map((r) => ({
      id: r.id,
      name: r.user?.firstName || "Cliente",
      avatar: r.user?.photoURL || "/default-avatar.png",
      product: r.product?.name || "Producto",
      comment: r.comment,
      rating: r.rating,
    }));

    const avgRating =
      reviews.length > 0
        ? reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length
        : 0;

    return res.json({ reviews: formattedReviews, avgRating });
  } catch (error) {
    console.error("❌ Error obteniendo reseñas:", error);
    res.status(500).json({ error: "Error obteniendo reseñas del producto" });
  }
};

/**
 * Obtener reseñas aleatorias (sin importar producto)
 */
export const getRandomReviews = async (req: Request, res: Response) => {
  try {
    const reviews = await prisma.review.findMany({
      include: {
        user: { select: { id: true, firstName: true, photoURL: true } },
        product: { select: { id: true, name: true } },
      },
      take: 5, // tomamos más para tener variedad
      orderBy: { id: "desc" }, // últimas reseñas primero
    });

    // Mezclar aleatoriamente y quedarnos con N
    const shuffled = reviews.sort(() => 0.5 - Math.random()).slice(0, 10);

    const formattedReviews = shuffled.map((r) => ({
      id: r.id,
      name: r.user?.firstName || "Cliente",
      avatar: r.user?.photoURL || "/default-avatar.png",
      product: r.product?.name || "Producto",
      comment: r.comment,
      rating: r.rating,
    }));

    return res.json(formattedReviews);
  } catch (error) {
    console.error("❌ Error obteniendo reseñas aleatorias:", error);
    res.status(500).json({ error: "Error obteniendo reseñas aleatorias" });
  }
};

/**
 * Crear una nueva review
 */
export const createReview = async (req: Request, res: Response) => {
  try {
    const { userId, productId, comment, rating } = req.body;

    if (!userId || !productId || !rating) {
      return res.status(400).json({ error: "Faltan campos obligatorios" });
    }

    // 1. Verificar si el usuario compró el producto
    const orderProduct = await prisma.orderProducts.findFirst({
      where: { productId: Number(productId), order: { userId: Number(userId) } },
    });

    if (!orderProduct) {
      return res.status(400).json({ error: "El usuario no compró este producto" });
    }

    // 2. Verificar que no exista ya una review de este user-product
    const existingReview = await prisma.review.findFirst({
      where: { userId: Number(userId), productId: Number(productId) },
    });

    if (existingReview) {
      return res.status(400).json({ error: "Ya existe una reseña para este producto" });
    }

    // 3. Crear review
    const review = await prisma.review.create({
      data: {
        userId: Number(userId),
        productId: Number(productId),
        comment,
        rating,
      },
      include: {
        user: { select: { id: true, firstName: true, photoURL: true } },
        product: { select: { id: true, name: true } },
      },
    });

    // Formatear para devolver directamente usable en frontend
    const formattedReview = {
      id: review.id,
      name: review.user?.firstName || "Cliente",
      avatar: review.user?.photoURL || "/default-avatar.png",
      product: review.product?.name || "Producto",
      comment: review.comment,
      rating: review.rating,
    };

    return res.status(201).json(formattedReview);
  } catch (error) {
    console.error("❌ Error creando la reseña:", error);
    res.status(500).json({ error: "Error creando la reseña" });
  }
};
