import Redis from "ioredis";
import { debug } from "../utils/debug";

export const redis = new Redis(process.env.REDIS_URL || "redis://localhost:6379");

const CART_EXPIRY = 24 * 60 * 60; // 24 horas
const SYNC_INTERVAL = 5 * 60; // 5 minutos

export async function getCachedCart(userId: number) {
  try {
    const cached = await redis.get(`cart:${userId}`);
    return cached ? JSON.parse(cached) : null;
  } catch (error) {
    return null;
  }
}

export async function setCachedCart(userId: number, cart: any) {
  try {
    await redis.setex(`cart:${userId}`, CART_EXPIRY, JSON.stringify(cart));
  } catch (error) {
    // Cache error
  }
}

export async function deleteCachedCart(userId: number) {
  try {
    await redis.del(`cart:${userId}`);
  } catch (error) {
    // Cache error
  }
}

export async function cartExists(userId: number) {
  try {
    return (await redis.exists(`cart:${userId}`)) > 0;
  } catch (error) {
    return false;
  }
}

export async function getCartHash(userId: number): Promise<string | null> {
  try {
    return await redis.get(`cartHash:${userId}`);
  } catch (error) {
    console.error(`❌ Error obteniendo hash del carrito para usuario ${userId}:`, error);
    return null;
  }
}

export async function setCartHash(userId: number, hash: string) {
  try {
    await redis.setex(`cartHash:${userId}`, CART_EXPIRY, hash);
  } catch (error) {
    console.error(`❌ Error guardando hash del carrito para usuario ${userId}:`, error);
  }
}

export async function getLastSyncTime(userId: number): Promise<number> {
  try {
    const time = await redis.get(`lastSync:${userId}`);
    return time ? parseInt(time) : 0;
  } catch (error) {
    console.error(`❌ Error obteniendo último sync para usuario ${userId}:`, error);
    return 0;
  }
}

export async function setLastSyncTime(userId: number) {
  try {
    await redis.setex(`lastSync:${userId}`, CART_EXPIRY, Date.now().toString());
  } catch (error) {
    console.error(`❌ Error guardando último sync para usuario ${userId}:`, error);
  }
}

export async function markCartDirty(userId: number) {
  try {
    await redis.setex(`cartDirty:${userId}`, SYNC_INTERVAL + 60, "1");
  } catch (error) {
    console.error(`❌ Error marcando carrito como dirty para usuario ${userId}:`, error);
  }
}

export async function isCartDirty(userId: number): Promise<boolean> {
  try {
    return (await redis.exists(`cartDirty:${userId}`)) > 0;
  } catch (error) {
    console.error(`❌ Error verificando si carrito es dirty para usuario ${userId}:`, error);
    return false;
  }
}

export async function cleanCartDirty(userId: number) {
  try {
    await redis.del(`cartDirty:${userId}`);
  } catch (error) {
    console.error(`❌ Error limpiando dirty flag para usuario ${userId}:`, error);
  }
}
