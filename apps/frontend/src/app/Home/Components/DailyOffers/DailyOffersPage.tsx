"use client";
import { useDailyOffers } from "@/hooks/useDailyOffers";
import { DailyOffersContent } from "./Components/DailyOffersContent";
import { FiFilter } from "react-icons/fi";

export function DailyOffers() {
  const { offers, loading } = useDailyOffers();

  return (
    <section className="bg-gray-950 text-gray-200">
      <div className="container mx-auto px-4 py-8 md:py-16">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500/10 to-cyan-500/10 border border-cyan-500/20 mb-6">
          <FiFilter className="w-4 h-4 text-cyan-400 animate-pulse" />
          <span className="text-cyan-300 text-sm font-bold tracking-wide">
            OFERTA RELÁMPAGO
          </span>
        </div>
        <div className="primary-bg w-full rounded-xl px-4 md:px-8 bg-opacity-10 backdrop-blur-md shadow-lg py-8 md:py-12 h-full flex flex-col lg:flex-row items-center justify-center lg:justify-between">
          <DailyOffersContent offers={offers} loading={loading} />
        </div>
      </div>
    </section>
  );
}
