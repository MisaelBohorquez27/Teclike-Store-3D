import { SwiperBreakpoints } from "../Types/BSWTypes";

// Constants
export const SWIPER_CONFIG = {
  breakpoints: {
    640: { spaceBetween: 25, slidesPerView: 1 },
    768: { spaceBetween: 30, slidesPerView: 1 },
    1024: { spaceBetween: 40, slidesPerView: 1 },
  } as SwiperBreakpoints,
  speed: 400,
  effect: "fade" as const,
  fadeEffect: { crossFade: true },
  withIndicators: true,
  className: "relative overflow-hidden",
} as const;

export const CONTENT = {
  title: "Más vendido de la semana",
  viewAllText: "Ver todos los productos",
  viewAllHref: "/Products",
  emptyText: "No hay productos vendidos esta semana.",
} as const;

// Animation variants
export const fadeInAnimation = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.5 },
};