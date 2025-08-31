"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import "swiper/css";
import Button from "@/components/ui/PagesButtons";
import { OfferCard } from "@/components/OfferCard";
import { CustomSwiper } from "./ui/CustomSwiper";
import { Offer } from "./OfferCard";
import { fetchFeaturedOffers } from "@/services/offers";

//Podria corregirse en el futuro
export function DailyOffers() {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchOffers() {
      try {
        const data = await fetchFeaturedOffers();
        setOffers(data);
      } catch (err) {
        console.error("❌ Error fetching offers:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchOffers();
  }, []);

  return (
    <section className="DailyOffers-bg">
      <div className="bg-transparent container mx-auto px-4 py-8 md:py-16">
        <div className="DailyOffers-bg2 w-full rounded-xl px-4 md:px-8 bg-opacity-10 backdrop-blur-md shadow-lg py-8 md:py-12 h-full flex flex-col lg:flex-row items-center justify-center lg:justify-between">
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
                renderItem={(offer) => <OfferCard offer={offer} />}
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
        </div>
      </div>
    </section>
  );
}
