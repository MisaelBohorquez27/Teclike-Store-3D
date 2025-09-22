import Link from "next/link";
import Button from "@/components/ui/PagesButtons";
import { CustomSwiper } from "../ui/CustomSwiper";
import { OfferCard } from "./OfferCard";
import { ProductForCard } from "@/types/productss";

interface DailyOffersContentProps {
  offers: ProductForCard[];
  loading: boolean;
}

export const DailyOffersContent = ({ offers, loading }: DailyOffersContentProps) => {
  return (
    <>
      {/* Texto */}
      <div className="text-center mb-8 lg:mb-0 lg:max-w-md lg:pr-6 xl:pr-12 lg:w-1/3">
        <h2 className="TitleColor2 text-4xl md:text-5xl lg:text-6xl font-bold mb-2 lg:mb-3">
          Ofertas del día
        </h2>
        <p className="SubtitleColor2 text-base md:text-lg px-2 md:px-0">
          Explora productos a buen precio por tiempo limitado
        </p>
        <Link href="/DailyOffers" className="inline-block mt-4 md:mt-5">
          <Button variant="dark" size="m">
            Ver todas las ofertas
          </Button>
        </Link>
      </div>

      {/* Swiper */}
      <div className="relative w-full lg:w-2/3">
        {loading ? (
          <p className="text-center text-gray-500">Cargando ofertas...</p>
        ) : offers.length === 0 ? (
          <p className="text-center text-gray-500">No hay ofertas disponibles</p>
        ) : (
          <CustomSwiper
            items={offers}
            renderItem={(product) => <OfferCard product={product} />}
            breakpoints={{
              0: { slidesPerView: 1.2, spaceBetween: 10 },
              480: { slidesPerView: 2, spaceBetween: 16 },
              640: { slidesPerView: 2.7, spaceBetween: 20 },
              1024: { slidesPerView: 3, spaceBetween: 24 },
            }}
            className="pb-8 sm:pb-10 md:pb-12"
            speed={400}
          />
        )}
      </div>
    </>
  );
};