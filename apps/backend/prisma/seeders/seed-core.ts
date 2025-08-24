// seeders/seed-core.ts
import { PrismaClient } from '@prisma/client';

export async function seedCoreData(prisma: PrismaClient) {
  console.log('🌱 Insertando datos core...');

  // Roles
  const roles = await Promise.all([
    prisma.role.upsert({
      where: { name: 'Admin' },
      update: {},
      create: { name: 'Admin' }
    }),
    prisma.role.upsert({
      where: { name: 'Customer' },
      update: {},
      create: { name: 'Customer' }
    }),
    prisma.role.upsert({
      where: { name: 'Moderator' },
      update: {},
      create: { name: 'Moderator' }
    })
  ]);

  console.log('✅ Roles insertados');

  // Métodos de Pago
  const paymentMethods = await Promise.all([
    prisma.paymentMethod.upsert({
      where: { method: 'Credit Card' },
      update: {},
      create: { method: 'Credit Card' }
    }),
    prisma.paymentMethod.upsert({
      where: { method: 'PayPal' },
      update: {},
      create: { method: 'PayPal' }
    }),
    prisma.paymentMethod.upsert({
      where: { method: 'Bank Transfer' },
      update: {},
      create: { method: 'Bank Transfer' }
    }),
    prisma.paymentMethod.upsert({
      where: { method: 'Cash on Delivery' },
      update: {},
      create: { method: 'Cash on Delivery' }
    })
  ]);

  console.log('✅ Métodos de pago insertados');

  return { roles, paymentMethods };
}