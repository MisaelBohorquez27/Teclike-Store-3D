import { formatCurrency } from "../utils/formatCurrency";
import { computeDiscount, getTimeLeft } from "../utils/offersUtils";

/**
 * Tipo reducido que coincide con lo que devuelve offers.repository (select)
 */
export type SelectedProduct = {
  id: number;
  name: string;
  brand: string;
  priceCents: number;
  currency: string;
  imageUrl: string | null;
  description: string | null;
  slug: string;
};

export type OfferMinimal = {
  id: number;
  name: string;
  type: string;
  value: number;
  startDate: Date;
  endDate: Date;
  recurrence: string;
};

export interface FormattedOfferProduct {
  id: number;
  brand: string;
  name: string;
  slug: string;
  description: string | null;
  rating: number;
  image: string;
  discount: string;
  discountPercentage: number;
  originalPrice: string;
  discountPrice: string;
  savings: string;
  timeLeft: number;
  daysLeft: number;
  isUrgent: boolean;
  offerType: 'DAILY' | 'ANNUAL' | 'FEATURED';
  offerName: string;
  recurrence: string;
}

export interface OfferProductPair {
  offer: OfferMinimal;
  product: SelectedProduct;
}

export function formatOfferProduct(pair: OfferProductPair): FormattedOfferProduct {
  const { offer, product } = pair;

  const { discountedCents, discountLabel, discountPercentage, savings } =
    computeDiscount(product.priceCents, offer.type as any, offer.value);

  const timeLeftInfo = getTimeLeft(offer.endDate);

  return {
    id: product.id,
    brand: product.brand,
    name: product.name,
    slug: product.slug,
    description: product.description,
    rating: 4.5,
    image: product.imageUrl ?? "/products/default.png",
    discount: discountLabel,
    discountPercentage,
    originalPrice: formatCurrency(product.priceCents, product.currency),
    discountPrice: formatCurrency(discountedCents, product.currency),
    savings: formatCurrency(savings, product.currency),
    timeLeft: timeLeftInfo.hours,
    daysLeft: timeLeftInfo.days,
    isUrgent: timeLeftInfo.isUrgent,
    offerType: (offer.recurrence === "DAILY" ? "DAILY" : offer.recurrence === "ANNUAL" ? "ANNUAL" : "FEATURED"),
    offerName: offer.name,
    recurrence: offer.recurrence
  };
}

export function formatFallbackProduct(product: SelectedProduct): FormattedOfferProduct {
  const discountPercentage = 10;
  const discountedCents = Math.round(product.priceCents * (1 - discountPercentage / 100));
  const savings = product.priceCents - discountedCents;

  return {
    id: product.id,
    brand: product.brand,
    name: product.name,
    slug: product.slug,
    description: product.description,
    rating: 4.2,
    image: product.imageUrl ?? "/products/default.png",
    discount: `-${discountPercentage}%`,
    discountPercentage,
    originalPrice: formatCurrency(product.priceCents, product.currency),
    discountPrice: formatCurrency(discountedCents, product.currency),
    savings: formatCurrency(savings, product.currency),
    timeLeft: 24,
    daysLeft: 1,
    isUrgent: true,
    offerType: 'FEATURED',
    offerName: 'Producto Destacado',
    recurrence: 'FEATURED'
  };
}

export function deduplicateProducts(products: FormattedOfferProduct[]): FormattedOfferProduct[] {
  const seen = new Set<number>();
  return products.filter(product => {
    if (seen.has(product.id)) return false;
    seen.add(product.id);
    return true;
  });
}