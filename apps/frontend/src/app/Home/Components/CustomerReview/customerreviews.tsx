"use client";

import Image from "next/image";
import { SwiperSlide } from "swiper/react";
import { BaseSwiper } from "@/components/swipper/BaseSwiper";
import { ReviewCard } from "./Components/reviewcard";
import { useReviews } from "@/hooks/useReviews";
import { motion } from "framer-motion";
import {
  FiMessageSquare,
  FiStar,
  FiChevronLeft,
  FiChevronRight,
  FiUsers,
  FiHeart,
} from "react-icons/fi";

export function CustomerReviews() {
  const { reviews, loading, handleSwiperInit } = useReviews();

  // Calcular métricas de reseñas
  const averageRating =
    reviews.length > 0
      ? (
          reviews.reduce((acc, review) => acc + review.rating, 0) /
          reviews.length
        ).toFixed(1)
      : "0.0";

  const totalReviews = reviews.length;
  const fiveStarReviews = reviews.filter((r) => r.rating === 5).length;

  if (loading) {
    return (
      <section className="relative bg-gradient-to-br from-gray-950 via-black to-gray-950 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500 mb-4"></div>
            <p className="text-gray-400">
              Cargando experiencias de clientes...
            </p>
          </div>
        </div>
      </section>
    );
  }

  if (reviews.length === 0) {
    return (
      <section className="relative bg-gradient-to-br from-gray-950 via-black to-gray-950 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-md mx-auto">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
              <FiMessageSquare className="w-10 h-10 text-gray-600" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">
              Sé el primero en opinar
            </h3>
            <p className="text-gray-400 mb-6">
              Comparte tu experiencia y ayuda a otros clientes a decidir
            </p>
            <button className="px-6 py-3 bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-700 hover:to-gray-800 text-white font-medium rounded-xl transition-all border border-gray-800">
              Escribir Reseña
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="Reviews" className="relative overflow-hidden">
      {/* Efectos de fondo */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/ui/HeroBanner.png"
          alt="Fondo de reseñas"
          fill
          priority
          className="object-cover object-center"
        />
        {/* Overlay para contraste */}
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Efectos de luz opcionales */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl -z-0" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl -z-0" />

      <div className="relative z-10 py-20 md:py-28">
        <div className="container mx-auto px-4">
          {/* Header con métricas 
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Reseñas&nbsp;
              </span>
              <span className="text-gray-100">de clientes</span>
            </h2>

            <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto mb-10">
              Historias reales de personas que transformaron su experiencia con
              nuestros productos
            </p>

            {/* Métricas de reseñas 
            <motion.div
              className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <div className="p-4 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
                <div className="flex items-center justify-center gap-2 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <FiStar
                      key={i}
                      className="w-4 h-4 text-yellow-400 fill-yellow-400"
                    />
                  ))}
                </div>
                <div className="text-2xl font-bold text-white">
                  {averageRating}
                </div>
                <div className="text-xs text-gray-400">Rating Promedio</div>
              </div>

              <div className="p-4 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
                <FiMessageSquare className="w-6 h-6 text-cyan-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">
                  {totalReviews}
                </div>
                <div className="text-xs text-gray-400">Reseñas Totales</div>
              </div>

              <div className="p-4 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
                <FiUsers className="w-6 h-6 text-blue-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">
                  {fiveStarReviews}
                </div>
                <div className="text-xs text-gray-400">5 Estrellas</div>
              </div>

              <div className="p-4 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
                <FiHeart className="w-6 h-6 text-blue-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">96%</div>
                <div className="text-xs text-gray-400">Satisfacción</div>
              </div>
            </motion.div>
          </motion.div>*/}

          {/* Swiper de reseñas */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="relative"
          >
            <BaseSwiper
              variant="reviews"
              slidesPerView={1}
              spaceBetween={30}
              speed={850}
              autoplay
              breakpoints={{
                640: { slidesPerView: 1, spaceBetween: 20 },
                768: { slidesPerView: 1, spaceBetween: 25 },
                1024: { slidesPerView: 1, spaceBetween: 30 },
              }}
              onSwiper={handleSwiperInit}
              className="pb-10 sm:pb-14"
            >
              {reviews.map((review) => (
                <SwiperSlide key={review.id}>
                  <ReviewCard review={review} />
                </SwiperSlide>
              ))}
            </BaseSwiper>

            {/* Indicador de scroll para móvil */}
            <div className="lg:hidden text-center mt-8">
              <div className="text-xs text-gray-500 tracking-widest">
                DESLIZA PARA VER MÁS
              </div>
            </div>
          </motion.div>

          {/* CTA Section 
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-center mt-16"
          >
            <div className="max-w-2xl mx-auto">
              <div className="inline-flex flex-col items-center gap-6 p-8 rounded-3xl bg-gradient-to-r from-gray-900/50 to-black/50 backdrop-blur-sm border border-gray-800/50">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center">
                    <FiMessageSquare className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white">
                    ¿Listo para compartir tu experiencia?
                  </h3>
                </div>
                <p className="text-gray-400">
                  Tu opinión ayuda a otros clientes y nos permite mejorar cada
                  día
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button className="px-8 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-semibold rounded-xl transition-all hover:scale-105 hover:shadow-xl hover:shadow-cyan-500/20">
                    Escribir Reseña
                  </button>
                  <button className="px-8 py-3 bg-gray-900 hover:bg-gray-800 border border-gray-800 hover:border-gray-700 text-white font-semibold rounded-xl transition-all">
                    Ver Todas las Reseñas
                  </button>
                </div>
              </div>
            </div>
          </motion.div> */}
        </div>
      </div>
    </section>
  );
}
