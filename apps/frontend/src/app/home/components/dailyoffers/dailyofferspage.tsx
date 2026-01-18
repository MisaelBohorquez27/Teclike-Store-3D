"use client";
import { useDailyOffers } from "@/hooks/usedailyoffers";
import { DailyOffersContent } from "./components/dailyofferscontent";
import { FiClock, FiFilter } from "react-icons/fi";
import { motion } from "framer-motion";

export function DailyOffers() {
  const { offers, loading } = useDailyOffers();

  return (
    <section className="bg-gray-950 text-gray-200">
      <div className="container mx-auto px-4 py-8 md:py-12">
               
        {/* CTA Superior */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-center my-0.5"
        >
          <div className="inline-flex items-center gap-4 p-4 rounded-2xl bg-linear-to-r from-gray-900/50 to-black/50 backdrop-blur-sm border border-gray-800/50">
            <FiClock className="w-5 h-5 text-cyan-400 animate-pulse" />
            <p className="text-gray-300 text-sm md:text-base">
              <span className="text-white font-semibold">¡Atención!</span> Estas
              ofertas son por tiempo limitado
            </p>
          </div>
        </motion.div>

        <div className="w-full rounded-xl px-2 md:px-4 bg-opacity-10 backdrop-blur-md shadow-lg py-8 md:py-12 h-full flex flex-col lg:flex-row items-center justify-center lg:justify-between">
          <DailyOffersContent offers={offers} loading={loading} />
        </div>
      </div>
    </section>
  );
}
