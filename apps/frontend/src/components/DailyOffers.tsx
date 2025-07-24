import Button from "./Button";
import { OfferCard } from "./OfferCard";

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
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          Ofertas del día
        </h2>
        <p className="text-lg text-gray-600">
          Explora productos a buen precio por tiempo limitado
        </p>
        <Button
          variant="secondary"
          size="default"
          className="mt-4"
        >
          Ver todas las ofertas
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {OFFERS.map((offer) => (
          <OfferCard key={offer.id} offer={offer} />
        ))}
      </div>
    </section>
  );
}
