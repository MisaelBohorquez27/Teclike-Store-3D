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
            category: true 
          } 
        },
        reviews: {
          include: {
            user: {
              select: {
                id: true,
                firstName: true,
                email: true // o solo el nombre si prefieres
              }
            }
          },
          orderBy: {
            reviewDate: 'desc'
          }
        },
        // Agregar imágenes si tienes una tabla separada
        // images: true,
      },
    });

    if (!product) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    // Formatear las reviews
    const formattedReviews = product.reviews.map(review => ({
      id: review.id,
      user: review.user.firstName, // Usar el nombre del usuario
      rating: review.rating,
      comment: review.comment,
      date: review.reviewDate.toISOString().split('T')[0] // Formato YYYY-MM-DD
    }));

    const formattedProduct = {
      id: product.id,
      name: product.name,
      brand: product.brand,
      description: product.description,
      price: product.priceCents / 100,
      currency: product.currency,
      image: product.imageUrl ?? "/placeholder.png",
      category: product.categoryProducts?.[0]?.category?.name ?? "Uncategorized",
      isNew: (Date.now() - new Date(product.createdAt).getTime()) / (1000 * 60 * 60 * 24) <= 30,
      rating: product.reviews.length > 0 
        ? product.reviews.reduce((sum, review) => sum + review.rating, 0) / product.reviews.length
        : 5, // Rating promedio o 5 si no hay reviews
      reviews: formattedReviews,
      specifications: {
        Marca: product.brand,
        Categoría: product.categoryProducts?.[0]?.category?.name ?? "Uncategorized",
        "Precio": `${product.currency} ${(product.priceCents / 100).toFixed(2)}`,
        "Estado": (Date.now() - new Date(product.createdAt).getTime()) / (1000 * 60 * 60 * 24) <= 30 ? "Nuevo" : "Usado"
      },
      createdAt: product.createdAt,
      updatedAt: product.updatedAt
    };

    res.json(formattedProduct);
  } catch (error) {
    console.error("❌ Error fetching product by ID:", error);
    res.status(500).json({ message: "Error al obtener el producto" });
  }
};