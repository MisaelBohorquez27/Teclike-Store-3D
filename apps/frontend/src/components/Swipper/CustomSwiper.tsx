import { Swiper, SwiperSlide, SwiperProps } from "swiper/react";
import { Navigation } from "swiper/modules";
import { ReactNode, useRef, useState } from "react";
import SwiperCore from "swiper";
import CarouselButtons from "@/components/ui/CarouselButtons";
import { CarouselIndicators } from "@/components/ui/CarouselIndicators";
import "swiper/css";

interface CustomSwiperProps<T>
  extends Omit<SwiperProps, "children" | "onSlideChange"> {
  items: T[];
  renderItem: (item: T) => ReactNode;
  breakpoints?: {
    [width: number]: SwiperProps;
  };
  withIndicators?: boolean;
  onSlideChange?: (index: number) => void;
  slidesPerGroup?: number; // Nuevo prop
}

export function CustomSwiper<T>({
  items,
  renderItem,
  slidesPerView = 1,
  breakpoints,
  withIndicators = false,
  onSlideChange,
  slidesPerGroup = 1,
  ...props
}: CustomSwiperProps<T>) {
  const [swiperReady, setSwiperReady] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const swiperRef = useRef<SwiperCore | null>(null);

  const handleSwiperInit = (swiper: SwiperCore) => {
    swiperRef.current = swiper;
    setSwiperReady(true);
  };

  const handleSlideChange = (swiper: SwiperCore) => {
    setCurrentIndex(swiper.activeIndex);
    onSlideChange?.(swiper.activeIndex);
  };

  return (
    <div className="relative">
      {swiperReady && <CarouselButtons swiper={swiperRef.current} />}
      <Swiper
        modules={[Navigation]}
        slidesPerGroup={slidesPerGroup}
        spaceBetween={16}
        slidesPerView={slidesPerView}
        breakpoints={breakpoints}
        className="pb-8 sm:pb-10 md:pb-12"
        onSwiper={handleSwiperInit}
        onSlideChange={handleSlideChange}
        {...props}
      >
        {items.map((item, index) => (
          <SwiperSlide key={index} className="h-auto">
            {renderItem(item)}
          </SwiperSlide>
        ))}
      </Swiper>
      {withIndicators && (
        <CarouselIndicators
          items={items}
          currentIndex={currentIndex}
          onIndicatorClick={(index) => swiperRef.current?.slideTo(index)}
          className="mt-4 md:mt-6"
        />
      )}
    </div>
  );
}
