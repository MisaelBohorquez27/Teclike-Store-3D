"use client";
import "swiper/css";
import { SwiperSlide } from "swiper/react";
import { BaseSwiper } from "../ui/BaseSwiper";
import { ReviewCard } from "./ReviewCard";
import { useReviews } from "@/hooks/useReviews";

export function CustomerReviews() {
  const { reviews, loading, handleSwiperInit } = useReviews();

  if (loading) {
    return (
      <section className="CustomerReview-bg">
        <div className="bg-transparent container mx-auto px-4 sm:px-6 pb-16">
          <div className="container mx-auto px-0 sm:px-4">
            <div className="relative">
              <p className="TextColor text-center">Cargando reseñas...</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (reviews.length === 0) {
    return (
      <section className="CustomerReview-bg">
        <div className="bg-transparent container mx-auto px-4 sm:px-6 pb-16">
          <div className="container mx-auto px-0 sm:px-4">
            <div className="relative">
              <p className="TextColor text-center">No hay reseñas todavía.</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

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
              onSwiper={handleSwiperInit}
              className="pb-10 sm:pb-14"
            >
              {reviews.map((review) => (
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