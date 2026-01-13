// seed.ts
import { Prisma, PrismaClient } from '@prisma/client';
import { seedCoreData } from './seeders/seed-core';
import { seedCategories } from './seeders/seed-categories';
import { seedProducts } from './seeders/seed-products';
import { seedUsers } from './seeders/seed-users';
import { seedOffers } from './seeders/seed-offers';
import { seedCategoryRelations } from './seeders/seed-category-Products';
import { seedOrders } from './seeders/seed-orders';
import { seedReviews } from './seeders/seed-reviews';
import { seedImageProducts } from './seeders/seed-image-product';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando seeder de Teclike Store...');
  console.log('==========================================');


  await seedOrders(prisma);
  console.log('------------------------------------------');
  await seedReviews(prisma); // finalmente haz un seed a todos hasta reviews
  console.log('------------------------------------------');
  await seedImageProducts(prisma);
  console.log('==========================================');
  console.log('✅ Base de datos poblada exitosamente!');
  console.log('🎯 Ofertas configuradas para diferentes temporadas');
  console.log('📊 Visita: http://localhost:5555 para ver los datos en Prisma Studio');
}

main()
  .catch((e) => {
    console.error('❌ Error en el seeder:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
