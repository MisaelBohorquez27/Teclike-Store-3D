import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export function findReviewsByProduct(productId: number) {
  return prisma.review.findMany({
    where: { productId },
    include: {
      user: { select: { id: true, firstName: true, photoURL: true } },
      product: { select: { id: true, name: true } },
    },
    orderBy: { reviewDate: "desc" },
  });
}

export function findRecentReviews(take: number) {
  return prisma.review.findMany({
    include: {
      user: { select: { id: true, firstName: true, photoURL: true } },
      product: { select: { id: true, name: true } },
    },
    take,
    orderBy: { id: "desc" },
  });
}

export function userPurchasedProduct(userId: number, productId: number) {
  return prisma.orderProducts.findFirst({
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
      ...data,
      comment: data.comment ?? "",
      rating: data.rating ?? 0,
    },
    include: {
      user: { select: { id: true, firstName: true, photoURL: true } },
      product: { select: { id: true, name: true } },
    },
  });
}
