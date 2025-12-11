import { transformCart } from "../mappers/cart.formatter";
import prisma from "../prisma";
import { Response } from "express";
import { AuthRequest } from "../middleware/auth.middleware";

// Checkout summary (solo cálculos de la orden)
export const getCheckoutSummary = async (req: AuthRequest, res: Response) => {
  try {
    // Validar que el usuario esté autenticado
    if (!req.user || !req.user.username) {
      return res.status(401).json({
        message: "Usuario no autenticado. Debe estar logueado para hacer checkout.",
      });
    }

    const userId = req.user.userId;

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
      return res.status(404).json({
        message: "Carrito no encontrado para este usuario",
      });
    }

    // Validar que hay items en el carrito
    if (!cart.cartProducts || cart.cartProducts.length === 0) {
      return res.status(400).json({
        message: "El carrito está vacío",
      });
    }

    // Transformar carrito para usar sus totales
    const transformedCart = transformCart(cart);

    // Extraer solo el resumen de pago
    if (!transformedCart) {
      return res.status(500).json({
        message: "No se pudo transformar el carrito",
      });
    }

    const { subtotal, tax, shipping, total } = transformedCart;

    res.json({
      subtotal,
      tax,
      shipping,
      total,
      itemCount: cart.cartProducts.length,
      currency: "USD",
    });
  } catch (error: any) {
    console.error("Error al obtener resumen de checkout:", error);
    res.status(500).json({
      message: "Error interno del servidor",
      error: error.message,
    });
  }
};
