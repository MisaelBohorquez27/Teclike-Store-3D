// prisma/seed.ts
import { PrismaClient } from "@prisma/client";
import { seedProducts } from "./seeders/seed-products";


const prisma = new PrismaClient();

async function main() {
  console.log('🚀 Iniciando seeder de la base de datos...');
  console.log('==========================================');

  // Ejecutar todos los seeders
  await seedProducts(prisma);

  console.log('==========================================');
  console.log('✅ Todos los seeders completados exitosamente');
  console.log(`📊 Visita: http://localhost:5555 para ver los datos en Prisma Studio`);
}

main()
  .catch((e) => {
    console.error("❌ Error en el seeder:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
