// components/ui/BaseSwiper.tsx
"use client";
import { Swiper } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

type Variant = "reviews" | "gallery";

interface BaseSwiperProps {
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
  autoplay?: boolean;
  speed?: number;
  spaceBetween?: number;
  slidesPerView?: number | "auto";
  loop?: boolean;
  breakpoints?: any;
  onSlideChange?: (swiper: any) => void;
  onSwiper?: (swiper: any) => void;
}

export function BaseSwiper({
  children,
  variant = "reviews",
  className = "",
  autoplay = true,
  speed = 850,
  spaceBetween = 30,
  slidesPerView = 1,
  loop = false,
  breakpoints,
  onSlideChange,
  onSwiper,
}: BaseSwiperProps) {
  return (
    <Swiper
      modules={[Autoplay]}
      autoplay={
        autoplay
          ? {
              delay: variant === "gallery" ? 0 : 3100,
              disableOnInteraction: false,
            }
          : false
      }
      speed={speed}
      spaceBetween={spaceBetween}
      slidesPerView={slidesPerView}
      loop={loop}
      breakpoints={breakpoints}
      onSlideChange={onSlideChange}
      onSwiper={onSwiper}
      className={className}
    >
      {children}
    </Swiper>
  );
}
