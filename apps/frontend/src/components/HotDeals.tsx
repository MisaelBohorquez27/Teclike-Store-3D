import { DealCard } from '@/components/DealCard';

const HOT_DEALS = [
  {
    id: 101,
    name: "Silla Ergonómica Premium",
    originalPrice: 199.99,
    discountPrice: 149.99,
    discount: 25,
    image: "/deals/ergonomic-chair.jpg"
  },
  // Añadir más ofertas...
];

export function HotDeals() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {HOT_DEALS.map((deal) => (
        <DealCard key={deal.id} deal={deal} />
      ))}
    </div>
  );
}