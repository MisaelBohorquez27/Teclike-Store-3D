import { Offer } from "@prisma/client";
import { formatCurrency } from "./formatCurrency";

export function computeDiscount(priceCents: number, type: string, value: number) {
  let discountedCents = priceCents;
  let discountLabel = "";

  if (type === "percentage") {
    discountedCents = Math.max(0, Math.round((priceCents * (100 - value)) / 100));
    discountLabel = `-${value}%`;
  } else if (type === "fixed") {
    discountedCents = Math.max(0, priceCents - value);
    discountLabel = `-${formatCurrency(value, "USD")}`;
  }

  return { discountedCents, discountLabel };
}

export function adjustOfferDates(offer: Offer): Offer {
  const now = new Date();
  const tomorrow = new Date(now);
  tomorrow.setDate(now.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0);

  if (offer.recurrence === "yearly") {
    const start = new Date(offer.startDate);
    const end = new Date(offer.endDate);
    const currentYear = now.getFullYear();

    start.setFullYear(currentYear);
    end.setFullYear(currentYear);

    if (end < now) {
      start.setFullYear(currentYear + 1);
      end.setFullYear(currentYear + 1);
    }

    return { ...offer, startDate: start, endDate: end };
  }

  if (offer.recurrence === "daily") {
    const start = new Date(now);
    const end = new Date(tomorrow);
    if (end < now) {
      start.setDate(now.getDate() + 1);
      end.setDate(now.getDate() + 1);
    }
    return { ...offer, startDate: start, endDate: end };
  }

  return offer;
}

export function isOfferActive(offer: Offer): boolean {
  const now = new Date();
  return now >= offer.startDate && now <= offer.endDate;
}
