"use client";
import { useEffect, useRef, useState } from "react";
import { SwiperSlide } from "swiper/react";
import "swiper/css";
import type SwiperCore from "swiper";
import { BaseSwiper } from "./ui/BaseSwiper";
import { ReviewCard, Review } from "./ui/ReviewCard";
import { fetchFeaturedReviews } from "@/services/reviews";

export function CustomerReviews() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const swiperRef = useRef<SwiperCore | null>(null);

  const handleSwiperInit = (swiperInstance: SwiperCore) => {
    swiperRef.current = swiperInstance;
  };

  useEffect(() => {
    async function fetchReviews() {
      try {
        const data = await fetchFeaturedReviews();
        setReviews(data);
      } catch (err) {
        console.error("Error fetching reviews:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchReviews();
  }, []);

  return (
    <section className="CustomerReview-bg">
      <div className="bg-transparent container mx-auto px-4 sm:px-6 pb-16">
        <div className="container mx-auto px-0 sm:px-4">
          <div className="relative">
            {loading ? (
              <p className="TextColor text-center">Cargando reseñas...</p>
            ) : reviews.length === 0 ? (
              <p className="TextColor text-center">
                No hay reseñas todavía.
              </p>
            ) : (
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
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
