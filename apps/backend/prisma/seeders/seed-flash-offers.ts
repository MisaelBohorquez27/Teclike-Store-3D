// seeders/seed-flash-offers.ts
import { PrismaClient } from '@prisma/client';
import flashOffers from '../data/offers.json';

export async function seedFlashOffers(prisma: PrismaClient) {
  console.log('⚡ Insertando ofertas flash...');

  // Ofertas flash (24 horas)
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  for (const offerData of flashOffers) {
    const offer = await prisma.offer.upsert({
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

    // Conectar productos
    for (const productSlug of offerData.products) {
      const product = await prisma.product.findUnique({
        where: { slug: productSlug }
      });

      if (product) {
        await prisma.offerProduct.upsert({
          where: {
            offerId_productId: {
              offerId: offer.id,
              productId: product.id
            }
          },
          update: {},
          create: {
            offerId: offer.id,
            productId: product.id
          }
        });
      }
    }

    console.log(`✅ Oferta flash: ${offer.name} (Expira: ${offer.endDate.toLocaleDateString()})`);
  }
}