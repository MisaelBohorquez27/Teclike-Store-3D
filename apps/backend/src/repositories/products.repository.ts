import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export function findFilteredProducts(whereClause: any, skip: number, take: number) {
  return Promise.all([
    prisma.product.findMany({
      where: whereClause,
      include: { categoryProducts: { include: { category: true } } },
      skip,
      take,
      orderBy: { createdAt: "desc" },
    }),
    prisma.product.count({ where: whereClause }),
  ]);
}

export function findProductById(id: number) {
  return prisma.product.findUnique({
    where: { id },
    include: {
      categoryProducts: { include: { category: true } },
      reviews: { include: { user: { select: { id: true, firstName: true } } } },
    },
  });
}

export function findProductBySlug(slug: string) {
  return prisma.product.findUnique({
    where: { slug },
    include: {
      categoryProducts: { include: { category: true } },
      reviews: { include: { user: { select: { id: true, firstName: true } } } },
    },
  });
}
