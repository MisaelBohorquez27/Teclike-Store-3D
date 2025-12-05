"use client";

import Link from "next/link";
import Button from "@/components/PagesButtons";
import { CustomSwiper } from "@/components/Swipper/CustomSwiper";
import { OfferCard } from "./OfferCard";
import { CONFIG } from "../Data/DailyOffersData";
import { useDailyOffers } from "../Hooks/useDailyOffer";
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
    <h1 className="text-5xl md:text-6xl lg:text-7xl font-black mb-4 lg:mb-6">
      <span className="bg-gradient-to-r from-cyan-400 via-cyan-400 to-cyan-400 bg-clip-text text-transparent">
        {CONFIG.content.title.split(" ")[0]}
      </span>
      <br />
      <span className="text-white">
        {CONFIG.content.title.split(" ").slice(1).join(" ")}
      </span>
    </h1>

    {/* Descripción */}
    <p className="text-gray-300 text-lg md:text-xl leading-relaxed mb-8">
      {CONFIG.content.description}
    </p>

    {/* CTA Button */}
    <Link href={CONFIG.content.buttonHref}>
      <Button
        size="m"
        className="group relative overflow-hidden bg-gradient-to-r from-cyan-600 via-cyan-600 to-blue-600 hover:from-cyan-500 hover:via-cyan-400 hover:to-blue-400 text-gray-100 hover:text-gray-100 font-bold px-8 py-4 rounded-xl hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-red-500/25"
      >
        <span className="flex items-center gap-3 relative z-10">
          <FiZap className="w-5 h-5" />
          {CONFIG.content.buttonText}
          <FiArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </span>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
      </Button>
    </Link>

    {/* Stats */}
    <div className="flex flex-wrap gap-4 mt-8">
      {[
        { value: "500+", label: "Ofertas Activas" },
        { value: "95%", label: "Clientes Satisfechos" },
        { value: "24/7", label: "Soporte" },
      ].map((stat, index) => (
        <div key={index} className="text-center">
          <div className="text-2xl font-bold text-white">{stat.value}</div>
          <div className="text-xs text-gray-400">{stat.label}</div>
        </div>
      ))}
    </div>
  </motion.div>
);

const OffersSwiper = ({ offers }: { offers: ProductWithOffer[] }) => (
  <div className="relative">
    {/* Efecto de borde */}
    <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-400/10 via-blue-400/10 to-cyan-400/10 rounded-3xl blur-sm" />

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
      navigation
      pagination={{ clickable: true }}
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
        className="text-center py-12"
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
        className="text-center py-12"
      >
        <div className="inline-flex flex-col items-center gap-4 p-8 rounded-2xl bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-sm border border-gray-800/50">
          <div className="w-16 h-16 rounded-full bg-gradient-to-r from-gray-800 to-gray-900 flex items-center justify-center">
            <FiFilter className="w-8 h-8 text-gray-600" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white mb-2">
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
    <section className="relative bg-gradient-to-br from-gray-800 via-gray-950 to-gray-900 overflow-hidden rounded-3xl">
      {/* Efectos de fondo */}
      <div className="absolute inset-0">
        {/* Patrón de grid sutil */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,65,84,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,65,84,0.02)_1px,transparent_1px)] bg-[size:64px_64px]" />

        {/* Efectos de luz */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyam-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative container mx-auto px-4 py-16 md:py-24">
        <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-8 xl:gap-10">
          <DailyOffersHeader />

          <div className="relative w-full lg:w-2/3 pr-4">
            <SwiperContent offers={offers} loading={loading} />
            
            {/* Indicador de scroll 
            <div className="hidden lg:block absolute -left-8 top-1/2 -translate-y-1/2">
              <div className="text-xs text-gray-500 rotate-90 tracking-widest whitespace-nowrap">
                DESLIZAR PARA VER MÁS
              </div>
            </div>
            
            <div className="hidden lg:block absolute -right-8 top-1/2 -translate-y-1/2">
              <div className="text-xs text-gray-500 rotate-90 tracking-widest">→</div>
            </div>*/}
          </div>
        </div>

        {/* CTA inferior */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-16 md:mt-20"
        >
          <div className="inline-flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-r from-gray-900/50 to-black/50 backdrop-blur-sm border border-gray-800/50">
            <FiClock className="w-5 h-5 text-cyan-400 animate-pulse" />
            <p className="text-gray-300 text-sm md:text-base">
              <span className="text-white font-semibold">¡Atención!</span> Estas
              ofertas son por tiempo limitado
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
