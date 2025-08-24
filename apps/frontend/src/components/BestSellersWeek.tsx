"use client";
import { BestProductsSellers } from "./BestProductsSellers";
import { motion } from "framer-motion";
import "swiper/css";
import { CustomSwiper } from "./ui/CustomSwiper";

const BEST_SELLERS = [
  {
    id: 1,
    title: "Mouse X11",
    tagline: "See the difference. Literally.",
    description: "Now with enhanced display features.",
    features: [
      "Glare-free display",
      "Adjustable front light",
      "Weeks of battery life",
    ],
    fullDescription:
      "Amazon Kindle 16 GB (newest model) - Lightest and most compact Kindle, now with faster page turns...",
    priceRange: { min: 155, max: 186 },
    currency: "US$",
  },
  {
    id: 2,
    title: "COLLAGEN",
    description: "Now with enhanced display features.",
    tagline: "SILENT FACEBOOK MARK OVER TASTE",
    features: ["Sugar free", "Monohydrate for Women"],
    stats: ["50", "26", "19", "30"],
    times: ["(1/2) 20:00 AM", "(4/3) 21:00 AM"],
    fullDescription:
      "Monohidrato de creatina en polvo 5000 mg de Old School Labs, creatina optimizada para mujeres...",
    priceRange: { min: 52, max: 62 },
    currency: "US$",
  },
];

export function BestSellersWeek() {
  return (
    <section className="BestSellersWeek-bg py-8 md:py-16">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 md:mb-8 gap-4 sm:gap-0">
          <h2 className="TitleColor text-2xl sm:text-3xl font-bold">
            Más vendido de la semana
          </h2>
          <button className="text-blue-600 hover:text-blue-800 font-medium text-base sm:text-lg">
            Ver todos los productos →
          </button>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <CustomSwiper
            items={BEST_SELLERS}
            renderItem={(product) => <BestProductsSellers product={product} />}
            breakpoints={{
              640: { spaceBetween: 25, slidesPerView: 1 },
              768: { spaceBetween: 30, slidesPerView: 1 },
              1024: { spaceBetween: 40, slidesPerView: 1 },
            }}
            speed={400}
            effect="fade"
            fadeEffect={{ crossFade: true }}
            withIndicators
            className="relative overflow-hidden"
          />
        </motion.div>
      </div>
    </section>
  );
}
