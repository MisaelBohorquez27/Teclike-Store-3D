import { PrismaClient } from '@prisma/client';
import  categories  from '../data/categories.json';
import products from '../data/products.json';


const prisma = new PrismaClient();

async function seedCategoryProductRelations() {
  // Primero, aseguramos que las categorías existan en la DB
  for (const category of categories) {
    await prisma.category.upsert({
      where: { slug: category.slug },
      update: {},
      create: {
        name: category.name,
        slug: category.slug,
        description: category.description,
      },
    });
  }

  // Luego, recorremos los productos
  for (const product of products) {
    const dbProduct = await prisma.product.findUnique({
      where: { slug: product.slug },
    });

    if (!dbProduct) {
      console.warn(`⚠️ Producto no encontrado: ${product.slug}`);
      continue;
    }

    for (const categoryName of product.categories) {
      const dbCategory = await prisma.category.findUnique({
        where: { slug: categoryName.toLowerCase() },
      });

      if (!dbCategory) {
        console.warn(`⚠️ Categoría no encontrada: ${categoryName}`);
        continue;
      }

      await prisma.categoryProduct.upsert({
        where: {
          categoryId_productId: {
            categoryId: dbCategory.id,
            productId: dbProduct.id,
          },
        },
        update: {},
        create: {
          categoryId: dbCategory.id,
          productId: dbProduct.id,
          description: `El producto "${product.name}" pertenece a la categoría "${dbCategory.name}"`,
        },
      });
    }
  }

  console.log('✅ Relaciones producto-categoría creadas exitosamente');
}

seedCategoryProductRelations()
  .catch((e) => {
    console.error('❌ Error en seeder:', e);
  })
  .finally(() => {
    prisma.$disconnect();
  });
