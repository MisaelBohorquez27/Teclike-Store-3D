import { formatCurrency } from "../utils/formatCurrency";

export function formatBestSellerProduct(product: any) {
  const rating =
    product.reviews.length > 0
      ? product.reviews.reduce((sum: number, r: any) => sum + r.rating, 0) /
        product.reviews.length
      : 0;

  const category =
    product.categoryProducts?.[0]?.category?.name ?? "Uncategorized";

  const isNew =
    new Date().getTime() - new Date(product.createdAt).getTime() <
    30 * 24 * 60 * 60 * 1000;

  return {
    id: product.id,
    name: product.name,
    brand: product.brand ?? "",
    slug: product.slug,
    category,
    rating,
    reviewCount: product.reviews.length,
    image: product.imageUrl ?? "/products/default.png",
    price: formatCurrency(product.priceCents, product.currency),
    priceInt: product.priceCents / 100,
    currency: product.currency,
    inStock: (product.inventory?.stock ?? 0) > 0,
    stock: product.inventory?.stock ?? 0,
    isNew,
    description: product.description ?? "",
  };
}
