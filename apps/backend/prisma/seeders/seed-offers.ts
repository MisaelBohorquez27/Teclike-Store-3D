// seeders/seed-offers.ts
import { PrismaClient, OfferType, OfferRecurrence } from '@prisma/client';
import offers from '../data/offers.json';

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

export async function seedOffers(prismaClient: PrismaClient) {
  console.log('🎯 Insertando ofertas...');

  let createdOffers = 0;
  let updatedOffers = 0;
  let productConnections = 0;
  let skippedProducts = 0;
  let errors = 0;

  for (const offerData of offers as any[]) {
    try {
      const type = parseOfferType(offerData.type);
      const recurrence = parseOfferRecurrence(offerData.recurrence);

      // Validar fechas
      let startDate: Date, endDate: Date;
      try {
        startDate = new Date(offerData.startDate);
        endDate = new Date(offerData.endDate);
        
        if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
          throw new Error('Fechas inválidas');
        }
      } catch {
        console.warn(`⚠️ Fechas inválidas para oferta "${offerData.name}", usando fecha actual`);
        startDate = new Date();
        endDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // +7 días
      }

      const offer = await prismaClient.offer.upsert({
        where: { name: offerData.name },
        update: {
          type,
          value: offerData.value,
          startDate,
          endDate,
          recurrence,
        },
        create: {
          name: offerData.name,
          type,
          value: offerData.value,
          startDate,
          endDate,
          recurrence,
        },
      });

      createdOffers++;

      // Conectar productos relacionados
      for (const productSlug of offerData.products ?? []) {
        try {
          const product = await prismaClient.product.findUnique({
            where: { slug: productSlug },
            select: { id: true },
          });

          if (!product) {
            skippedProducts++;
            console.warn(`⚠️ Producto no encontrado para oferta "${offer.name}": ${productSlug}`);
            continue;
          }

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
        } catch (productError) {
          console.error(`❌ Error conectando producto "${productSlug}" a oferta "${offer.name}":`, productError);
        }
      }

      const symbol = offer.type === OfferType.PERCENTAGE ? '%' : '¢';
      console.log(`✅ Oferta: ${offer.name} (${offer.type} ${offer.value}${symbol})`);
    } catch (error) {
      errors++;
      console.error(`❌ Error procesando oferta "${offerData.name}":`, error);
    }
  }

  console.log(`\n📊 Ofertas - Creadas: ${createdOffers}, Conexiones: ${productConnections}, Productos omitidos: ${skippedProducts}, Errores: ${errors}`);
}
