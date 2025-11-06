// seeders/seed-offers.ts
import { PrismaClient, OfferType, OfferRecurrence } from '@prisma/client';
import offers from '../data/offers.json';

const prisma = new PrismaClient();

function parseOfferType(value?: string): OfferType {
  if (!value) return OfferType.PERCENTAGE;
  const v = String(value).trim().toUpperCase();
  return (Object.values(OfferType).includes(v as OfferType) ? (v as OfferType) : OfferType.PERCENTAGE);
}

function parseOfferRecurrence(value?: string): OfferRecurrence {
  if (!value) return OfferRecurrence.NONE;
  const v = String(value).trim().toUpperCase();
  // accept YEARLY => ANNUAL as compatibility
  if (v === 'YEARLY') return OfferRecurrence.ANNUAL;
  return (Object.values(OfferRecurrence).includes(v as OfferRecurrence) ? (v as OfferRecurrence) : OfferRecurrence.NONE);
}

export async function seedOffers(prismaClient: PrismaClient = prisma) {
  console.log('🎯 Insertando ofertas...');

  let createdOffers = 0;
  let productConnections = 0;

  for (const offerData of offers as any[]) {
    try {
      const type = parseOfferType(offerData.type);
      const recurrence = parseOfferRecurrence(offerData.recurrence);

      const offer = await prismaClient.offer.upsert({
        where: { name: offerData.name },
        update: {
          type,
          value: offerData.value,
          startDate: new Date(offerData.startDate),
          endDate: new Date(offerData.endDate),
          recurrence,
        },
        create: {
          name: offerData.name,
          type,
          value: offerData.value,
          startDate: new Date(offerData.startDate),
          endDate: new Date(offerData.endDate),
          recurrence,
        },
      });

      createdOffers++;

      // Conectar productos relacionados (upsert relación compuesta)
      for (const productSlug of offerData.products ?? []) {
        const product = await prismaClient.product.findUnique({
          where: { slug: productSlug },
        });

        if (!product) {
          console.warn(`⚠️ Producto no encontrado para oferta "${offer.name}": ${productSlug}`);
          continue;
        }

        try {
          await prismaClient.offerProduct.upsert({
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
        } catch (err) {
          // Fallback if unique index name differs: create if not exists
          const exists = await prismaClient.offerProduct.findFirst({
            where: { offerId: offer.id, productId: product.id },
          });
          if (!exists) {
            await prismaClient.offerProduct.create({
              data: { offerId: offer.id, productId: product.id },
            });
            productConnections++;
          }
        }
      }

      console.log(`✅ Oferta: ${offer.name} (${offer.type} ${offer.value}${offer.type === OfferType.PERCENTAGE ? '%' : '¢'})`);
    } catch (error) {
      console.error(`❌ Error procesando oferta ${offerData.name}:`, error);
    }
  }

  console.log(`📊 Ofertas creadas/actualizadas: ${createdOffers}`);
  console.log(`📊 Conexiones producto-oferta: ${productConnections}`);
}

// Ejecutar si se llama directamente
if (require.main === module) {
  seedOffers(prisma)
    .catch((e) => {
      console.error('❌ Error en seedOffers:', e);
      process.exitCode = 1;
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
}
