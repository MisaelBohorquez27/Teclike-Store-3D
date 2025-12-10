import Redis from "ioredis";

const redis = new Redis(process.env.REDIS_URL || "redis://localhost:6379");
const CART_EXPIRY = 24 * 60 * 60; // 24 horas
const SYNC_INTERVAL = 5 * 60; // 5 minutos

export async function getCachedCart(userId: number) {
  const cached = await redis.get(`cart:${userId}`);
  return cached ? JSON.parse(cached) : null;
}

export async function setCachedCart(userId: number, cart: any) {
  await redis.setex(`cart:${userId}`, CART_EXPIRY, JSON.stringify(cart));
}

export async function deleteCachedCart(userId: number) {
  await redis.del(`cart:${userId}`);
}

export async function cartExists(userId: number) {
  return (await redis.exists(`cart:${userId}`)) > 0;
}

export async function getCartHash(userId: number): Promise<string | null> {
  return redis.get(`cartHash:${userId}`);
}

export async function setCartHash(userId: number, hash: string) {
  await redis.setex(`cartHash:${userId}`, CART_EXPIRY, hash);
}

export async function getLastSyncTime(userId: number): Promise<number> {
  const time = await redis.get(`lastSync:${userId}`);
  return time ? parseInt(time) : 0;
}

export async function setLastSyncTime(userId: number) {
  await redis.setex(`lastSync:${userId}`, CART_EXPIRY, Date.now().toString());
}

export async function markCartDirty(userId: number) {
  await redis.setex(`cartDirty:${userId}`, SYNC_INTERVAL + 60, "1");
}

export async function isCartDirty(userId: number): Promise<boolean> {
  return (await redis.exists(`cartDirty:${userId}`)) > 0;
}

export async function cleanCartDirty(userId: number) {
  await redis.del(`cartDirty:${userId}`);
}
