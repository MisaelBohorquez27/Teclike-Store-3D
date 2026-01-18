"use client";

import { DealCard } from "@/app/DailyOffers/components/dealcard";
import { fetchDeals } from "@/services/deals";
import { useEffect, useState } from "react";
import { ProductWithOffer } from "@/types/offers";

export function HotDeals() {
  const [deals, setDeals] = useState<ProductWithOffer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDeals()
      .then((data) => setDeals(data))
      .catch((err) => console.error("❌ Error cargando ofertas:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <p className="text-center">Cargando productos...</p>;
  }

  if (deals.length === 0) {
    return <p className="text-center">No hay ofertas disponibles</p>;
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
      {deals.map((deal) => (
        <DealCard key={deal.id} offer={deal} />
      ))}
    </div>
  );
}
