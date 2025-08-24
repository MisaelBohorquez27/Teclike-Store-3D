// seeders/seed-special-offers.ts
import { PrismaClient } from '@prisma/client';

export async function seedSpecialOffers(prisma: PrismaClient) {
  console.log('🎄 Insertando ofertas especiales estacionales...');

  const currentYear = new Date().getFullYear();
  
  const seasonalOffers = [
    // Ofertas de Navidad
    {
      name: 'Christmas Special',
      type: 'percentage',
      value: 30,
      startDate: new Date(`${currentYear}-12-15T00:00:00Z`),
      endDate: new Date(`${currentYear}-12-25T23:59:59Z`),
      products: ['razer-kraken-v3', 'logitech-g502-x', 'corsair-k95-rgb']
    },
    // Ofertas de Año Nuevo
    {
      name: 'New Year Clearance',
      type: 'fixed',
      value: 7500,
      startDate: new Date(`${currentYear}-12-26T00:00:00Z`),
      endDate: new Date(`${currentYear + 1}-01-15T23:59:59Z`),
      products: ['samsung-odyssey-g7', 'lg-ultragear-48']
    },
    // Ofertas de Back to School
    {
      name: 'Back to School Sale',
      type: 'percentage',
      value: 18,
      startDate: new Date(`${currentYear}-08-01T00:00:00Z`),
      endDate: new Date(`${currentYear}-08-31T23:59:59Z`),
      products: ['hyperx-cloud-alpha', 'asus-rog-azoth', 'steelseries-arctis-pro']
    },
    // Ofertas de Cyber Monday
    {
      name: 'Cyber Monday Deals',
      type: 'percentage',
      value: 35,
      startDate: new Date(`${currentYear}-11-27T00:00:00Z`),
      endDate: new Date(`${currentYear}-11-27T23:59:59Z`),
      products: ['razer-kraken-v3', 'logitech-g502-x', 'corsair-k95-rgb', 'samsung-odyssey-g7']
    }
  ];

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