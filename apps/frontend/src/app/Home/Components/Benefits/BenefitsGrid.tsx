import { BENEFITS } from "./data/DataBenefits";
import { Benefit } from "./types/TypesBenefits";

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
          className="TitleColor text-2xl md:text-3xl font-bold mb-4"
        >
          Beneficios Exclusivos
        </h2>
        <p className="SubtitleColor text-lg md:text-xl max-w-2xl mx-auto">
          Descubre todas las ventajas de comprar con nosotros
        </p>
      </div>
      <BenefitsList benefits={BENEFITS} />
    </BenefitsGridContainer>
  );
}

// Subcomponents
const BenefitCard = ({ benefit }: { benefit: Benefit }) => (
  <div className="p-6 text-center group hover:transform hover:scale-105 transition-transform duration-300">
    <benefit.Icon 
      className="TitleColor w-10 h-10 md:w-12 md:h-12 mb-4 mx-auto group-hover:scale-110 transition-transform duration-300" 
      aria-hidden={true}
    />
    <p className="SubtitleColor text-lg md:text-xl font-bold mb-2">
      {benefit.value}
    </p>
    <h3 className="TitleColor text-lg md:text-xl font-semibold mb-2">
      {benefit.title}
    </h3>
    <p className="SubtitleColor text-sm md:text-base leading-relaxed">
      {benefit.description}
    </p>
  </div>
);

const BenefitsGridContainer = ({ children }: { children: React.ReactNode }) => (
  <section 
    id="benefits-section"
    className="section-bg text-neutral py-12 md:py-16 px-4"
    aria-labelledby="benefits-heading"
  >
    <div className="max-w-7xl mx-auto">
      {children}
    </div>
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
        <BenefitCard benefit={benefit} />
      </div>
    ))}
  </div>
);

