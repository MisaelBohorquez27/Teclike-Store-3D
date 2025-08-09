import { FaShippingFast, FaShieldAlt, FaHandHoldingUsd, FaStar } from 'react-icons/fa';

export function BenefitsGrid() {
  const benefits = [
    {
      title: "Entrega Rápida",
      value: "48h",
      description: "Despacho express en productos seleccionados",
      Icon: FaShippingFast,
    },
    {
      title: "Garantía Extendida",
      value: "24 meses",
      description: "Cobertura adicional en todos nuestros productos",
      Icon: FaShieldAlt,
    },
    {
      title: "Pago Contra Entrega",
      value: "100% seguro",
      description: "Solo pagas al recibir tu pedido",
      Icon: FaHandHoldingUsd,
    },
    {
      title: "Descuentos por Fidelidad",
      value: "Hasta 20%",
      description: "Beneficios exclusivos para clientes recurrentes",
      Icon: FaStar,
    }
  ];

  return (
    <section className="BenefitGrid-bg py-12 md:py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {benefits.map((benefit, index) => (
            <div 
              key={index} 
              className="p-6 text-center"
            >
              <benefit.Icon 
                className="TitleColor w-10 h-10 md:w-12 md:h-12 mb-4 mx-auto" 
                aria-hidden="true"
              />
              <p className="SubtitleColor text-lg md:text-xl font-bold mb-2">
                {benefit.value}
              </p>
              <h3 className="TitleColor color-text text-lg md:text-xl font-semibold mb-2">
                {benefit.title}
              </h3>
              <p className="SubtitleColor text-sm md:text-base">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}