import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export function findOffersWithProducts(recurrence: string | null) {
  return prisma.offer.findMany({
    where: recurrence ? { recurrence } : {},
    include: { offerProducts: { include: { product: true } } },
  });
}

export function findFallbackProducts(limit: number) {
  return prisma.product.findMany({
    take: limit,
    orderBy: { createdAt: "desc" },
  });
}
