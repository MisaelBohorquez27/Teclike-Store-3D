// seeders/seed-categories.ts
import { PrismaClient } from '@prisma/client';
import categories from '../data/categories.json';

export async function seedCategories(prisma: PrismaClient) {
  console.log('📁 Insertando categorías...');
  
  let created = 0;
  let updated = 0;
  let errors = 0;

  for (const categoryData of categories) {
    try {
      const result = await prisma.category.upsert({
        where: { slug: categoryData.slug },
        update: {},
        create: categoryData
      });
      
      if (result) {
        created++;
        console.log(`✅ Categoría: ${categoryData.name}`);
      }
    } catch (error) {
      errors++;
      console.error(`❌ Error procesando categoría "${categoryData.name}":`, error);
    }
  }

  console.log(`\n📊 Categorías - Creadas: ${created}, Errores: ${errors}`);
  return categories;
}