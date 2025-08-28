// seeders/seed-offers.ts
import { PrismaClient } from '@prisma/client';
import offers from '../data/offers.json';

const prisma = new PrismaClient();

export async function seedOffers(prisma: PrismaClient) {
  console.log('🎯 Insertando ofertas...');

  let createdOffers = 0;
  let productConnections = 0;

  for (const offerData of offers) {
    try {
      // Crear o actualizar oferta (incluyendo recurrence)
      const offer = await prisma.offer.upsert({
        where: { name: offerData.name },
        update: {
          type: offerData.type,
          value: offerData.value,
          startDate: new Date(offerData.startDate),
          endDate: new Date(offerData.endDate),
          recurrence: offerData.recurrence ?? null,
        },
        create: {
          name: offerData.name,
          type: offerData.type,
          value: offerData.value,
          startDate: new Date(offerData.startDate),
          endDate: new Date(offerData.endDate),
          recurrence: offerData.recurrence ?? null,
        },
      });

      createdOffers++;

      // Conectar productos relacionados
      for (const productSlug of offerData.products ?? []) {
        const product = await prisma.product.findUnique({
          where: { slug: productSlug },
        });

        if (product) {
          await prisma.offerProduct.upsert({
            where: {
              offerId_productId: {
                offerId: offer.id,
                productId: product.id,
              },
            },
            update: {},
            create: {
              offerId: offer.id,
              productId: product.id,
            },
          });
          productConnections++;
        }
      }

      console.log(`✅ Oferta: ${offer.name} (${offer.type} ${offer.value}${offer.type === 'percentage' ? '%' : '¢'})`);
    } catch (error) {
      console.error(`❌ Error con oferta ${offerData.name}:`, error);
    }
  }

  console.log(`📊 Ofertas creadas/actualizadas: ${createdOffers}`);
  console.log(`📊 Conexiones producto-oferta: ${productConnections}`);
}

// Ejecutar si se llama directamente
if (require.main === module) {
  seedOffers(prisma)
    .catch((e) => console.error(e))
    .finally(() => prisma.$disconnect());
}
