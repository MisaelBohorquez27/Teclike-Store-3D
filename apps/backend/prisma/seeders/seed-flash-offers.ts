// seeders/seed-flash-offers.ts
import { PrismaClient } from '@prisma/client';

export async function seedFlashOffers(prisma: PrismaClient) {
  console.log('⚡ Insertando ofertas flash...');

  // Ofertas flash (24 horas)
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  const flashOffers = [
    {
      name: 'Flash Sale - Headsets',
      type: 'percentage',
      value: 40,
      startDate: new Date(),
      endDate: tomorrow,
      products: ['razer-kraken-v3', 'steelseries-arctis-pro', 'hyperx-cloud-alpha']
    },
    {
      name: '24 Hour Monitor Deal',
      type: 'fixed',
      value: 10000,
      startDate: new Date(),
      endDate: tomorrow,
      products: ['samsung-odyssey-g7', 'lg-ultragear-48']
    }
  ];

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