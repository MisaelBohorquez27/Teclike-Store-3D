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

console.log('🔧 Inicializando PrismaClient...');
console.log('DATABASE_URL:', process.env.SUPABASE_DATABASE_URL ? '✅ Configurado' : '❌ No configurado');
console.log('DIRECT_URL:', process.env.SUPABASE_DIRECT_URL ? '✅ Configurado' : '❌ No configurado');

const prisma = new PrismaClient({
  log: ['error', 'warn'],
});

console.log('✅ PrismaClient instanciado');

async function main() {
  console.log('🌱 Iniciando seeder de Teclike Store...');
  console.log('==========================================');
  
  try {
    // Orden crítico: respetar las dependencias entre tablas
    
    console.log('1️⃣  Core Data');
    console.log('   Iniciando seedCoreData...');
    await seedCoreData(prisma);
    console.log('   ✅ seedCoreData completado');
    console.log('------------------------------------------');
    
    console.log('2️⃣  Categorías');
    console.log('   Iniciando seedCategories...');
    await seedCategories(prisma);
    console.log('   ✅ seedCategories completado');
    console.log('------------------------------------------');
    
    console.log('3️⃣  Productos');
    console.log('   Iniciando seedProducts...');
    await seedProducts(prisma);
    console.log('   ✅ seedProducts completado');
    console.log('------------------------------------------');
    
    console.log('4️⃣  Usuarios');
    console.log('   Iniciando seedUsers...');
    await seedUsers(prisma);
    console.log('   ✅ seedUsers completado');
    console.log('------------------------------------------');
    
    console.log('5️⃣  Ofertas');
    console.log('   Iniciando seedOffers...');
    await seedOffers(prisma);
    console.log('   ✅ seedOffers completado');
    console.log('------------------------------------------');
    
    console.log('6️⃣  Relaciones Categoría-Producto');
    console.log('   Iniciando seedCategoryRelations...');
    await seedCategoryRelations(prisma);
    console.log('   ✅ seedCategoryRelations completado');
    console.log('------------------------------------------');
    
    console.log('7️⃣  Órdenes');
    console.log('   Iniciando seedOrders...');
    await seedOrders(prisma);
    console.log('   ✅ seedOrders completado');
    console.log('------------------------------------------');
    
    console.log('8️⃣  Reseñas');
    console.log('   Iniciando seedReviews...');
    await seedReviews(prisma);
    console.log('   ✅ seedReviews completado');
    console.log('------------------------------------------');
    
    console.log('9️⃣  Imágenes de Productos');
    console.log('   Iniciando seedImageProducts...');
    await seedImageProducts(prisma);
    console.log('   ✅ seedImageProducts completado');
    console.log('------------------------------------------');
    
    console.log('==========================================');
    console.log('✅ Base de datos poblada exitosamente!');
    console.log('🎯 Ofertas configuradas para diferentes temporadas');
    console.log('📊 Visita: http://localhost:5555 para ver los datos en Prisma Studio');
  } catch (error) {
    console.error('❌ Error durante el seeding:', error);
    throw error;
  }
}

main()
  .catch((e) => {
    console.error('❌ Error en el seeder:', e);
    process.exit(1);
  })
  .finally(async () => {
    console.log('Desconectando Prisma...');
    try {
      await prisma.$disconnect();
      console.log('✅ Conexión cerrada');
    } catch (e) {
      console.error('Error al desconectar:', e);
    }
    process.exit(0);
  });

// Timeout de 120 segundos como respaldo
setTimeout(() => {
  console.error('❌ TIMEOUT: El seed tardó más de 120 segundos. Forzando salida...');
  process.exit(1);
}, 120000);
