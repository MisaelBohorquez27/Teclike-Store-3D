import { formatCurrency } from "../utils/formatCurrency";

// Formato "tarjeta"
export function formatForCardSearch(p: any) {
  const primaryCategory =
    p.categoryProducts?.[0]?.category?.name ?? "Uncategorized";
  const isNew =
    (Date.now() - new Date(p.createdAt).getTime()) / (1000 * 60 * 60 * 24) <=
    30;

  return {
    id: p.id,
    name: p.name,
    slug: p.slug,
    price: formatCurrency(p.priceCents, p.currency),
    imageUrl: p.imageUrl ?? "/placeholder.png",
    category: primaryCategory,
    rating: p.rating ?? 0,
    reviewCount: p._count?.reviews ?? 0,
    score: p._score ?? 0,
    inStock: p.stock > 0,
  };
}