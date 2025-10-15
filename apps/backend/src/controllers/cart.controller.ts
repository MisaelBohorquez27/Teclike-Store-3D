import { Request, Response } from "express";
import * as cartService from "../services/cart.service";
import { handleError } from "../utils/errorHandler";

export const getCart = async (req: Request, res: Response) => {
  try {
    const userId = 1; // temporal
    const cart = await cartService.getCart(userId);
    res.json(cart);
  } catch (error) {
    handleError(res, error, "Error al obtener el carrito");
  }
};

export const addToCart = async (req: Request, res: Response) => {
  try {
    const userId = 1;
    const { productId, quantity = 1 } = req.body;
    const cart = await cartService.addToCart(userId, productId, quantity);
    res.json(cart);
  } catch (error) {
    handleError(res, error, "Error al agregar al carrito");
  }
};

export const updateCartItem = async (req: Request, res: Response) => {
  try {
    const userId = 1;
    const { productId, quantity } = req.body;
    const cart = await cartService.updateCartItem(userId, productId, quantity);
    res.json(cart);
  } catch (error) {
    handleError(res, error, "Error al actualizar el carrito");
  }
};

export const removeFromCart = async (req: Request, res: Response) => {
  try {
    const userId = 1;
    const { productId } = req.body;
    const cart = await cartService.removeFromCart(userId, productId);
    res.json(cart);
  } catch (error) {
    handleError(res, error, "Error al eliminar del carrito");
  }
};

export const clearCart = async (req: Request, res: Response) => {
  try {
    const userId = 1;
    const cart = await cartService.clearCart(userId);
    res.json(cart);
  } catch (error) {
    handleError(res, error, "Error al vaciar el carrito");
  }
};
