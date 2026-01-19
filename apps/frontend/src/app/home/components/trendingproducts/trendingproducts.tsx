"use client";

import { useTrendingProducts } from "@/hooks/usetrendingproducts";
import { TrendingProductCard } from "./components/trendingproductscard";
import { CustomSwiper } from "@/components/swipper/customswiper";
import { motion } from "framer-motion";
import { FiArchive, FiCode, FiSpeaker, FiTrendingUp } from "react-icons/fi";
import Link from "next/dist/client/link";
import Button from "@/components/common/pagesbuttons";

export function TrendingProducts() {
  const { products, loading } = useTrendingProducts();

  if (loading) {
    return (
      <div className="bg-gray-950 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-500 mb-4"></div>
            <p className="text-gray-400">Cargando productos destacados...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <section
      id="trending-section"
      className="bg-gray-950 text-gray-200 relative py-16 md:py-20 overflow-hidden"
    >
      {/* Efectos de fondo */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-cyan-500/20 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-linear-to-r from-transparent via-purple-500/20 to-transparent" />

        {/* Efectos de partículas */}
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="absolute w-64 h-64 rounded-full bg-linear-to-r from-cyan-500/5 to-blue-500/5 blur-3xl"
            style={{
              top: `${20 + i * 30}%`,
              left: `${i * 40}%`,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Encabezado moderno */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 md:mb-12 lg:mb-16"
        >
          {/*  
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-linear-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 mb-6">
            <FiTrendingUp className="w-4 h-4 text-cyan-400" />
            <span className="text-cyan-300 text-sm font-medium">TENDENCIA</span>
          </div>*/}

          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold mb-4 md:mb-6">
            <span className="bg-linear-to-r from-cyan-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Destacados&nbsp;
            </span>
            <span className="text-white">del Momento</span>
          </h2>

          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-400 max-w-2xl mx-auto">
            Los productos más populares y mejor valorados por nuestra comunidad
          </p>
        </motion.div>

        {/* Swiper mejorado */}
        <CustomSwiper
          items={products}
          spaceBetween={24}
          breakpoints={{
            0: {
              slidesPerView: 1.2,
              spaceBetween: 12,
              slidesPerGroup: 1,
            },
            480: {
              slidesPerView: 1.8,
              spaceBetween: 16,
              slidesPerGroup: 1,
            },
            640: {
              slidesPerView: 2.5,
              spaceBetween: 20,
              slidesPerGroup: 2,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 24,
              slidesPerGroup: 3,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 28,
              slidesPerGroup: 4,
            },
          }}
          className="pb-8 md:pb-12"
          speed={600}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          renderItem={(product) => <TrendingProductCard product={product} />}
        />

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-center mt-12 md:mt-16"
        >
          <Link href="/products">
            <Button className="group px-6 md:px-8 py-3 md:py-4 text-sm md:text-base bg-linear-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-semibold rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-cyan-500/20 inline-flex items-center gap-3">
              <span>Ver Todos los Productos</span>
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
