"use client";
import {SwiperSlide } from "swiper/react";
import "swiper/css";
import { useRef, useState } from "react";
import type SwiperCore from "swiper";
import { BaseSwiper } from "./ui/BaseSwiper";
import ReviewCard from "./ui/ReviewCard";

const REVIEWS = [
  {
    id: 1,
    name: "María Fernández",
    product: "Teclado Z11 RGB",
    comment:
      "Más de lo esperado. Calidad excepcional y detalles perfectos. Definitivamente superó mis expectativas.",
    rating: 5,
    avatar: "https://example.com/avatar1.jpg",
  },
  {
    id: 2,
    name: "Carlos Mendoza",
    product: "Kit de limpieza",
    comment:
      "Increíblemente versátiles. Los modelos son flexibles y se adaptan perfectamente a mis diseños.",
    rating: 5,
    avatar: "https://example.com/avatar2.jpg",
  },
  {
    id: 3,
    name: "Ana Suárez",
    product: "Audifonos razer",
    comment:
      "La mejor relación calidad-precio. El modelo 3D era exactamente lo que necesitaba para mi proyecto.",
    rating: 5,
    avatar: "https://example.com/avatar3.jpg",
  },
];

export function CustomerReviews() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [swiperReady, setSwiperReady] = useState(false);
  const swiperRef = useRef<SwiperCore | null>(null);

  const handleSwiperInit = (swiperInstance: SwiperCore) => {
    swiperRef.current = swiperInstance;
    setSwiperReady(true);
  };

  return (
    <section className="CustomerReview-bg">
      <div className="bg-transparent container mx-auto px-4 sm:px-6 pb-16">
        <div className="container mx-auto px-0 sm:px-4">
          <div className="relative">
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
              onSlideChange={(swiper) => setCurrentIndex(swiper.activeIndex)}
              onSwiper={handleSwiperInit}
              className="pb-10 sm:pb-14"
            >
              {REVIEWS.map((review) => (
                <SwiperSlide key={review.id}>
                  <ReviewCard review={review} />
                </SwiperSlide>
              ))}
            </BaseSwiper>
          </div>
        </div>
      </div>
    </section>
  );
}
