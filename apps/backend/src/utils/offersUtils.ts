import { Offer } from "@prisma/client";

export interface ComputedDiscount {
  discountedCents: number;
  discountLabel: string;
  discountPercentage: number;
  savings: number;
}

export function computeDiscount(
  originalPriceCents: number,
  discountType: string,
  discountValue: number
): ComputedDiscount {
  let discountedCents = originalPriceCents;
  let discountLabel = "";
  let discountPercentage = 0;

  switch (discountType) {
    case "PERCENTAGE":
      discountedCents = Math.round(originalPriceCents * (1 - discountValue / 100));
      discountLabel = `-${discountValue}%`;
      discountPercentage = discountValue;
      break;

    case "FIXED":
      discountedCents = Math.max(0, originalPriceCents - discountValue);
      discountLabel = `-${formatCurrency(discountValue)}`;
      discountPercentage = Math.round((discountValue / originalPriceCents) * 100);
      break;

    default:
      discountedCents = originalPriceCents;
      discountLabel = "-0%";
      discountPercentage = 0;
  }

  const savings = originalPriceCents - discountedCents;

  return {
    discountedCents,
    discountLabel,
    discountPercentage,
    savings
  };
}

export function formatCurrency(cents: number, currency: string = "USD"): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(cents / 100);
}

export function isOfferActive(offer: Offer): boolean {
  const now = new Date();
  return offer.startDate <= now && offer.endDate >= now;
}

export function getTimeLeft(endDate: Date): {
  hours: number;
  days: number;
  isUrgent: boolean;
} {
  const now = new Date();
  const diffMs = endDate.getTime() - now.getTime();
  
  const hours = Math.ceil(diffMs / (1000 * 60 * 60));
  const days = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
  
  return {
    hours,
    days,
    isUrgent: hours <= 24 // Urgente si queda menos de 24 horas
  };
}

export function adjustOfferDates(offer: Offer): Offer {
  // Para ofertas diarias, ajustar fechas al día actual
  if (offer.recurrence === 'DAILY') {
    const now = new Date();
    const startOfDay = new Date(now);
    startOfDay.setHours(0, 0, 0, 0);
    
    const endOfDay = new Date(now);
    endOfDay.setHours(23, 59, 59, 999);
    
    return {
      ...offer,
      startDate: startOfDay,
      endDate: endOfDay
    };
  }
  
  return offer;
}

export function prioritizeOffers(offers: any[]): any[] {
  return offers.sort((a, b) => {
    // Primero por recurrencia (ANNUAL > DAILY)
    if (a.recurrence !== b.recurrence) {
      return a.recurrence === 'ANNUAL' ? -1 : 1;
    }
    
    // Luego por porcentaje de descuento (mayor primero)
    const discountA = computeDiscount(10000, a.type, a.value).discountPercentage;
    const discountB = computeDiscount(10000, b.type, b.value).discountPercentage;
    
    return discountB - discountA;
  });
}