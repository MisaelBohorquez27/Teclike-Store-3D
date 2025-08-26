// seeders/seed-products.ts
import { PrismaClient } from '@prisma/client';
import products from '../data/products.json';


export async function seedProducts(prisma: PrismaClient) {
  console.log('🛍️ Insertando productos...');

  for (const productData of products) {
    const product = await prisma.product.upsert({
      where: { slug: productData.slug },
      update: {},
      create: {
        brand: productData.brand,
        slug: productData.slug,
        name: productData.name,
        description: productData.description,
        priceCents: productData.priceCents,
        imageUrl: productData.imageUrl
      }
    });

    // Crear inventario
    await prisma.inventory.upsert({
      where: { productId: product.id },
      update: {},
      create: {
        productId: product.id,
        stock: productData.inventory.stock,
        isNew: productData.inventory.isNew
      }
    });
    
    console.log(`✅ Producto: ${product.name}`);
  }
}