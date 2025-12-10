import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export function findReviewsByProduct(productId: number) {
  return prisma.review.findMany({
    where: { productId },
    include: {
      user: { select: { id: true, username: true, photoURL: true } },
      product: { select: { id: true, name: true } },
    },
    orderBy: { reviewDate: "desc" },
  });
}

export function findRecentReviews(take: number) {
  return prisma.review.findMany({
    include: {
      user: { select: { id: true, username: true, photoURL: true } },
      product: { select: { id: true, name: true } },
    },
    take,
    orderBy: { reviewDate: "desc" }, // Cambio: usar reviewDate en lugar de id
  });
}

export function userPurchasedProduct(userId: number, productId: number) {
  return prisma.orderItem.findFirst({
    where: {
      productId,
      order: { userId },
    },
  });
}

export function hasUserReviewed(userId: number, productId: number) {
  return prisma.review.findFirst({
    where: { userId, productId },
  });
}

export function createReview(data: {
  userId: number;
  productId: number;
  comment?: string;
  rating: number;
}) {
  return prisma.review.create({
    data: {
      userId: data.userId,
      productId: data.productId,
      comment: data.comment || "", // Cambio: usar || en lugar de ??
      rating: data.rating,
    },
    include: {
      user: { select: { id: true, username: true, photoURL: true } }, // Cambio: username en lugar de us
      product: { select: { id: true, name: true } },
    },
  });
}
