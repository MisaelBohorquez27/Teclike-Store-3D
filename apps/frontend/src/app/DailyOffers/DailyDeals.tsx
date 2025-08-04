import { DealCard } from '@/app/DailyOffers/DealCard';

const FLASH_DEALS = [
  {
    id: 1,
    name: "Paquete de Muebles Modernos",
    originalPrice: 120.99,
    discountPrice: 79.99,
    discount: 34,
    image: "/deals/furniture-pack.jpg",
    sold: 45,
    total: 100,
    timeLeft: 3 // horas
  },
   {
    id: 2,
    name: "Paquete de Muebles Modernos",
    originalPrice: 120.99,
    discountPrice: 79.99,
    discount: 34,
    image: "/deals/furniture-pack.jpg",
    sold: 45,
    total: 100,
    timeLeft: 3 // horas
  },
   {
    id: 3,
    name: "Paquete de Muebles Modernos",
    originalPrice: 120.99,
    discountPrice: 79.99,
    discount: 34,
    image: "/deals/furniture-pack.jpg",
    sold: 45,
    total: 100,
    timeLeft: 3 // horas
  },
   {
    id: 4,
    name: "Paquete de Muebles Modernos",
    originalPrice: 120.99,
    discountPrice: 79.99,
    discount: 34,
    image: "/deals/furniture-pack.jpg",
    sold: 45,
    total: 100,
    timeLeft: 3 // horas
  },
   {
    id: 5,
    name: "Paquete de Muebles Modernos",
    originalPrice: 120.99,
    discountPrice: 79.99,
    discount: 34,
    image: "/deals/furniture-pack.jpg",
    sold: 45,
    total: 100,
    timeLeft: 3 // horas
  },
  // Añadir más ofertas...
];

export function DailyDeals() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {FLASH_DEALS.map((deal) => (
        <DealCard key={deal.id} deal={deal} isFlashDeal />
      ))}
    </div>
  );
}