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
    <section className="bg-white pb-16">
      <div className="container mx-auto px-4">
        {/* <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Lo que dicen Nuestros Clientes
          </h2>
        </div> */}

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
              768: { slidesPerView: 1 },
              1024: { slidesPerView: 1 },
            }}
            className="pb-14"
          >
            {REVIEWS.map((review) => (
              <SwiperSlide key={review.id}>
                <div className="p-6 h-full text-center">
                  <div className="border-l-2 border-gray-300 pl-6 h-full">
                    <h3 className="text-2xl font-stretch-extra-expanded font-semibold text-gray-900 mb-6">
                      {review.product.toUpperCase()}
                    </h3>
                    <blockquote className="text-gray-600 mb-4 italic text-lg">
                      "{review.comment}"
                    </blockquote>
                    <div className="mb-4 mx-auto">
                      {[...Array(5)].map((_, i) => (
                        <span
                          key={i}
                          className={`text-xl ${
                            i < review.rating
                              ? "text-yellow-600"
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
                        className="w-10 h-10 rounded-full mx-auto"
                        loading="lazy"
                      />
                      <span className="font-medium text-gray-800 mx-auto">
                        {review.name}
                      </span>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          {/*{swiperReady && (
            <CarouselIndicators
              items={REVIEWS}
              currentIndex={currentIndex}
              onIndicatorClick={goToSlide}
            />
          )} */}
        </div>
      </div>
    </section>
  );
}
