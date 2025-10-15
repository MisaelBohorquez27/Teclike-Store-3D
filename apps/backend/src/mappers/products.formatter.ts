import { formatCurrency } from "../utils/formatCurrency";

export function formatForCard(p: any) {
  const primaryCategory = p.categoryProducts?.[0]?.category?.name ?? "Uncategorized";
  const isNew = (Date.now() - new Date(p.createdAt).getTime()) / (1000 * 60 * 60 * 24) <= 30;

  return {
    id: p.id,
    name: p.name,
    category: primaryCategory,
    price: formatCurrency(p.priceCents, p.currency),
    currency: p.currency,
    rating: p.rating ?? 0,
    description: p.description,
    imageUrl: p.imageUrl ?? "/placeholder.png",
    isNew,
  };
}

export function formatDetailedProduct(product: any) {
  const formattedReviews = product.reviews.map((review: any) => ({
    id: review.id,
    user: review.user.firstName,
    rating: review.rating,
    comment: review.comment,
    date: review.reviewDate.toISOString().split("T")[0],
  }));

  const isNew = (Date.now() - new Date(product.createdAt).getTime()) / (1000 * 60 * 60 * 24) <= 30;
  const category = product.categoryProducts?.[0]?.category?.name ?? "Uncategorized";
  const rating = product.reviews.length > 0
    ? product.reviews.reduce((sum: number, r: any) => sum + r.rating, 0) / product.reviews.length
    : 5;

  return {
    id: product.id,
    name: product.name,
    brand: product.brand,
    description: product.description,
    price: formatCurrency(product.priceCents, product.currency),
    currency: product.currency,
    image: product.imageUrl ?? "/placeholder.png",
    category,
    isNew,
    rating,
    reviews: formattedReviews,
    specifications: {
      Marca: product.brand,
      Categoría: category,
      Precio: formatCurrency(product.priceCents, product.currency),
      Estado: isNew ? "Nuevo" : "Usado",
    },
    createdAt: product.createdAt,
    updatedAt: product.updatedAt,
  };
}
