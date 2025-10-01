"use client";
import { motion } from "framer-motion";
import { Subscription } from "@/components/ui/Subscription";
import { titleAnimation } from "@/types/followUs";

export function SubscriptionSection() {
  return (
    <div className="relative lg:h-110 overflow-hidden flex justify-center items-center">
      <div className="px-4 sm:px-8 py-8 mb-10 rounded-lg max-w-4xl mx-auto text-center">
        <motion.h2
          className="TitleColor text-3xl md:text-4xl font-bold mb-6 sm:mb-10"
          {...titleAnimation}
        >
          Obtén el 10% de descuento al suscribirte
        </motion.h2>
        <Subscription />
      </div>
    </div>
  );
}