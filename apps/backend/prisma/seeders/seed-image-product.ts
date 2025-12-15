// seeders/seed-image-product.ts
import { PrismaClient } from "@prisma/client";
import imageProducts from "../data/imageProduct.json";

type ImageEntry = {
  productId?: number;
  productSlug?: string;
  imageUrl: string;
  imageAlt?: string;
};

export async function seedImageProducts(prismaClient: PrismaClient) {
  console.log("🖼️ Insertando imágenes de productos...");

  let created = 0;
  let skipped = 0;
  let errors = 0;

  for (const image of imageProducts as ImageEntry[]) {
    try {
      let productId = image.productId;

      // Si no viene productId, intentar resolver por slug
      if (!productId && image.productSlug) {
        const product = await prismaClient.product.findUnique({
          where: { slug: image.productSlug },
          select: { id: true },
        });
        productId = product?.id;
      }

      if (!productId) {
        skipped++;
        console.warn(`⚠️ Producto no encontrado para imagen: ${image.imageUrl}`);
        continue;
      }

      // Verificar duplicados (mismo productId + imageUrl)
      const exists = await prismaClient.productImage.findFirst({
        where: { productId, imageUrl: image.imageUrl },
      });

      if (exists) {
        skipped++;
        console.log(`↩️ Imagen ya existe para productId=${productId}`);
        continue;
      }

      await prismaClient.productImage.create({
        data: {
          productId,
          imageUrl: image.imageUrl,
          imageAlt: image.imageAlt ?? null,
        },
      });

      created++;
      console.log(`✅ Imagen añadida: ProductID=${productId}`);
    } catch (err) {
      errors++;
      console.error(`❌ Error insertando imagen:`, err);
    }
  }

  console.log(`\n📊 Imágenes - Creadas: ${created}, Saltadas: ${skipped}, Errores: ${errors}`);
}
