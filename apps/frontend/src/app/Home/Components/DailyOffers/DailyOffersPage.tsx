"use client";
import { useDailyOffers } from "@/hooks/useDailyOffers";
import { DailyOffersContent } from "./Components/DailyOffersContent";

export function DailyOffers() {
  const { offers, loading } = useDailyOffers();

  return (
    <section className="section-bg text-neutral-2">
      <div className="container mx-auto px-4 py-8 md:py-16">
        <div className="primary-bg w-full rounded-xl px-4 md:px-8 bg-opacity-10 backdrop-blur-md shadow-lg py-8 md:py-12 h-full flex flex-col lg:flex-row items-center justify-center lg:justify-between">
          <DailyOffersContent offers={offers} loading={loading} />
        </div>
      </div>
    </section>
  );
}