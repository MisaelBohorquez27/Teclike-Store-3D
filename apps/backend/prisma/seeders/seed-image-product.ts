import { PrismaClient } from "@prisma/client";
import imageProducts from "../data/imageProduct.json";

type ImageEntry = {
  productId?: number;
  productSlug?: string;
  imageUrl: string;
  imageAlt?: string;
};

export async function seedImageProducts(prisma: PrismaClient) {
  console.log("🖼️ Insertando imágenes de productos...");

  for (const image of imageProducts as ImageEntry[]) {
    try {
      let productId = image.productId;

      // Si no viene productId, intentar resolver por slug
      if (!productId && image.productSlug) {
        const product = await prisma.product.findUnique({
          where: { slug: image.productSlug },
          select: { id: true },
        });
        productId = product?.id;
      }

      if (!productId) {
        console.warn(`⚠️ Producto no encontrado para imageUrl=${image.imageUrl}. Omitiendo.`);
        continue;
      }

      // Verificar duplicados (mismo productId + imageUrl)
      const exists = await prisma.productImage.findFirst({
        where: { productId, imageUrl: image.imageUrl },
      });

      if (exists) {
        console.log(`↩️ Imagen ya existe para productId=${productId}, url=${image.imageUrl}`);
        continue;
      }

      await prisma.productImage.create({
        data: {
          productId,
          imageUrl: image.imageUrl,
          imageAlt: image.imageAlt ?? null,
        },
      });

      console.log(`✅ Imagen añadida productId=${productId} url=${image.imageUrl}`);
    } catch (err) {
      console.error("❌ Error insertando imagen:", err);
    }
  }

  console.log(`✅ Seed de imágenes completado`);
}

// Ejecutable directo
if (require.main === module) {
  const prisma = new PrismaClient();
  seedImageProducts(prisma)
    .catch((e) => {
      console.error("❌ Error en seedImageProducts:", e);
      process.exitCode = 1;
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
}
