import * as offerRepo from "../repositories/offers.repository";
import { adjustOfferDates, isOfferActive } from "../utils/offersUtils";
import { formatOfferProductPair, formatFallbackProduct } from "../mappers/offers.formatter";

interface OfferQuery {
  recurrence: string | null;
  limit: number;
}

export async function getFormattedOffers({ recurrence, limit }: OfferQuery) {
  let offers = await offerRepo.findOffersWithProducts(recurrence);
  offers = offers.map((offer) => ({
    ...offer,
    ...adjustOfferDates(offer),
  })).filter(isOfferActive);

  if (offers.length === 0) {
    const fallbackProducts = await offerRepo.findFallbackProducts(limit);
    return fallbackProducts.map(formatFallbackProduct);
  }

  const pairs = offers.flatMap((offer: any) =>
    offer.offerProducts.map((op: any) => ({ offer, product: op.product }))
  );

  const shuffled = shuffle(pairs).slice(0, limit);
  return shuffled.map(formatOfferProductPair);
}

function shuffle<T>(arr: T[]): T[] {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
