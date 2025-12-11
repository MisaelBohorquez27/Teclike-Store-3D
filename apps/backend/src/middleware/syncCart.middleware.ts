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
 * NO bloquea la respuesta - usa fire and forget con timeout
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
        // Ejecutar sincronización en background sin esperar (fire and forget)
        // Con timeout de 3 segundos máximo
        Promise.race([
          cartService.syncCartToDB(userId),
          new Promise((_, reject) => 
            setTimeout(() => reject(new Error('Sync timeout')), 3000)
          )
        ]).catch((error) => {
          console.warn(`⚠️ Error sincronizando carrito para usuario ${userId}:`, error.message);
        });
      }
    }
  } catch (error) {
    console.error("⚠️ Error en sincronización de carrito:", error);
    // No bloquear la request si hay error en sincronización
  }
  next(); // Continuar inmediatamente sin esperar sync
}
