"use client";

import { motion } from "framer-motion";
import { CustomSwiper } from "@/components/Swipper/CustomSwiper";
import { useBestSellersLogic } from "../Hooks/useBestSeller";
import { BestSellersWeekCard } from "./BSWCard";
import { TopProductsSellLoading, TopProductsSellError } from "./BSWSellLoading";
import { CONTENT, fadeInAnimation, SWIPER_CONFIG } from "../Data/BSWData";
import { CartListProps } from "../Types/BSWTypes";
import { FiTrendingUp, FiArrowRight, FiStar, FiTable } from "react-icons/fi";

// Subcomponents
const Header = () => (
  <motion.div
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-10 md:mb-12 gap-6"
  >
    <div className="max-w-2xl">
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-yellow-500/10 to-amber-500/10 border border-yellow-500/20 mb-4">
        <FiTable className="w-4 h-4 text-yellow-400" />
        <span className="text-yellow-300 text-sm font-bold tracking-wide">
          TOP VENDEDORES
        </span>
      </div>
      
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
        <span className="bg-gradient-to-r from-yellow-400 via-amber-400 to-orange-400 bg-clip-text text-transparent">
          Más Vendidos
        </span>
        <br />
        <span className="text-white">de la Semana</span>
      </h1>
      
      <p className="text-gray-400 text-lg">
        Los productos que están conquistando a nuestros clientes esta semana
      </p>
    </div>
    
    <a 
      href={CONTENT.viewAllHref}
      className="group inline-flex items-center gap-3 px-6 py-3 rounded-xl bg-gradient-to-r from-gray-900 to-black hover:from-gray-800 hover:to-gray-900 border border-gray-800 hover:border-amber-500/30 text-white font-medium transition-all duration-300 hover:scale-105"
    >
      <span>{CONTENT.viewAllText}</span>
      <FiArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
    </a>
  </motion.div>
);

const StatsBanner = () => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay: 0.2, duration: 0.5 }}
    className="mb-10 md:mb-12"
  >
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {[
        { value: "1,250+", label: "Ventas Semanales", icon: "📈", color: "from-green-500 to-emerald-500" },
        { value: "4.8", label: "Rating Promedio", icon: "⭐", color: "from-yellow-500 to-amber-500" },
        { value: "98%", label: "Satisfacción", icon: "😊", color: "from-blue-500 to-cyan-500" },
        { value: "24h", label: "Entrega Rápida", icon: "🚚", color: "from-purple-500 to-pink-500" },
      ].map((stat, index) => (
        <div
          key={index}
          className="p-4 rounded-2xl bg-gray-900/50 backdrop-blur-sm border border-gray-800/50 hover:border-gray-700/50 transition-all duration-300 group hover:scale-105"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="text-2xl">{stat.icon}</div>
            <div>
              <div className={`text-3xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                {stat.value}
              </div>
              <div className="text-xs text-gray-400">{stat.label}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </motion.div>
);

const EmptyState = () => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5 }}
    className="text-center py-16"
  >
    <div className="max-w-md mx-auto">
      <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
        <FiTrendingUp className="w-10 h-10 text-gray-600" />
      </div>
      <h3 className="text-2xl font-bold text-white mb-3">
        Próximos Campeones
      </h3>
      <p className="text-gray-400 mb-8">
        {CONTENT.emptyText}
      </p>
      <button className="px-6 py-3 bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-700 hover:to-gray-800 text-white font-medium rounded-xl transition-all">
        Explorar Productos
      </button>
    </div>
  </motion.div>
);

const BestSellersSwiper = ({ 
  items, 
  onAddToCart 
}: { 
  items: any[];
  onAddToCart: (id: number, quantity: number) => void;
}) => (
  <motion.div
    {...fadeInAnimation}
    className="relative"
  >
    {/* Indicadores de scroll */}
    <div className="hidden lg:block absolute -left-6 top-1/2 -translate-y-1/2">
      <div className="text-xs text-gray-500 rotate-90 tracking-widest whitespace-nowrap">
        DESLIZA
      </div>
    </div>
    
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
  <section className="relative bg-gradient-to-br from-gray-950 via-gray-950 to-gray-900 overflow-hidden">
    {/* Efectos de fondo */}
    <div className="absolute inset-0">
      {/* Patrón sutil */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(250,204,21,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(250,204,21,0.03)_1px,transparent_1px)] bg-[size:80px_80px]" />
    </div>

    <div className="relative z-10 py-16 md:py-24">
      <div className="container mx-auto px-4">
        {children}
      </div>
    </div>
  </section>
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
    <div>
      <StatsBanner />
      <BestSellersSwiper 
        items={bestSellerWeek} 
        onAddToCart={handleAddToCart} 
      />
      
      {/* CTA adicional */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="text-center mt-16"
      >
        <div className="inline-flex flex-col items-center gap-4 max-w-2xl mx-auto p-8 rounded-3xl bg-gradient-to-r from-gray-900/50 to-black/50 backdrop-blur-sm border border-gray-800/50">
          <div className="flex items-center gap-3 mb-2">
            <FiStar className="w-6 h-6 text-yellow-400" />
            <h3 className="text-xl font-bold text-white">¿Buscas algo específico?</h3>
            <FiStar className="w-6 h-6 text-yellow-400" />
          </div>
          <p className="text-gray-400">
            Explora nuestra colección completa de productos premium
          </p>
          <a 
            href={CONTENT.viewAllHref}
            className="mt-4 px-8 py-3 bg-gradient-to-r from-yellow-600 to-amber-600 hover:from-yellow-500 hover:to-amber-500 text-white font-bold rounded-xl transition-all hover:scale-105 hover:shadow-xl hover:shadow-yellow-500/20"
          >
            Ver Catálogo Completo
          </a>
        </div>
      </motion.div>
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

// Versiones alternativas

export function BestSellersWeekSwiperOnly({ onAddToCart }: CartListProps) {
  const { bestSellerWeek, loading, error, handleAddToCart, hasProducts } = useBestSellersLogic(onAddToCart);

  if (error) return <TopProductsSellError error={error} />;
  if (loading) return <TopProductsSellLoading />;
  if (!hasProducts) return <EmptyState />;

  return (
    <div className="relative py-12">
      <BestSellersSwiper 
        items={bestSellerWeek} 
        onAddToCart={handleAddToCart} 
      />
    </div>
  );
}

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
    <section className={`relative bg-gradient-to-br from-gray-950 via-black to-gray-950 py-16 md:py-24 ${className}`}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-12 gap-6"
        >
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {title}
            </h1>
            <p className="text-gray-400">
              Descubre los productos más populares
            </p>
          </div>
          <a 
            href={viewAllHref}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gray-900 hover:bg-gray-800 text-white font-medium transition-all"
          >
            {CONTENT.viewAllText}
          </a>
        </motion.div>
        <BestSellersContent {...logic} />
      </div>
    </section>
  );
}