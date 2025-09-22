import type SwiperCore from "swiper";

// Tipos de las reviews de los clientes.
export type Review = {
  id: number;
  name: string;
  product: string;
  comment: string;
  rating: number;
  avatar: string;
};

export interface UseReviewsReturn {
  reviews: Review[];
  loading: boolean;
  swiperRef: React.MutableRefObject<SwiperCore | null>;
  handleSwiperInit: (swiperInstance: SwiperCore) => void;
}