// seeders/seed-special-offers.ts
import { PrismaClient } from '@prisma/client';
import seasonalOffers from '../data/offers.json';

export async function seedSpecialOffers(prisma: PrismaClient) {
  console.log('🎄 Insertando ofertas especiales estacionales...');

  const currentYear = new Date().getFullYear();

  for (const offerData of seasonalOffers) {
    await prisma.offer.upsert({
      where: { name: offerData.name },
      update: {
        type: offerData.type,
        value: offerData.value,
        startDate: offerData.startDate,
        endDate: offerData.endDate
      },
      create: {
        name: offerData.name,
        type: offerData.type,
        value: offerData.value,
        startDate: offerData.startDate,
        endDate: offerData.endDate
      }
    });

    console.log(`✅ Oferta estacional: ${offerData.name}`);
  }
}