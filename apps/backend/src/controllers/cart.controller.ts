import { Request, Response } from "express";
import * as cartService from "../services/cart.service";
import { handleError } from "../utils/errorHandler";

interface AuthRequest extends Request {
  userId?: number;
  isAuthenticated?: boolean;
}

export const getCart = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId || 0;
    const isAuthenticated = req.isAuthenticated || false;
    const cart = await cartService.getCart(userId, isAuthenticated);
    res.json(cart);
  } catch (error) {
    handleError(res, error, "Error al obtener el carrito");
  }
};

export const addToCart = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId || 0;
    const isAuthenticated = req.isAuthenticated || false;
    const { productId, quantity = 1 } = req.body;
    const cart = await cartService.addToCart(userId, productId, quantity, isAuthenticated);
    res.json(cart);
  } catch (error) {
    handleError(res, error, "Error al agregar al carrito");
  }
};

export const updateCartItem = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId || 0;
    const isAuthenticated = req.isAuthenticated || false;
    const { productId, quantity } = req.body;
    const cart = await cartService.updateCartItem(userId, productId, quantity, isAuthenticated);
    res.json(cart);
  } catch (error) {
    handleError(res, error, "Error al actualizar el carrito");
  }
};

export const removeFromCart = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId || 0;
    const isAuthenticated = req.isAuthenticated || false;
    const { productId } = req.body;
    const cart = await cartService.removeFromCart(userId, productId, isAuthenticated);
    res.json(cart);
  } catch (error) {
    handleError(res, error, "Error al eliminar del carrito");
  }
};

export const clearCart = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId || 0;
    const isAuthenticated = req.isAuthenticated || false;
    const cart = await cartService.clearCart(userId, isAuthenticated);
    res.json(cart);
  } catch (error) {
    handleError(res, error, "Error al vaciar el carrito");
  }
};
