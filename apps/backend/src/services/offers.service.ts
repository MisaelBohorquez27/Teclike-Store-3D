import * as offerRepo from "../repositories/offers.repository";
import { prioritizeOffers } from "../utils/offersUtils";
import {
  formatOfferProduct,
  formatFallbackProduct,
  deduplicateProducts,
  type FormattedOfferProduct,
  type SelectedProduct,
  type OfferMinimal
} from "../mappers/offers.formatter";

export interface OfferQuery {
  recurrence?: 'DAILY' | 'ANNUAL' | 'ALL';
  limit?: number;
  excludeDuplicates?: boolean;
}

export async function getFormattedOffers({
  recurrence = 'ALL',
  limit = 20,
  excludeDuplicates = true
}: OfferQuery = {}): Promise<FormattedOfferProduct[]> {
  try {
    // 1) obtener ofertas activas según recurrencia
    let offers = [];
    switch (recurrence) {
      case 'DAILY':
        offers = await offerRepo.findDailyOffers();
        break;
      case 'ANNUAL':
        offers = await offerRepo.findAnnualOffers();
        break;
      default:
        offers = await offerRepo.findActiveOffersWithProducts();
    }

    // 2) priorizar ofertas
    const prioritizedOffers = prioritizeOffers(offers);

    // 3) construir pares offer-product (asegurando shape correcto)
    const offerProductPairs: Array<{ offer: OfferMinimal; product: SelectedProduct }> = prioritizedOffers.flatMap((offer: any) =>
      (offer.offerProducts ?? []).map((op: any) => ({
        offer: {
          id: offer.id,
          name: offer.name,
          type: offer.type,
          value: offer.value,
          startDate: offer.startDate,
          endDate: offer.endDate,
          recurrence: offer.recurrence
        },
        product: op.product as SelectedProduct
      }))
    );

    // 4) formatear
    let formattedProducts = offerProductPairs.map(formatOfferProduct);

    // 5) eliminar duplicados si corresponde
    if (excludeDuplicates) {
      formattedProducts = deduplicateProducts(formattedProducts);
    }

    // 6) si no hay ofertas, fallback a productos destacados
    if (formattedProducts.length === 0) {
      const fallbackProducts = await offerRepo.findFallbackProducts(limit);
      formattedProducts = fallbackProducts.map(formatFallbackProduct);
    }

    return formattedProducts.slice(0, limit);
  } catch (error) {
    console.error('Error en getFormattedOffers:', error);
    const fallbackProducts = await offerRepo.findFallbackProducts(limit);
    return fallbackProducts.map(formatFallbackProduct);
  }
}

export async function getDailyOffers(limit: number = 10): Promise<FormattedOfferProduct[]> {
  return getFormattedOffers({
    recurrence: 'DAILY',
    limit,
    excludeDuplicates: true
  });
}

export async function getAnnualOffers(limit: number = 10): Promise<FormattedOfferProduct[]> {
  return getFormattedOffers({
    recurrence: 'ANNUAL',
    limit,
    excludeDuplicates: true
  });
}

export async function getAllActiveOffers(limit: number = 20): Promise<FormattedOfferProduct[]> {
  return getFormattedOffers({
    recurrence: 'ALL',
    limit,
    excludeDuplicates: true
  });
}