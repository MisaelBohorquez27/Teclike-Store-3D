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
      // Extraer solo los campos del schema de Prisma
      // Ignorar keywords (se usan solo para matching automático)
      const { slug, name, description } = categoryData;
      
      const result = await prisma.category.upsert({
        where: { slug },
        update: {
          name,
          description,
        },
        create: {
          name,
          slug,
          description,
        }
      });
      
      created++;
      console.log(`✅ Categoría: ${name}`);
    } catch (error) {
      errors++;
      const errorMsg = error instanceof Error ? error.message : String(error);
      console.error(`❌ Error procesando categoría "${categoryData.name}": ${errorMsg}`);
    }
  }

  console.log(`\n📊 Categorías - Creadas/Actualizadas: ${created}, Errores: ${errors}`);
  
  if (errors > 0) {
    throw new Error(`Error creando categorías: ${errors} fallos`);
  }
  
  return categories;
}