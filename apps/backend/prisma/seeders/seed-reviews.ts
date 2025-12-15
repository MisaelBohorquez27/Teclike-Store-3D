// seeders/seed-reviews.ts
import { PrismaClient } from "@prisma/client";
import reviews from "../data/reviews.json";

export async function seedReviews(prisma: PrismaClient) {
  console.log("⭐ Insertando reseñas...");

  let created = 0;
  let skipped = 0;
  let errors = 0;

  for (const review of reviews) {
    try {
      // Validar que usuario y producto existen
      const [userExists, productExists] = await Promise.all([
        prisma.user.findUnique({
          where: { id: review.userId },
          select: { id: true },
        }),
        prisma.product.findUnique({
          where: { id: review.productId },
          select: { id: true },
        }),
      ]);

      if (!userExists) {
        skipped++;
        console.warn(`⚠️ Usuario no encontrado: ID ${review.userId}`);
        continue;
      }

      if (!productExists) {
        skipped++;
        console.warn(`⚠️ Producto no encontrado: ID ${review.productId}`);
        continue;
      }

      await prisma.review.create({
        data: {
          userId: review.userId,
          productId: review.productId,
          comment: review.comment,
          rating: review.rating,
        },
      });

      created++;
      console.log(`✅ Reseña creada: Usuario ${review.userId} → Producto ${review.productId} (${review.rating}⭐)`);
    } catch (error) {
      errors++;
      console.error(`❌ Error creando reseña para usuario ${review.userId}:`, error);
    }
  }

  console.log(`\n📊 Reseñas - Creadas: ${created}, Saltadas: ${skipped}, Errores: ${errors}`);
}
