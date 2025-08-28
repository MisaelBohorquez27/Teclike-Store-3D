import { PrismaClient } from "@prisma/client";
import reviews from "../data/reviews.json";

const prisma = new PrismaClient();

export async function seedReviews(prisma: PrismaClient) {
  console.log("🌱 Start seeding reviews...");

  for (const review of reviews) {
    await prisma.review.create({
      data: {
        userId: review.userId,
        productId: review.productId,
        comment: review.comment,
        rating: review.rating,
        reviewDate: new Date()
      }
    });
  }

  console.log("✅ Reviews seeded successfully");
}

seedReviews(prisma)
  .catch((e) => {
    console.error("❌ Error seeding reviews", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
