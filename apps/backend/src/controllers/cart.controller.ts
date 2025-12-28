import { Request, Response } from "express";
import * as cartService from "../services/cart.service";
import { handleError } from "../utils/errorHandler";

interface AuthRequest extends Request {
  userId?: number;
}

/**
 * Obtener el carrito del usuario autenticado
 * Solo usuarios logeados pueden acceder
 */
export const getCart = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId!;
    const cart = await cartService.getCart(userId);
    res.json(cart);
  } catch (error) {
    handleError(res, error, "Error al obtener el carrito");
  }
};

/**
 * Agregar producto al carrito
 * Solo usuarios logeados pueden agregar
 * Se guarda primero en caché (Redis), luego se sincroniza con BD
 */
export const addToCart = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId!;
    const { productId, quantity = 1 } = req.body;

    if (!productId) {
      return res.status(400).json({
        success: false,
        message: "productId es requerido",
      });
    }

    if (quantity < 1) {
      return res.status(400).json({
        success: false,
        message: "Cantidad debe ser mayor a 0",
      });
    }

    const cart = await cartService.addToCart(userId, productId, quantity);
    res.json(cart);
  } catch (error) {
    handleError(res, error, "Error al agregar al carrito");
  }
};

/**
 * Actualizar cantidad de un producto en el carrito
 * Solo usuarios logeados pueden actualizar
 */
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

    if (quantity === undefined || quantity < 0) {
      return res.status(400).json({
        success: false,
        message: "Cantidad debe ser mayor o igual a 0",
      });
    }

    const cart = await cartService.updateCartItem(userId, productId, quantity);
    res.json(cart);
  } catch (error) {
    handleError(res, error, "Error al actualizar el carrito");
  }
};

/**
 * Eliminar un producto del carrito
 * Solo usuarios logeados pueden eliminar
 */
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
    res.json(cart);
  } catch (error) {
    handleError(res, error, "Error al eliminar del carrito");
  }
};

/**
 * Vaciar el carrito completamente
 * Solo usuarios logeados pueden vaciar
 */
export const clearCart = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId!;
    const cart = await cartService.clearCart(userId);
    res.json(cart);
  } catch (error) {
    handleError(res, error, "Error al vaciar el carrito");
  }
};

/**
 * SINCRONIZAR CARRITO - Patrón Batching/Agrupamiento
 * 
 * Frontend envía TODOS los items del carrito (después de cambios locales)
 * Backend reemplaza todo el carrito con estos items en una sola transacción
 * 
 * Ventaja: 
 * - Una sola llamada a BD (no múltiples addToCart)
 * - UI rápida (optimistic updates en frontend)
 * - Sin queries N+1
 * - Reduce carga significativamente
 * 
 * Flujo:
 * 1. Frontend cambia carrito en localStorage
 * 2. Frontend agrada cambios por 10 segundos
 * 3. Frontend envía sync con TODOS los items
 * 4. Backend actualiza carrito atomicamente
 * 5. Backend responde carrito actualizado
 */
export const syncCart = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId!;
    const { items } = req.body; // items = [{ productId, quantity }, ...]

    if (!Array.isArray(items)) {
      return res.status(400).json({
        success: false,
        message: "items debe ser un array",
      });
    }

    // Validar formato de cada item
    for (const item of items) {
      if (!item.productId || item.quantity === undefined) {
        return res.status(400).json({
          success: false,
          message: "Cada item debe tener productId y quantity",
        });
      }
      if (item.quantity < 0) {
        return res.status(400).json({
          success: false,
          message: "Cantidad no puede ser negativa",
        });
      }
    }

    console.log(`🔄 [SYNC] Usuario ${userId} sincronizando ${items.length} items`);

    // Sincronizar carrito (reemplaza todos los items)
    const cart = await cartService.syncCart(userId, items);
    
    console.log(`✅ [SYNC] Carrito sincronizado - itemCount=${cart.data?.itemCount}`);
    res.json(cart);
  } catch (error) {
    handleError(res, error, "Error al sincronizar carrito");
  }
};
