"use client";
import type SwiperCore from "swiper";
import { Review, UseReviewsReturn, } from "@/types/review";
import { useEffect, useRef, useState } from "react";
import { fetchFeaturedReviews } from "@/services/reviews";

export function useReviews(): UseReviewsReturn {
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

  return {
    reviews,
    loading,
    swiperRef,
    handleSwiperInit
  };
}