import { Key } from "react";

export interface ProductWithOffer {
    reactKey?: Key | null | undefined;
    id: number;
    brand: string;
    name: string;
    slug: string;
    description: string;
    rating: number;
    imageUrl: string;
    discount: string;
    originalPrice: string;
    discountPrice: string;
    savings: string;
    timeLeft?: number;
    daysLeft?: number;
    offerType?: string;
    OfferName?: string;
    recurrence?: string;
    isFlashDeal?: boolean | false;
}

export interface OffersResponse {
    success: boolean;
    data: ProductWithOffer[];
    meta: {
        count: number;
        recurrence: 'DAILY' | 'ANNUAL' | 'ALL';
        hasDailyOffers?: boolean;
        hasAnnualOffers?: boolean;
        type?: string;
    };
}

