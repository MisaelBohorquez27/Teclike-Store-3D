'use client';

import { type Swiper } from 'swiper/types';

interface CarouselButtonsProps {
  swiper: Swiper | null;
  className?: string;
}

export default function CarouselButtons({ swiper, className = '' }: CarouselButtonsProps) {
  const prevSlide = () => {
    if (!swiper) return null;
    swiper?.slidePrev();
  };

  const nextSlide = () => {
    if (!swiper) return null;
    swiper?.slideNext();
  };

  return (
    <>
      <button
        onClick={prevSlide}
        aria-label="Anterior"
        className={`hidden md:flex absolute left-1 md:left-3 lg:left-6 top-1/2 -translate-y-1/2 Button-bg TextColor2 p-1.5 md:p-2 lg:p-2.5 rounded-full shadow-md z-10 hover:scale-110 transition-transform duration-200 ${className}`}
      >
        <svg width="24" height="24" fill="none" viewBox="0 0 24 24" className="w-5 h-5 md:w-6 md:h-6">
          <path
            d="M15 19l-7-7 7-7"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <button
        onClick={nextSlide}
        aria-label="Siguiente"
        className={`hidden md:flex absolute right-1 md:right-3 lg:right-6 top-1/2 -translate-y-1/2 Button-bg TextColor2 p-1.5 md:p-2 lg:p-2.5 rounded-full shadow-md z-10 hover:scale-110 transition-transform duration-200 ${className}`}
      >
        <svg width="24" height="24" fill="none" viewBox="0 0 24 24" className="w-5 h-5 md:w-6 md:h-6">
          <path
            d="M9 5l7 7-7 7"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </>
  );
}
