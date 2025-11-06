import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export function getTopSellingProductIds(since: Date) {
  return prisma.orderItem.groupBy({
    by: ["productId"],
    where: { createdAt: { gte: since } },
    _sum: { quantity: true },
    orderBy: { _sum: { quantity: "desc" } },
    take: 5,
  });
}

export function getProductDetailsByIds(ids: number[]) {
  return prisma.product.findMany({
    where: { id: { in: ids } },
    include: {
      categoryProducts: { include: { category: true } },
      reviews: true,
      inventory: true,
    },
  });
}
