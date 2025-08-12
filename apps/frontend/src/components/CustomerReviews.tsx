"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay, Pagination } from "swiper/modules";
import { CarouselIndicators } from "./ui/CarouselIndicators";
import { useRef, useState } from "react";
import type SwiperCore from "swiper";

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
    <section className="CustomerReview-bg">
      <div className="bg-transparent container mx-auto px-4 sm:px-6 pb-16">
        <div className="container mx-auto px-0 sm:px-4">
          <div className="relative">
            <Swiper
              modules={[Autoplay]}
              spaceBetween={30}
              slidesPerView={1}
              autoplay={{
                delay: 3100,
                disableOnInteraction: false,
              }}
              speed={850}
              onSlideChange={(swiper) => setCurrentIndex(swiper.activeIndex)}
              onSwiper={handleSwiperInit}
              breakpoints={{
                640: { slidesPerView: 1, spaceBetween: 20 },
                768: { slidesPerView: 1, spaceBetween: 25 },
                1024: { slidesPerView: 1, spaceBetween: 30 },
              }}
              className="pb-10 sm:pb-14"
            >
              {REVIEWS.map((review) => (
                <SwiperSlide key={review.id}>
                  <div className="p-4 sm:p-6 h-full text-center">
                    <div className="border-l-2 border-gray-300 pl-6 sm:pl-12 h-full pr-4 sm:pr-6">
                      <h3 className="TitleColor text-xl sm:text-2xl font-stretch-extra-expanded font-semibold mb-4 sm:mb-6">
                        {review.product.toUpperCase()}
                      </h3>
                      <blockquote className="SubtitleColor mb-4 italic text-base sm:text-lg">
                        "{review.comment}"
                      </blockquote>
                      <div className="mb-4 mx-auto">
                        {[...Array(5)].map((_, i) => (
                          <span
                            key={i}
                            className={`text-lg sm:text-xl ${
                              i < review.rating
                                ? "text-green-600"
                                : "text-gray-300"
                            }`}
                          >
                            ★
                          </span>
                        ))}
                      </div>
                      <div>
                        <img
                          src={review.avatar}
                          alt={review.name}
                          className="w-8 h-8 sm:w-10 sm:h-10 rounded-full mx-auto"
                          loading="lazy"
                        />
                        <span className="font-medium text-gray-800 mx-auto text-sm sm:text-base">
                          {review.name}
                        </span>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
}
