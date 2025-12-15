// seeders/seed-core.ts
import { PrismaClient } from '@prisma/client';

export async function seedCoreData(prisma: PrismaClient) {
  console.log('🌱 Insertando datos core...');

  let created = 0;
  let updated = 0;
  let errors = 0;

  try {
    // Métodos de Pago
    const paymentMethodsList = [
      'Credit Card',
      'PayPal',
      'Bank Transfer',
      'Cash on Delivery'
    ];

    console.log('\n💳 Insertando métodos de pago...');
    
    for (const methodName of paymentMethodsList) {
      try {
        const existingMethod = await prisma.paymentMethod.findUnique({
          where: { method: methodName },
        });

        if (existingMethod) {
          updated++;
          console.log(`↩️ Método de pago ya existe: ${methodName}`);
          continue;
        }

        await prisma.paymentMethod.create({
          data: { method: methodName }
        });

        created++;
        console.log(`✅ Método de pago: ${methodName}`);
      } catch (error) {
        errors++;
        console.error(`❌ Error creando método de pago "${methodName}":`, error);
      }
    }

    console.log(`\n📊 Core Data - Métodos de pago creados: ${created}, Existentes: ${updated}, Errores: ${errors}`);
  } catch (error) {
    console.error('❌ Error en seedCoreData:', error);
    throw error;
  }
}