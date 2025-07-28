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
    <section className="container mx-auto px-4 py-16">
      <div className="rounded-xl px-8 bg-[#182d5c] bg-opacity-10 backdrop-blur-md shadow-lg py-14 h-full flex items-center justify-center">
        <div className="text-center mb-6 md:w-1/3 pr-6">
          <h2 className="text-6xl font-bold text-[#efefef] mb-2">
            Ofertas del día
          </h2>
          <p className="text-lg text-white px-4">
            Explora productos a buen precio por tiempo limitado
          </p>
          <Link href="/DailyOffers" className="inline-block">
            <Button variant="secondary" size="default" className="mt-5">
              Ver todas las ofertas
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2/3">
          {OFFERS.map((offer) => (
            <OfferCard key={offer.id} offer={offer} />
          ))}
        </div>
      </div>
    </section>
  );
}
