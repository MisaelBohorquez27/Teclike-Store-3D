export function formatReview(r: any) {
  return {
    id: r.id,
    name: r.user?.username || "Cliente",
    avatar: r.user?.photoURL || "/default-avatar.png",
    product: r.product?.name || "Producto",
    comment: r.comment,
    rating: r.rating,
  };
}

export function formatReviewList(reviews: any[]) {
  return reviews.map(formatReview);
}
