"use client";
import { useEffect, useState } from "react";
import { TopProductsSell, TopProductsSellCard } from "./TopProductsSellCard";
import { motion } from "framer-motion";
import "swiper/css";
import { CustomSwiper } from "./ui/CustomSwiper";
import { fetchFeatured } from "@/services/topProdSelling";

interface CartListProps {
  onAddToCart: (productId: number, quantity: number) => Promise<void>;
}

export function TopProductSell({ 
  onAddToCart 
}: CartListProps) {

  const handleAddToCart = async (id: string, newQuantity: number) => {
    try {
      await onAddToCart(parseInt(id), newQuantity);
    } catch (error) {
      console.error("Error al agregar al carrito:", error);
    } 
  };

  const [topProductsSell, setTopProductsSell] = useState<TopProductsSell[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProducts() {
      try {
        const data = await fetchFeatured();
        setTopProductsSell(data);
      } catch (err) {
        console.error("Error fetching top sellers:", err);
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  return (
    <div className="BestSellersWeek-bg py-8 md:py-16">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 md:mb-8 gap-4 sm:gap-0">
          <h2 className="TitleColor text-2xl sm:text-3xl font-bold">
            Más vendido de la semana
          </h2>
          <button className="text-blue-600 hover:text-blue-800 font-medium text-base sm:text-lg">
            Ver todos los productos →
          </button>
        </div>

        {loading ? (
          <p className="TextColor">Cargando productos...</p>
        ) : topProductsSell.length === 0 ? (
          <p className="TextColor">No hay productos vendidos esta semana.</p>
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
