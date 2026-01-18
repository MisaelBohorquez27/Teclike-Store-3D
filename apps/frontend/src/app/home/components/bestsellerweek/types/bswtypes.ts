// Types
export interface CartListProps {
  onAddToCart: (
    productId: number, 
    quantity: number) => Promise<void>;
}

export interface SwiperBreakpoints {
  [key: number]: {
    slidesPerView: number;
    spaceBetween: number;
  };
}
