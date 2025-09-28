import { ProductForCard } from "@/types/productss";

// Hook para la lógica del estado
export const useDailyOffers = (offers: ProductForCard[], loading: boolean) => {
  const hasOffers = offers.length > 0 && !loading;
  const isEmpty = offers.length === 0 && !loading;

  return {
    hasOffers,
    isEmpty,
    isLoading: loading,
  };
};