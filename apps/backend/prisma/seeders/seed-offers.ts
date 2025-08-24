// seeders/seed-offers.ts
import { PrismaClient } from '@prisma/client';

export async function seedOffers(prisma: PrismaClient) {
  console.log('🎯 Insertando ofertas...');

  const offers = [
    {
      name: 'Black Friday Sale',
      type: 'percentage',
      value: 20, // 20% de descuento
      startDate: new Date('2024-11-25T00:00:00Z'),
      endDate: new Date('2024-11-30T23:59:59Z'),
      products: ['razer-kraken-v3', 'logitech-g502-x', 'hyperx-cloud-alpha']
    },
    {
      name: 'Summer Gaming Special',
      type: 'percentage',
      value: 15, // 15% de descuento
      startDate: new Date('2024-06-01T00:00:00Z'),
      endDate: new Date('2024-08-31T23:59:59Z'),
      products: ['corsair-k95-rgb', 'steelseries-arctis-pro', 'asus-rog-azoth']
    },
    {
      name: 'Monitor Madness',
      type: 'fixed',
      value: 5000, // $50 de descuento fijo
      startDate: new Date('2024-01-15T00:00:00Z'),
      endDate: new Date('2024-12-31T23:59:59Z'),
      products: ['samsung-odyssey-g7', 'lg-ultragear-48']
    },
    {
      name: 'New Arrivals Discount',
      type: 'percentage',
      value: 10, // 10% de descuento
      startDate: new Date('2024-01-01T00:00:00Z'),
      endDate: new Date('2024-03-31T23:59:59Z'),
      products: ['razer-kraken-v3', 'samsung-odyssey-g7', 'asus-rog-azoth', 'lg-ultragear-48']
    },
    {
      name: 'Headset Bundle',
      type: 'percentage',
      value: 25, // 25% de descuento
      startDate: new Date('2024-02-01T00:00:00Z'),
      endDate: new Date('2024-02-29T23:59:59Z'),
      products: ['razer-kraken-v3', 'steelseries-arctis-pro', 'hyperx-cloud-alpha']
    },
    {
      name: 'Clearance Sale',
      type: 'fixed',
      value: 3000, // $30 de descuento fijo
      startDate: new Date('2024-12-26T00:00:00Z'),
      endDate: new Date('2024-12-31T23:59:59Z'),
      products: ['corsair-k95-rgb', 'steelseries-arctis-pro']
    }
  ];

  let createdOffers = 0;
  let productConnections = 0;

  for (const offerData of offers) {
    try {
      // Crear o actualizar oferta
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

      createdOffers++;

      // Conectar productos con la oferta
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
          productConnections++;
        }
      }

      console.log(`✅ Oferta: ${offer.name} (${offer.type} ${offer.value}${offer.type === 'percentage' ? '%' : ' centavos'})`);

    } catch (error) {
      console.error(`❌ Error con oferta ${offerData.name}:`, error);
    }
  }

  console.log(`📊 Ofertas creadas: ${createdOffers}`);
  console.log(`📊 Conexiones producto-oferta: ${productConnections}`);
}

// Función auxiliar para aplicar descuentos
export function calculateDiscount(originalPrice: number, offer: any): number {
  if (offer.type === 'percentage') {
    return Math.round(originalPrice * (1 - offer.value / 100));
  } else if (offer.type === 'fixed') {
    return Math.max(0, originalPrice - offer.value);
  }
  return originalPrice;
}

// Función para verificar si una oferta está activa
export function isOfferActive(offer: any): boolean {
  const now = new Date();
  return now >= offer.startDate && now <= offer.endDate;
}

// Función para obtener ofertas activas de un producto
export async function getProductActiveOffers(prisma: PrismaClient, productId: number) {
  const now = new Date();
  
  return await prisma.offer.findMany({
    where: {
      offerProducts: {
        some: {
          productId: productId
        }
      },
      startDate: {
        lte: now
      },
      endDate: {
        gte: now
      }
    },
    include: {
      offerProducts: {
        where: {
          productId: productId
        }
      }
    }
  });
}