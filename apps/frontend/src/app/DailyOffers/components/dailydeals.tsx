"use client";

import { DealCard } from "@/app/DailyOffers/components/dealcard";
import { useDailyOffers } from "@/hooks/useDailyOffers";

export function DailyDeals() {
  const {offers, loading} = useDailyOffers();

  if (loading) {
    return <p className="text-center">Cargando ofertas diarias...</p>;
  }

  if (offers.length === 0) {
    return <p className="text-center">No hay ofertas diarias disponibles</p>;
  }

  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
      {offers.map((offer, index) => (
        <DealCard key={`${offer.id}-${index}`} offer={offer} />
      ))}
    </div>
  );
}
