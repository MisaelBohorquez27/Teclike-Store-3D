import { useEffect, useState } from "react";
import { ProductForCard } from "@/types/productss";
import { fetchFeaturedOffers } from "@/services/offers";

export const useDailyOffers = () => {
  const [offers, setOffers] = useState<ProductForCard[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchOffers() {
      try {
        const data = await fetchFeaturedOffers();
        setOffers(data);
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