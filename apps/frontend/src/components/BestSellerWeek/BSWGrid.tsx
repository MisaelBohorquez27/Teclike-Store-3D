"use client";
import { motion } from "framer-motion";
import { CustomSwiper } from "../ui/CustomSwiper";
import { useTopProductsSell } from "../../hooks/useBestSellerWeek";
import { TopProductsSellCard } from "./BSWCard";
import { TopProductsSellLoading } from "./BSWSellLoading";
import { TopProductsSellError } from "./BSWSellLoading";

interface CartListProps {
  onAddToCart: (productId: number, quantity: number) => Promise<void>;
}

export function TopProductSell({ onAddToCart }: CartListProps) {
  const { topProductsSell, loading, error } = useTopProductsSell();

  const handleAddToCart = async (id: string, newQuantity: number) => {
    try {
      await onAddToCart(parseInt(id), newQuantity);
    } catch (error) {
      console.error("Error al agregar al carrito:", error);
    } 
  };

  if (error) {
    return <TopProductsSellError error={error} />;
  }

  return (
    <div className="BestSellersWeek-bg py-8 md:py-16">
      <div className="container mx-auto px-4 sm:px-6">
        <Header />
        
        {loading ? (
          <TopProductsSellLoading />
        ) : topProductsSell.length === 0 ? (
          <EmptyState />
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <CustomSwiper
              items={topProductsSell}
              renderItem={(item) => (
                <TopProductsSellCard
                  key={item.id}
                  item={item}
                  onAddToCart={handleAddToCart}
                />
              )}
              breakpoints={{
                640: { spaceBetween: 25, slidesPerView: 1 },
                768: { spaceBetween: 30, slidesPerView: 1 },
                1024: { spaceBetween: 40, slidesPerView: 1 },
              }}
              speed={400}
              effect="fade"
              fadeEffect={{ crossFade: true }}
              withIndicators
              className="relative overflow-hidden"
            />
          </motion.div>
        )}
      </div>
    </div>
  );
}

const Header = () => (
  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 md:mb-8 gap-4 sm:gap-0">
    <h2 className="TitleColor text-2xl sm:text-3xl font-bold">
      Más vendido de la semana
    </h2>
    <button className="text-blue-600 hover:text-blue-800 font-medium text-base sm:text-lg">
      <a href="/Products">Ver todos los productos →</a>
    </button>
  </div>
);

const EmptyState = () => (
  <p className="TextColor">No hay productos vendidos esta semana.</p>
);