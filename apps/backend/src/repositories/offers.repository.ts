import { PrismaClient, Prisma, OfferRecurrence } from "@prisma/client";

const prisma = new PrismaClient();

export interface OfferWithProducts {
  id: number;
  name: string;
  type: string;
  value: number;
  startDate: Date;
  endDate: Date;
  recurrence: string;
  offerProducts: Array<{
    product: {
      id: number;
      name: string;
      brand: string;
      priceCents: number;
      currency: string;
      imageUrl: string | null;
      description: string | null;
      slug: string;
    };
  }>;
}

export async function findActiveOffersWithProducts(recurrence?: OfferRecurrence | null): Promise<OfferWithProducts[]> {
  const now = new Date();
  
  const where: Prisma.OfferWhereInput = {
    AND: [
      { startDate: { lte: now } },
      { endDate: { gte: now } }
    ]
  };

  // Filtrar por recurrencia si se especifica
  if (recurrence) {
    where.recurrence = recurrence;
  }

  return prisma.offer.findMany({
    where,
    include: {
      offerProducts: {
        include: {
          product: {
            select: {
              id: true,
              name: true,
              brand: true,
              priceCents: true,
              currency: true,
              imageUrl: true,
              description: true,
              slug: true,
            }
          }
        }
      }
    },
    orderBy: [
      { recurrence: 'desc' }, // ANNUAL primero
      { value: 'desc' }, // Mayor descuento primero
      { startDate: 'desc' }
    ]
  });
}

export async function findFallbackProducts(limit: number = 20) {
  return prisma.product.findMany({
    take: limit,
    orderBy: { 
      createdAt: "desc" 
    },
    select: {
      id: true,
      name: true,
      brand: true,
      priceCents: true,
      currency: true,
      imageUrl: true,
      description: true,
      slug: true,
    }
  });
}

export async function findDailyOffers(): Promise<OfferWithProducts[]> {
  return findActiveOffersWithProducts('DAILY');
}

export async function findAnnualOffers(): Promise<OfferWithProducts[]> {
  return findActiveOffersWithProducts('ANNUAL');
}

export async function findFeaturedProducts(limit: number = 10) {
  return prisma.product.findMany({
    where: {
      offerProducts: {
        some: {
          offer: {
            startDate: { lte: new Date() },
            endDate: { gte: new Date() }
          }
        }
      }
    },
    take: limit,
    orderBy: {
      offerProducts: {
        _count: 'desc'
      }
    },
    select: {
      id: true,
      name: true,
      brand: true,
      priceCents: true,
      currency: true,
      imageUrl: true,
      description: true,
      slug: true,
    }
  });
}