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
  // Ejecutar seeders en orden
  await seedProducts(prisma); // primero haz un seed a productos
  console.log('------------------------------------------');
  await seedCoreData(prisma);
  console.log('------------------------------------------');
  await seedCategories(prisma);
  console.log('------------------------------------------');
  await seedUsers(prisma); // luego haz un seed hasta aqui
  console.log('------------------------------------------');
  await seedOffers(prisma);
  console.log('------------------------------------------');
  await seedCategoryRelations(prisma);
  console.log('------------------------------------------');
  await seedOrders(prisma);
  console.log('------------------------------------------');
  await seedReviews(prisma); 
  console.log('------------------------------------------');
  await seedImageProducts(prisma); // finalmente haz un seed a todos hasta aqui
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
