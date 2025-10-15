import { Offer, Product } from "@prisma/client";
import { computeDiscount } from "../utils/offersUtils";
import { formatCurrency } from "../utils/formatCurrency";

export function formatOfferProductPair({
  offer,
  product,
}: {
  offer: Offer;
  product: Product;
}) {
  const { discountedCents, discountLabel } = computeDiscount(
    product.priceCents,
    offer.type,
    offer.value
  );

  return {
    id: product.id,
    brand: product.brand,
    name: product.name,
    rating: 5,
    image: product.imageUrl ?? "/products/default.png",
    discount: discountLabel,
    originalPrice: formatCurrency(product.priceCents, product.currency),
    discountPrice: formatCurrency(discountedCents, product.currency),
    timeLeft: Math.ceil(
      (new Date(offer.endDate).getTime() - Date.now()) / (1000 * 60 * 60)
    ),
  };
}

export function formatFallbackProduct(product: Product) {
  return {
    id: product.id,
    title: product.name,
    name: product.brand,
    rating: 4.8,
    image: product.imageUrl ?? "/products/default.png",
    discount: "-10%",
    price: formatCurrency(Math.round(product.priceCents * 0.9), product.currency),
  };
}
