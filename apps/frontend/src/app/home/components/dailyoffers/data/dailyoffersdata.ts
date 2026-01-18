// Constants
export const CONFIG = {
  content: {
    title: "Ofertas del día",
    description: "Explora productos a buen precio por tiempo limitado",
    buttonText: "Ver todas las ofertas",
    buttonHref: "/DailyOffers",
    loadingText: "Cargando ofertas...",
    emptyText: "No hay ofertas disponibles",
  },
  swiper: {
    breakpoints: {
      0: { slidesPerView: 1.2, spaceBetween: 10 },
      480: { slidesPerView: 2, spaceBetween: 16 },
      640: { slidesPerView: 2.7, spaceBetween: 20 },
      1024: { slidesPerView: 3, spaceBetween: 24 },
    } as const,
    className: "pb-8 sm:pb-10 md:pb-12",
    speed: 400,
  },
} as const;