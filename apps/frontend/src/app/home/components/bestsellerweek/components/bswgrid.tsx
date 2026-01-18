"use client";

import { motion } from "framer-motion";
import { CustomSwiper } from "@/components/swipper/customswiper";
import { useBestSellersLogic } from "../hooks/usebestseller";
import { BestSellersWeekCard } from "./bswcard";
import { TopProductsSellLoading, TopProductsSellError } from "./bswsellloading";
import { CONTENT, fadeInAnimation, SWIPER_CONFIG } from "../data/bswdata";
import { CartListProps } from "../types/bswtypes";
import { FiTrendingUp, FiArrowRight, FiStar, FiTable } from "react-icons/fi";
import Button from "@/components/common/pagesbuttons";
import Link from "next/dist/client/link";

// Subcomponents
const Header = () => (
  <motion.div
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-10 md:mb-12 gap-6"
  >
    <div className="max-w-2xl">
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
        <span className="bg-linear-to-r from-blue-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
          Más Vendidos
        </span>
        <br />
        <span className="text-white">de la Semana.</span>
      </h1>

      <p className="text-gray-400 text-lg">
        Los productos que están conquistando a nuestros clientes esta semana
      </p>
    </div>
    <Link href="/products">
      <Button className="group inline-flex items-center gap-3 px-6 py-3 rounded-xl bg-linear-to-r from-gray-900 to-black hover:from-gray-800 hover:to-gray-900 border border-gray-800 hover:border-amber-500/30 text-white font-medium transition-all duration-300 hover:scale-105">
        <span>{CONTENT.viewAllText}</span>
        <FiArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
      </Button>
    </Link>
  </motion.div>
);
// Estado vacío
const EmptyState = () => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5 }}
    className="text-center py-16"
  >
    <div className="max-w-md mx-auto">
      <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-linear-to-br from-gray-800 to-gray-900 flex items-center justify-center">
        <FiTrendingUp className="w-10 h-10 text-gray-600" />
      </div>
      <h3 className="text-2xl font-bold text-white mb-3">Próximos Campeones</h3>
      <p className="text-gray-400 mb-8">{CONTENT.emptyText}</p>
      <Link href="/products">
        <Button
          size="s"
          className="px-6 py-3 bg-linear-to-r from-gray-800 to-gray-900 hover:from-gray-700 hover:to-gray-800 text-white font-medium rounded-xl transition-all"
        >
          Explorar Productos
        </Button>
      </Link>
    </div>
  </motion.div>
);

// Carrusel de productos más vendidos
const BestSellersSwiper = ({
  items,
  onAddToCart,
}: {
  items: any[];
  onAddToCart: (id: number, quantity: number) => void;
}) => (
  <motion.div {...fadeInAnimation} className="relative">
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
      className={`${SWIPER_CONFIG.className} relative z-10`}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      }}
      navigation
      pagination={{ clickable: true }}
    />

    <div className="hidden lg:block absolute -right-6 top-1/2 -translate-y-1/2">
      <div className="text-xs text-gray-500 rotate-90 tracking-widest">→</div>
    </div>
  </motion.div>
);

const Container = ({ children }: { children: React.ReactNode }) => (
  <section className="relative bg-gray-950 overflow-hidden">
    {/* Efectos de fondo */}
    <div className="absolute inset-0">
      {/* Patrón sutil */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(250,204,21,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(250,204,21,0.03)_1px,transparent_1px)] bg-size-[80px_80px]" />
    </div>

    <div className="relative z-10 py-8 md:py-14">
      <div className="container mx-auto px-4">{children}</div>
    </div>
  </section>
);

// Componente de contenido principal
const BestSellersContent = ({
  bestSellerWeek,
  loading,
  error,
  handleAddToCart,
  hasProducts,
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
    <div>
      <BestSellersSwiper items={bestSellerWeek} onAddToCart={handleAddToCart} />
    </div>
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
