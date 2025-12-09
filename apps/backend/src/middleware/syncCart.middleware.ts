import { Request, Response, NextFunction } from "express";
import * as cartService from "../services/cart.service";
import * as cacheService from "../services/cache.service";

interface AuthRequest extends Request {
  userId?: number;
  isAuthenticated?: boolean;
}

const SYNC_INTERVAL = 5 * 60 * 1000; // 5 minutos

export async function syncCartMiddleware(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const userId = req.userId;
    const isAuthenticated = req.isAuthenticated;

    if (userId && isAuthenticated) {
      const lastSync = await cacheService.getLastSyncTime(userId);
      const now = Date.now();

      // Sincronizar si pasaron 5 minutos o si está marcado como dirty
      if (now - lastSync > SYNC_INTERVAL || await cacheService.isCartDirty(userId)) {
        cartService.syncCartToDB(userId, isAuthenticated).catch(console.error);
      }
    }
  } catch (error) {
    console.error("Error en sincronización de carrito:", error);
  }
  next();
}
