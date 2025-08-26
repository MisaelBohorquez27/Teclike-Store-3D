// seeders/seed-categories.ts
import { PrismaClient } from '@prisma/client';
import categories from '../data/categories.json';

export async function seedCategories(prisma: PrismaClient) {
  console.log('📁 Insertando categorías...');

  for (const categoryData of categories) {
    await prisma.category.upsert({
      where: { slug: categoryData.slug },
      update: {},
      create: categoryData
    });
    console.log(`✅ Categoría: ${categoryData.name}`);
  }

  return categories;
}