import type SwiperCore from "swiper";

// Tipos de las reviews de los clientes.
export type Review = {
  date: string;
  user: any;
  id: number;
  name: string;
  product: string;
  comment: string;
  rating: number;
  avatar: string;
};

export interface ProductReviewsProps {
  reviews: Review[];
}
export interface UseReviewsReturn extends ProductReviewsProps {
  loading: boolean;
  swiperRef: React.MutableRefObject<SwiperCore | null>;
  handleSwiperInit: (swiperInstance: SwiperCore) => void;
}