"use client";

import Image from "next/image";
import { SwiperSlide } from "swiper/react";
import { BaseSwiper } from "@/components/swipper/baseswiper";
import { ReviewCard } from "./components/reviewcard";
import { useReviews } from "@/hooks/usereviews";
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
      <section className="relative bg-linear-to-br from-gray-950 via-black to-gray-950 py-20">
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
      <section className="relative bg-linear-to-br from-gray-950 via-black to-gray-950 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-md mx-auto">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-linear-to-br from-gray-800 to-gray-900 flex items-center justify-center">
              <FiMessageSquare className="w-10 h-10 text-gray-600" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">
              Sé el primero en opinar
            </h3>
            <p className="text-gray-400 mb-6">
              Comparte tu experiencia y ayuda a otros clientes a decidir
            </p>
            <button className="px-6 py-3 bg-linear-to-r from-gray-800 to-gray-900 hover:from-gray-700 hover:to-gray-800 text-white font-medium rounded-xl transition-all border border-gray-800">
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
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl z-0" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl z-0" />

      <div className="relative z-10 py-20 md:py-28">
        <div className="container mx-auto px-4">
          
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
        </div>
      </div>
    </section>
  );
}
