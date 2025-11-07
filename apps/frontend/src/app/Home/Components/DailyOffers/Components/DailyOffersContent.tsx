import Link from "next/link";
import Button from "@/components/PagesButtons";
import { CustomSwiper } from "@/components/Swipper/CustomSwiper";
import { OfferCard } from "./OfferCard";
import { CONFIG } from "../Data/DailyOffersData";
import { useDailyOffers } from "../Hooks/useDailyOffer";
import { ProductWithOffer } from "@/types/offers";

// Types
interface DailyOffersContentProps {
  offers: ProductWithOffer[];
  loading: boolean;
}

// Subcomponents
const DailyOffersHeader = () => (
  <div className="text-center mb-8 lg:mb-0 lg:max-w-md lg:pr-6 xl:pr-12 lg:w-1/3">
    <h2 className="TitleColor2 text-4xl md:text-5xl lg:text-6xl font-bold mb-2 lg:mb-3">
      {CONFIG.content.title}
    </h2>
    <p className="SubtitleColor2 text-base md:text-lg px-2 md:px-0">
      {CONFIG.content.description}
    </p>
    <Link href={CONFIG.content.buttonHref} className="inline-block mt-4 md:mt-5">
      <Button variant="dark" size="m">
        {CONFIG.content.buttonText}
      </Button>
    </Link>
  </div>
);

const OffersSwiper = ({ offers }: { offers: ProductWithOffer[] }) => (
  <CustomSwiper
    items={offers}
    renderItem={(product) => <OfferCard product={product} />}
    breakpoints={CONFIG.swiper.breakpoints}
    className={CONFIG.swiper.className}
    speed={CONFIG.swiper.speed}
  />
);

const SwiperContent = ({ offers, loading }: DailyOffersContentProps) => {
  const { hasOffers, isEmpty, isLoading } = useDailyOffers(offers, loading);

  if (isLoading) {
    return <p className="text-center text-gray-500">{CONFIG.content.loadingText}</p>;
  }

  if (isEmpty) {
    return <p className="text-center text-gray-500">{CONFIG.content.emptyText}</p>;
  }

  if (hasOffers) {
    return <OffersSwiper offers={offers} />;
  }

  return null;
};

// Main Component
export const DailyOffersContent = ({ offers, loading }: DailyOffersContentProps) => {
  return (
    <>
      <DailyOffersHeader />
      <div className="relative w-full lg:w-2/3">
        <SwiperContent offers={offers} loading={loading} />
      </div>
    </>
  );
};