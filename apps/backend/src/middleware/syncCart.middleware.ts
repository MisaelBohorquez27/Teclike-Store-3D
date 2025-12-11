import { Request, Response, NextFunction } from "express";
import * as cartService from "../services/cart.service";
import * as cacheService from "../services/cache.service";

interface AuthRequest extends Request {
  userId?: number;
}

const SYNC_INTERVAL = 5 * 60 * 1000; // 5 minutos

/**
 * Middleware para sincronizar el carrito desde caché a BD
 * Se ejecuta automáticamente cada 5 minutos o cuando está marcado como "dirty"
 * Solo se ejecuta para usuarios autenticados
 */
export async function syncCartMiddleware(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const userId = req.userId;

    // Solo sincronizar si hay usuario autenticado
    if (userId) {
      const lastSync = await cacheService.getLastSyncTime(userId);
      const now = Date.now();

      // Sincronizar si pasaron 5 minutos o si está marcado como dirty
      if (
        now - lastSync > SYNC_INTERVAL ||
        (await cacheService.isCartDirty(userId))
      ) {
        // Ejecutar sincronización sin bloquear la request
        cartService.syncCartToDB(userId).catch(console.error);
      }
    }
  } catch (error) {
    console.error("Error en sincronización de carrito:", error);
    // No bloquear la request si hay error en sincronización
  }
  next();
}
