"use client";

import { motion } from "framer-motion";
import { BENEFITS } from "./data/databenefits";
import { Benefit } from "./types/typesbenefits";

// Main Component
export function BenefitsGrid() {
  return (
    <BenefitsGridContainer>
      <BenefitsList benefits={BENEFITS} />
    </BenefitsGridContainer>
  );
}

// Alternative version with heading (si necesitas agregar un título)
export function BenefitsGridWithHeading() {
  return (
    <BenefitsGridContainer>
      <div className="text-center mb-8 md:mb-12">
        <h2
          id="benefits-heading"
          className="text-white text-2xl md:text-3xl font-bold mb-4"
        >
          Beneficios Exclusivos
        </h2>
        <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto">
          Descubre todas las ventajas de comprar con nosotros
        </p>
      </div>
      <BenefitsList benefits={BENEFITS} />
    </BenefitsGridContainer>
  );
}

// Subcomponents
const BenefitCard = ({ benefit, index }: { benefit: Benefit; index: number }) => (
  <motion.div
    className="p-6 text-center group hover:transform hover:scale-105 transition-transform duration-300 bg-white/3 backdrop-blur-sm border border-white/10 hover:border-blue-500/30 rounded-2xl"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.1 * index }}
    whileHover={{ scale: 1.05 }}
  >
    <benefit.Icon
      className="w-5 h-5 md:w-7 md:h-7 mb-4 mx-auto text-blue-400 "
      aria-hidden={true}
    />
    <h3 className="text-md md:text-lg font-semibold text-white mb-2">
      {benefit.title}
    </h3>
    <p className="text-gray-300 text-sm md:text-base leading-relaxed">
      {benefit.description}
    </p>
  </motion.div>
);

const BenefitsGridContainer = ({ children }: { children: React.ReactNode }) => (
  <section
    id="benefits-section"
    className="bg-transparent text-gray-200 py-12 md:py-16 px-4"
    aria-labelledby="benefits-heading"
  >
    <div className="max-w-5xl mx-auto">{children}</div>
  </section>
);

const BenefitsList = ({ benefits }: { benefits: Benefit[] }) => (
  <div
    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
    role="list"
    aria-label="Lista de beneficios"
  >
    {benefits.map((benefit, index) => (
      <div key={`${benefit.title}-${index}`} role="listitem">
        <BenefitCard benefit={benefit} index={index} />
      </div>
    ))}
  </div>
);