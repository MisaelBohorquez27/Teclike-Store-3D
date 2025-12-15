// seeders/seed-products.ts
import { PrismaClient } from "@prisma/client";
import products from "../data/products.json";

export async function seedProducts(prisma: PrismaClient) {
  console.log("🛍️ Insertando productos...");

  let created = 0;
  let updated = 0;
  let errors = 0;

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

      console.log(`✅ Producto: ${product.name}`);
      created++;
    } catch (error) {
      errors++;
      console.error(`❌ Error procesando producto "${productData.name}":`, error);
    }
  }

  console.log(`\n📊 Productos - Creados: ${created}, Saltados: ${updated}, Errores: ${errors}`);
}
