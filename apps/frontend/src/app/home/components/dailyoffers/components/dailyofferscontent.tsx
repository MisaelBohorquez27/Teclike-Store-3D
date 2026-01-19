"use client";

import Link from "next/link";
import Button from "@/components/common/pagesbuttons";
import { CustomSwiper } from "@/components/swipper/customswiper";
import { OfferCard } from "./offercard";
import { CONFIG } from "../data/dailyoffersdata";
import { useDailyOffers } from "../hooks/usedailyoffer";
import { ProductWithOffer } from "@/types/offers";
import { motion } from "framer-motion";
import { FiClock, FiArrowRight, FiZap, FiFilter } from "react-icons/fi";

// Types
interface DailyOffersContentProps {
  offers: ProductWithOffer[];
  loading: boolean;
}

// Subcomponents
const DailyOffersHeader = () => (
  <motion.div
    initial={{ opacity: 0, x: -30 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.6 }}
    className="relative text-center lg:text-left lg:max-w-md lg:px-4 xl:px-6 lg:w-1/3"
  >
    {/* Título */}
    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black mb-2 md:mb-4 lg:mb-6">
      <span className="bg-linear-to-r from-cyan-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
        {CONFIG.content.title.split(" ")[0]}
      </span>
      <br />
      <span className="text-gray-100">
        {CONFIG.content.title.split(" ").slice(1).join(" ")}
      </span>
    </h1>

    {/* Descripción */}
    <p className="text-gray-200 text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed mb-4 md:mb-8">
      {CONFIG.content.description}
    </p>

    {/* CTA Button */}
    <Link href={CONFIG.content.buttonHref}>
      <Button
        size="m"
        className="group relative overflow-hidden bg-linear-to-r from-cyan-600 via-cyan-600 to-blue-600 hover:from-cyan-500 hover:via-cyan-400 hover:to-blue-400 text-gray-100 hover:text-gray-100 font-bold px-6 md:px-8 py-3 md:py-4 text-sm md:text-base rounded-xl hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-cyan-500/25"
      >
        <span className="flex items-center gap-3 relative z-10">
          <FiZap className="w-4 md:w-5 h-4 md:h-5" />
          {CONFIG.content.buttonText}
          <FiArrowRight className="w-4 md:w-5 h-4 md:h-5 group-hover:translate-x-1 transition-transform" />
        </span>
        <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent -skew-x-12 transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
      </Button>
    </Link>

    {/* Stats */}
    <div className="flex flex-wrap gap-2 md:gap-4 mt-4 md:mt-8 justify-center lg:justify-start">
      {[
        { value: "10+", label: "Ofertas Activas" },
        { value: "95%", label: "Clientes Satisfechos" },
        { value: "24/7", label: "Soporte" },
      ].map((stat, index) => (
        <div key={index} className="text-center">
          <div className="text-lg md:text-2xl font-bold text-gray-100">{stat.value}</div>
          <div className="text-xs md:text-xs text-gray-400">{stat.label}</div>
        </div>
      ))}
    </div>
  </motion.div>
);

const OffersSwiper = ({ offers }: { offers: ProductWithOffer[] }) => (
  <div className="relative">
    {/* Efecto de borde */}
    <div className="absolute -inset-0.5 bg-linear-to-r from-blue-400/10 via-blue-400/10 to-cyan-400/10 rounded-3xl blur-sm" />

    <CustomSwiper
      items={offers}
      renderItem={(product) => <OfferCard product={product} />}
      breakpoints={CONFIG.swiper.breakpoints}
      className={`${CONFIG.swiper.className} relative z-10`}
      speed={CONFIG.swiper.speed}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      }}
    />
  </div>
);

const SwiperContent = ({ offers, loading }: DailyOffersContentProps) => {
  const { hasOffers, isEmpty, isLoading } = useDailyOffers(offers, loading);

  if (isLoading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="w-full text-center py-12 min-h-96"
      >
        <div className="inline-block">
          <div className="w-12 h-12 border-4 border-blue-500/30 border-t-cyan-500 rounded-full animate-spin mb-4"></div>
          <p className="text-gray-400 font-medium">
            {CONFIG.content.loadingText}
          </p>
        </div>
      </motion.div>
    );
  }

  if (isEmpty) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full text-center py-12 min-h-96 flex items-center justify-center"
      >
        <div className="inline-flex flex-col items-center gap-4 p-8 rounded-2xl bg-linear-to-br from-gray-900/50 to-black/50 backdrop-blur-sm border border-gray-800/50">
          <div className="w-16 h-16 rounded-full bg-linear-to-r from-gray-800 to-gray-900 flex items-center justify-center">
            <FiFilter className="w-8 h-8 text-gray-600" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-200 mb-2">
              ¡Próximamente!
            </h3>
            <p className="text-gray-400 max-w-sm">{CONFIG.content.emptyText}</p>
          </div>
        </div>
      </motion.div>
    );
  }

  if (hasOffers) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <OffersSwiper offers={offers} />
      </motion.div>
    );
  }

  return null;
};

// Main Component
export const DailyOffersContent = ({
  offers,
  loading,
}: DailyOffersContentProps) => {
  return (
    <section className="relative bg-gray-900/50 backdrop-blur-sm border border-cyan-900/50 overflow-hidden rounded-3xl">
      {/* Efectos de fondo */}
      <div className="absolute inset-0">
        {/* Patrón de grid sutil */}
        <div
          className="absolute inset-0 
  bg-[linear-gradient(rgba(0,255,255,0.05)_1px,transparent_1px),
     linear-gradient(90deg,rgba(0,255,255,0.05)_1px,transparent_1px)] 
  bg-size-[64px_64px]"
        />
      </div>

      <div className="relative container mx-auto px-4 py-8 md:py-16 lg:py-24">
        <div className="flex flex-col lg:flex-row items-center gap-4 md:gap-6 lg:gap-8 xl:gap-10">
          <DailyOffersHeader />

          <div className="relative w-full lg:w-2/3">
            <SwiperContent offers={offers} loading={loading} />

          </div>
        </div>
      </div>
    </section>
  );
};
