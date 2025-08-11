import Link from "next/link";
import Button from "@/components/ui/PagesButtons";
import { OfferCard } from "@/components/OfferCard";

const OFFERS = [
  {
    id: 1,
    title: "Paquete de Muebles Modernos",
    description: "Set completo para sala de estar",
    rating: 4.5,
    discount: "30% OFF",
    price: "$89.99",
  },
  {
    id: 2,
    title: "Smartphone Premium",
    description: "Último modelo con cámara profesional",
    rating: 4.5,
    discount: "30% OFF",
    price: "$699.99",
  },
  {
    id: 3,
    title: "Zapatos Deportivos",
    description: "Tecnología de amortiguación avanzada",
    rating: 4.2,
    discount: "25% OFF",
    price: "$59.99",
  },
];

export function DailyOffers() {
  return (
    <section className="DailyOffers-bg">
      <div className="bg-transparent container mx-auto px-4 py-8 md:py-16">
        <div className="DailyOffers-bg2 rounded-xl px-4 md:px-8 bg-opacity-10 backdrop-blur-md shadow-lg py-8 md:py-12 h-full flex flex-col lg:flex-row items-center justify-center">
          {/* Texto y botón */}
          <div className="text-center mb-8 lg:mb-0 lg:w-full lg:max-w-md lg:pr-6 xl:pr-12 w-full">
            <h2 className="TitleColor2 text-4xl sm:text-5xl md:text-6xl font-bold mb-2">
              Ofertas del día
            </h2>
            <p className="SubtitleColor2 text-base md:text-lg px-2 md:px-4">
              Explora productos a buen precio por tiempo limitado
            </p>
            <Link href="/DailyOffers" className="inline-block mt-4 md:mt-5">
              <Button variant="secondary" size="m">
                Ver todas las ofertas
              </Button>
            </Link>
          </div>

          {/* Grid de ofertas */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 w-full lg:w-auto lg:flex-1">
            {OFFERS.map((offer) => (
              <OfferCard key={offer.id} offer={offer} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
