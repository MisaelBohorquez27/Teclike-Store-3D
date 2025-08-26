// seed.ts
import { Prisma, PrismaClient } from '@prisma/client';
import { seedCoreData } from './seeders/seed-core';
import { seedCategories } from './seeders/seed-categories';
import { seedProducts } from './seeders/seed-products';
import { seedUsers } from './seeders/seed-users';
import { seedOffers } from './seeders/seed-offers';
import { seedSpecialOffers } from './seeders/seed-special-offers';
import { seedFlashOffers } from './seeders/seed-flash-offers';
import { DefaultArgs } from '@prisma/client/runtime/library';
import { seedCategoryRelations } from './seeders/seed-category-Products';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando seeder de Teclike Store...');
  console.log('==========================================');

  // Ejecutar seeders en orden
  await seedCoreData(prisma);
  console.log('------------------------------------------');
  await seedCategories(prisma);
  console.log('------------------------------------------');
  await seedProducts(prisma);
  console.log('------------------------------------------');
  await seedUsers(prisma);
  console.log('------------------------------------------');
  await seedOffers(prisma);
  console.log('------------------------------------------');
  await seedSpecialOffers(prisma);
  console.log('------------------------------------------');
  await seedFlashOffers(prisma);
  console.log('------------------------------------------');
  await seedCategoryRelations();

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

function seedCategoryProductRelations(prisma: PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>) {
  throw new Error('Function not implemented.');
}
