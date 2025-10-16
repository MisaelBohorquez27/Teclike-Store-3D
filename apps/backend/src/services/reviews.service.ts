import * as reviewRepo from "../repositories/reviews.repository";
import { formatReview, formatReviewList } from "../mappers/reviews.formatter";

export async function getProductReviewsService(productId: number) {
  if (isNaN(productId)) throw new Error("El ID de producto no es válido");

  const reviews = await reviewRepo.findReviewsByProduct(productId);
  const formatted = formatReviewList(reviews);

  const avgRating =
    reviews.length > 0
      ? reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length
      : 0;

  return { reviews: formatted, avgRating };
}

export async function getRandomReviewsService() {
  const reviews = await reviewRepo.findRecentReviews(5);
  const shuffled = reviews.sort(() => 0.5 - Math.random()).slice(0, 10);
  return shuffled.map(formatReview);
}

export async function createReviewService(data: {
  userId: number;
  productId: number;
  comment?: string;
  rating: number;
}) {
  const { userId, productId, comment, rating } = data;

  if (!userId || !productId || !rating) {
    throw new Error("Faltan campos obligatorios");
  }

  const hasPurchased = await reviewRepo.userPurchasedProduct(userId, productId);
  if (!hasPurchased) throw new Error("El usuario no compró este producto");

  const alreadyReviewed = await reviewRepo.hasUserReviewed(userId, productId);
  if (alreadyReviewed) throw new Error("Ya existe una reseña para este producto");

  const review = await reviewRepo.createReview({ userId, productId, comment, rating });
  return formatReview(review);
}
