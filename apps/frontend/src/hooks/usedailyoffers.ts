import { useEffect, useState } from "react";
import { fetchFeaturedOffers } from "@/services/offers";
import { ProductWithOffer } from "@/types/offers";

export const useDailyOffers = (limit = Number) => {
  const [offers, setOffers] = useState<ProductWithOffer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchOffers() {
      try {
        const data = await fetchFeaturedOffers(limit);
        setOffers(data.data);
      } catch (error) {
        console.error("Error fetching featured offers:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchOffers();
  }, []);
  return { 
    offers,
    loading
  };
};