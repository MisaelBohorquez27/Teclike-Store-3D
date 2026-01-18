import { Request, Response } from "express";
import * as cartService from "../services/cart.service";
import { handleError } from "../utils/errorHandler";

interface AuthRequest extends Request {
  userId?: number;
}

export const getCart = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId!;
    const cart = await cartService.getCart(userId);
    res.json({
      success: true,
      data: cart,
    });
  } catch (error) {
    handleError(res, error, "Error al obtener el carrito");
  }
};

export const addToCart = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId!;
    const { productId, quantity = 1 } = req.body;

    console.log(`🔍 [CONTROLLER] addToCart - userId=${userId}, productId=${productId}, quantity=${quantity}`);

    if (!productId) {
      return res.status(400).json({
        success: false,
        message: "productId es requerido",
      });
    }

    const cartResponse = await cartService.addToCart(userId, productId, quantity);
    
    console.log(`✅ [CONTROLLER] Respuesta enviada - itemCount=${cartResponse.data.itemCount}`);
    
    res.json(cartResponse);
  } catch (error) {
    handleError(res, error, "Error al agregar al carrito");
  }
};

export const updateCartItem = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId!;
    const { productId, quantity } = req.body;

    if (!productId) {
      return res.status(400).json({
        success: false,
        message: "productId es requerido",
      });
    }

    const cart = await cartService.updateCartItem(userId, productId, quantity);
    res.json({
      success: true,
      data: cart,
    });
  } catch (error) {
    handleError(res, error, "Error al actualizar el carrito");
  }
};

export const removeFromCart = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId!;
    const { productId } = req.body;

    if (!productId) {
      return res.status(400).json({
        success: false,
        message: "productId es requerido",
      });
    }

    const cart = await cartService.removeFromCart(userId, productId);
    res.json({
      success: true,
      data: cart,
    });
  } catch (error) {
    handleError(res, error, "Error al eliminar del carrito");
  }
};

export const clearCart = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId!;
    const cart = await cartService.clearCart(userId);
    res.json({
      success: true,
      data: cart,
    });
  } catch (error) {
    handleError(res, error, "Error al vaciar el carrito");
  }
};
