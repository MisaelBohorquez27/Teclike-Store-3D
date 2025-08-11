"use client";
import { useRef, useState } from "react";
import { BestProductsSellers } from "./BestProductsSellers";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { motion } from "framer-motion";
import "swiper/css";
import CarouselButtons from "./ui/CarouselButtons";
import { CarouselIndicators } from "./ui/CarouselIndicators";

const BEST_SELLERS = [
  {
    id: 1,
    title: "Mouse X11",
    tagline: "See the difference. Literally.",
    description: "Now with enhanced display features.",
    features: [
      "Glare-free display",
      "Adjustable front light",
      "Weeks of battery life",
    ],
    fullDescription:
      "Amazon Kindle 16 GB (newest model) - Lightest and most compact Kindle, now with faster page turns...",
    priceRange: { min: 155, max: 186 },
    currency: "US$",
  },
  {
    id: 2,
    title: "COLLAGEN",
    description: "Now with enhanced display features.",
    tagline: "SILENT FACEBOOK MARK OVER TASTE",
    features: ["Sugar free", "Monohydrate for Women"],
    stats: ["50", "26", "19", "30"],
    times: ["(1/2) 20:00 AM", "(4/3) 21:00 AM"],
    fullDescription:
      "Monohidrato de creatina en polvo 5000 mg de Old School Labs, creatina optimizada para mujeres...",
    priceRange: { min: 52, max: 62 },
    currency: "US$",
  },
];

export function BestSellersWeek() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [swiperReady, setSwiperReady] = useState(false);
  const swiperRef = useRef<SwiperCore | null>(null);

  const goToSlide = (index: number) => {
    if (swiperRef.current) {
      swiperRef.current.slideTo(index);
    }
  };

  const handleSwiperInit = (swiperInstance: SwiperCore) => {
    swiperRef.current = swiperInstance;
    setSwiperReady(true);
  };

  return (
   <section className="BestSellersWeek-bg py-8 md:py-16">
  <div className="container mx-auto px-4 sm:px-6">
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 md:mb-8 gap-4 sm:gap-0">
      <h2 className="TitleColor text-2xl sm:text-3xl font-bold">
        Más vendido de la semana
      </h2>
      <button className="text-blue-600 hover:text-blue-800 font-medium text-base sm:text-lg">
        Ver todos los productos →
      </button>
    </div>

    {/* Carrusel */}
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative overflow-hidden">
        {swiperReady && <CarouselButtons swiper={swiperRef.current} />}
        
        <Swiper
          spaceBetween={20}
          slidesPerView={1}
          breakpoints={{
            640: {
              spaceBetween: 25,
              slidesPerView: 1
            },
            768: {
              spaceBetween: 30,
              slidesPerView: 1
            },
            1024: {
              spaceBetween: 40,
              slidesPerView: 1
            }
          }}
          speed={400}
          effect="fade"
          fadeEffect={{ crossFade: true }}
          onSlideChange={(swiper) => setCurrentIndex(swiper.activeIndex)}
          onSwiper={handleSwiperInit}
        >
          {BEST_SELLERS.map((product) => (
            <SwiperSlide key={product.id}>
              <BestProductsSellers product={product} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </motion.div>

    <CarouselIndicators
      items={BEST_SELLERS}
      currentIndex={currentIndex}
      onIndicatorClick={goToSlide}
      className="mt-4 md:mt-6"
    />
  </div>
</section>
  );
}
