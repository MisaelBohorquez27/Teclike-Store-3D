import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export function findFilteredProducts(whereClause: any, skip: number, take: number) {
  return Promise.all([
    prisma.product.findMany({
      where: whereClause,
      include: { 
        categoryProducts: { include: { category: true } },
        images: true  // ✅ Agregar imágenes
      },
      skip,
      take,
    }),
    prisma.product.count({ where: whereClause }),
  ]);
}

export function findProductById(id: number) {
  return prisma.product.findUnique({
    where: { id },
    include: {
      categoryProducts: { include: { category: true } },
      images: true,  // ✅ Agregar imágenes
      reviews: { include: { user: { select: { id: true, username: true } } } },
    },
  });
}

export function findProductBySlug(slug: string) {
  return prisma.product.findUnique({
    where: { slug },
    include: {
      categoryProducts: { include: { category: true } },
      images: true,  // ✅ Agregar imágenes
      reviews: { include: { user: { select: { id: true, username: true } } } },
    },
  });
}
