import { useEffect, useState } from "react";
import { ProductForCard } from "@/types/productss";
import { fetchFeaturedOffers } from "@/services/offers";

export const useDailyOffers = () => {
  const [offers, setOffers] = useState<ProductForCard[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const data = await fetchFeaturedOffers();
        setOffers(data);
      } catch (err) {
        console.error("❌ Error fetching offers:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOffers();
  }, []);

  return { offers, loading };
};