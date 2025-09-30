import { useBestSellerWeek } from "@/hooks/useBestSellerWeek";
import { CartListProps } from "../Types/BSWTypes";

// Hook para la lógica del componente
export const useBestSellersLogic = (onAddToCart: CartListProps['onAddToCart']) => {
  const { bestSellerWeek, loading, error } = useBestSellerWeek();

  const handleAddToCart = (id: number, quantity: number) => {
    onAddToCart(id, quantity);
  };

  return {
    bestSellerWeek,
    loading,
    error,
    handleAddToCart,
    hasProducts: bestSellerWeek.length > 0,
  };
};