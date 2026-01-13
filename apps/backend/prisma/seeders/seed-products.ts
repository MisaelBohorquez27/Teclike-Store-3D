// seeders/seed-products.ts
import { PrismaClient } from "@prisma/client";
import products from "../data/products.json";

export async function seedProducts(prisma: PrismaClient) {
  console.log("🛍️ Insertando productos...");

  let created = 0;
  let updated = 0;
  let errors = 0;

  // Obtener todas las categorías al inicio
  const categories = await prisma.category.findMany();
  const categoryMap = new Map(categories.map((cat) => [cat.slug, cat]));

  for (const productData of products) {
    try {
      const product = await prisma.product.upsert({
        where: { slug: productData.slug },
        update: {
          brand: productData.brand,
          name: productData.name,
          description: productData.description,
          priceCents: productData.priceCents,
          imageUrl: productData.imageUrl,
        },
        create: {
          brand: productData.brand,
          slug: productData.slug,
          name: productData.name,
          description: productData.description,
          priceCents: productData.priceCents,
          imageUrl: productData.imageUrl,
        },
      });

      // Crear o actualizar inventario
      try {
        await prisma.inventory.upsert({
          where: { productId: product.id },
          update: {
            stock: productData.inventory?.stock || 0,
            isNew: productData.inventory?.isNew || false,
          },
          create: {
            productId: product.id,
            stock: productData.inventory?.stock || 0,
            isNew: productData.inventory?.isNew || false,
          },
        });
      } catch (inventoryError) {
        console.warn(`⚠️ Error al crear inventario para ${product.name}:`, inventoryError);
      }

      // Vincular categorías si están definidas en el JSON
      if (productData.categories && Array.isArray(productData.categories) && productData.categories.length > 0) {
        try {
          // Obtener categorías existentes del producto
          const existingCategoryProducts = await prisma.categoryProduct.findMany({
            where: { productId: product.id },
            include: { category: true },
          });
          const existingCategorySlugs = existingCategoryProducts.map((cp) => cp.category.slug);

          // Vincular nuevas categorías
          for (const categorySlugs of productData.categories) {
            // Si no existe la relación, crearla
            if (!existingCategorySlugs.includes(categorySlugs)) {
              const category = categoryMap.get(categorySlugs);
              if (category) {
                await prisma.categoryProduct.create({
                  data: {
                    categoryId: category.id,
                    productId: product.id,
                  },
                });
              }
            }
          }
        } catch (categoryError) {
          console.warn(`⚠️ Error al vincular categorías para ${product.name}:`, categoryError);
        }
      }

      console.log(`✅ Producto: ${product.name}`);
      created++;
    } catch (error) {
      errors++;
      console.error(`❌ Error procesando producto "${productData.name}":`, error);
    }
  }

  console.log(`\n📊 Productos - Creados: ${created}, Saltados: ${updated}, Errores: ${errors}`);
}
