"use client";
import { motion } from "framer-motion";
import { CustomSwiper } from "@/components/Swipper/CustomSwiper";
import { useBestSellersLogic } from "../Hooks/useBestSeller";
import { BestSellersWeekCard } from "./BSWCard";
import { TopProductsSellLoading, TopProductsSellError } from "./BSWSellLoading";
import { CONTENT, fadeInAnimation, SWIPER_CONFIG } from "../Data/BSWData";
import { CartListProps } from "../Types/BSWTypes";


// Subcomponents
const Header = () => (
  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 md:mb-8 gap-4 sm:gap-0">
    <h2 className="text-2xl sm:text-3xl font-bold">
      {CONTENT.title}
    </h2>
    <a 
      href={CONTENT.viewAllHref}
      className="text-links font-medium text-base sm:text-lg transition-colors duration-200"
    >
      {CONTENT.viewAllText}
    </a>
  </div>
);

const EmptyState = () => (
  <div className="text-center py-8">
    <p className="TextColor text-lg">{CONTENT.emptyText}</p>
  </div>
);

const BestSellersSwiper = ({ 
  items, 
  onAddToCart 
}: { 
  items: any[];
  onAddToCart: (id: number, quantity: number) => void;
}) => (
  <motion.div {...fadeInAnimation}>
    <CustomSwiper
      items={items}
      renderItem={(item) => (
        <BestSellersWeekCard
          key={item.id}
          item={item}
          onAddToCart={onAddToCart}
        />
      )}
      breakpoints={SWIPER_CONFIG.breakpoints}
      speed={SWIPER_CONFIG.speed}
      effect={SWIPER_CONFIG.effect}
      fadeEffect={SWIPER_CONFIG.fadeEffect}
      withIndicators={SWIPER_CONFIG.withIndicators}
      className={SWIPER_CONFIG.className}
    />
  </motion.div>
);

const Container = ({ children }: { children: React.ReactNode }) => (
  <div className="BestSellersWeek-bg py-8 md:py-16">
    <div className="container mx-auto px-4 sm:px-6">
      {children}
    </div>
  </div>
);

// Componente de contenido principal
const BestSellersContent = ({ 
  bestSellerWeek, 
  loading, 
  error, 
  handleAddToCart,
  hasProducts 
}: ReturnType<typeof useBestSellersLogic>) => {
  if (error) {
    return <TopProductsSellError error={error} />;
  }

  if (loading) {
    return <TopProductsSellLoading />;
  }

  if (!hasProducts) {
    return <EmptyState />;
  }

  return (
    <BestSellersSwiper 
      items={bestSellerWeek} 
      onAddToCart={handleAddToCart} 
    />
  );
};

// Main Component
export function BestSellersWeekGrid({ onAddToCart }: CartListProps) {
  const logic = useBestSellersLogic(onAddToCart);

  return (
    <Container>
      <Header />
      <BestSellersContent {...logic} />
    </Container>
  );
}

// Alternative versions for different use cases

// Versión minimalista sin header
export function BestSellersWeekSwiperOnly({ onAddToCart }: CartListProps) {
  const { bestSellerWeek, loading, error, handleAddToCart, hasProducts } = useBestSellersLogic(onAddToCart);

  if (error) return <TopProductsSellError error={error} />;
  if (loading) return <TopProductsSellLoading />;
  if (!hasProducts) return <EmptyState />;

  return (
    <BestSellersSwiper 
      items={bestSellerWeek} 
      onAddToCart={handleAddToCart} 
    />
  );
}

// Versión con props personalizables
interface BestSellersWeekGridCustomProps extends CartListProps {
  title?: string;
  viewAllHref?: string;
  className?: string;
}

export function BestSellersWeekGridCustom({ 
  onAddToCart, 
  title = CONTENT.title,
  viewAllHref = CONTENT.viewAllHref,
  className = ""
}: BestSellersWeekGridCustomProps) {
  const logic = useBestSellersLogic(onAddToCart);

  return (
    <div className={`BestSellersWeek-bg py-8 md:py-16 ${className}`}>
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 md:mb-8 gap-4 sm:gap-0">
          <h2 className="TitleColor text-2xl sm:text-3xl font-bold">
            {title}
          </h2>
          <a 
            href={viewAllHref}
            className="text-blue-600 hover:text-blue-800 font-medium text-base sm:text-lg transition-colors duration-200"
          >
            {CONTENT.viewAllText}
          </a>
        </div>
        <BestSellersContent {...logic} />
      </div>
    </div>
  );
}