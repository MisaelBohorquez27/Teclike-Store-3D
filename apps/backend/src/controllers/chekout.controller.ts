import prisma from "../prisma";
import { transformCart } from "../services/cart.service";
import { Request, Response } from "express";

// Checkout summary (solo cálculos de la orden)
export const getCheckoutSummary = async (req: Request, res: Response) => {
  try {
    const userId = 1; // Usuario temporal

    // Obtener el carrito del usuario
    const cart = await prisma.cart.findUnique({
      where: { userId },
      include: {
        cartProducts: {
          include: { product: { include: { inventory: true } } },
        },
      },
    });

    if (!cart) {
      return res.status(404).json({ message: "Carrito no encontrado" });
    }

    // Transformar carrito para usar sus totales
    const transformedCart = transformCart(cart);

    // Extraer solo el resumen de pago
    if (!transformedCart) {
      return res.status(404).json({ message: "No se pudo transformar el carrito" });
    }
    const { subtotal, tax, shipping, total } = transformedCart;

    res.json({
      subtotal,
      tax,
      shipping,
      total,
    });
  } catch (error: any) {
    console.error("Error al obtener resumen de checkout:", error);
    res.status(500).json({ message: "Error interno del servidor", error: error.message });
  }
};
