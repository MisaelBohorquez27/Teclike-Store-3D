// seeders/seed-core.ts
import { PrismaClient } from '@prisma/client';
import paymentMethods from '../data/payment-methods.json';

export async function seedCoreData(prisma: PrismaClient) {
  console.log('🌱 Insertando datos core...');

  let created = 0;
  let updated = 0;
  let errors = 0;

  try {
    console.log('\n💳 Insertando métodos de pago...');
    
    for (const methodData of paymentMethods) {
      try {
        const existingMethod = await prisma.paymentMethod.findUnique({
          where: { method: methodData.method },
        });

        if (existingMethod) {
          updated++;
          console.log(`↩️ Método de pago ya existe: ${methodData.method}`);
          continue;
        }

        await prisma.paymentMethod.create({
          data: { method: methodData.method }
        });

        created++;
        console.log(`✅ Método de pago: ${methodData.method}`);
      } catch (error) {
        errors++;
        console.error(`❌ Error creando método de pago "${methodData.method}":`, error);
      }
    }

    console.log(`\n📊 Core Data - Métodos de pago creados: ${created}, Existentes: ${updated}, Errores: ${errors}`);
  } catch (error) {
    console.error('❌ Error en seedCoreData:', error);
    throw error;
  }
}