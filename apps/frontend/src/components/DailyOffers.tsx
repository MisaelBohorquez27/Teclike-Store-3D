"use client";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { useRef, useState } from "react";
import type SwiperCore from "swiper";
import "swiper/css";
import Button from "@/components/ui/PagesButtons";
import { OfferCard } from "@/components/OfferCard";
import { Navigation } from "swiper/modules";
import CarouselButtons from "./ui/CarouselButtons";

const OFFERS = [
  {
    id: 1,
    title: "Audifonos Razer",
    name: "Audifonos Razer",
    rating: 4.5,
    discount: "30% OFF",
    image: "/products/Audifonos-caja.png",
    price: "$89.99",
  },
  {
    id: 2,
    title: "Smartphone",
    name: "Smartphone",
    rating: 4.5,
    discount: "30% OFF",
    image: "/products/Audifonos-caja.png",
    price: "$699.99",
  },
  {
    id: 3,
    title: "Zapatos Deportivos",
    name: "Zapatos Deportivos",
    rating: 4.2,
    discount: "25% OFF",
    image: "/products/Audifonos-caja.png",
    price: "$59.99",
  },
  {
    id: 4,
    title: "Zapatos Deportivos",
    name: "Zapatos Deportivos",
    rating: 4.2,
    discount: "25% OFF",
    image: "/products/Audifonos-caja.png",
    price: "$59.99",
  },
  {
    id: 5,
    title: "Zapatos Deportivos",
    name: "Zapatos Deportivos",
    rating: 4.2,
    discount: "25% OFF",
    image: "/products/Audifonos-caja.png",
    price: "$59.99",
  },
];

export function DailyOffers() {
  const [swiperReady, setSwiperReady] = useState(false);
  const swiperRef = useRef<SwiperCore | null>(null);

  const handleSwiperInit = (swiperInstance: SwiperCore) => {
    swiperRef.current = swiperInstance;
    setSwiperReady(true);
  };

  return (
    <section className="DailyOffers-bg">
      <div className="bg-transparent container mx-auto px-4 py-8 md:py-16">
        {/* Contenedor principal: en móvil columna, en desktop fila */}
        <div className="DailyOffers-bg2 w-full rounded-xl px-4 md:px-8 bg-opacity-10 backdrop-blur-md shadow-lg py-8 md:py-12 h-full flex flex-col lg:flex-row items-center justify-center lg:justify-between">
          {/* Texto y botón: en móvil ocupa todo el ancho, en desktop 1/3 */}
          <div className="text-center mb-8 lg:mb-0 lg:w-full lg:max-w-md lg:pr-6 xl:pr-12">
            <h2 className="TitleColor2 text-4xl md:text-5xl lg:text-6xl font-bold mb-2 lg:mb-3">
              Ofertas del día
            </h2>
            <p className="SubtitleColor2 text-base md:text-lg px-2 md:px-0">
              Explora productos a buen precio por tiempo limitado
            </p>
            <Link href="/DailyOffers" className="inline-block mt-4 md:mt-5">
              <Button variant="secondary" size="m">
                Ver todas las ofertas
              </Button>
            </Link>
          </div>
          {/* Swiper de ofertas: en móvil ancho completo, en desktop 2/3 */}
          <div className="relative w-full lg:w-2/3 lg:max-w-2xl">
            <Swiper
              modules={[Navigation]}
              spaceBetween={16}
              slidesPerView={1}
              navigation={swiperReady}
              breakpoints={{
                0: { slidesPerView: 1.2, spaceBetween: 10 },
                480: { slidesPerView: 2, spaceBetween: 16 },
                640: { slidesPerView: 2.7, spaceBetween: 20 },
                1024: { slidesPerView: 3, spaceBetween: 24 },
              }}
              className="pb-8 sm:pb-10 md:pb-12"
              onSwiper={handleSwiperInit}
            >
              {OFFERS.map((product) => (
                <SwiperSlide key={product.id} className="h-auto">
                  <OfferCard offer={product} />
                </SwiperSlide>
              ))}
            </Swiper>
            {/* Botones de navegación */}
            {swiperReady && (
              <div className="absolute top-1/2 left-0 right-0 transform -translate-y-1/2 flex justify-between z-10 px-2">
                <CarouselButtons swiper={swiperRef.current} />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
