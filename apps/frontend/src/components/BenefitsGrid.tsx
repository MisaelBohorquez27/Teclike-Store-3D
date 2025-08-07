import { FaShippingFast, FaShieldAlt, FaHandHoldingUsd, FaStar } from 'react-icons/fa';

export function BenefitsGrid() {
  const benefits = [
    {
      title: "Entrega Rápida",
      value: "48h",
      description: "Despacho express en productos seleccionados",
      icon: <FaShippingFast className="w-12 h-12 mb-4 mx-auto text-[#303030]" />,
      color: "text-[#303030]"
    },
    {
      title: "Garantía Extendida",
      value: "24 meses",
      description: "Cobertura adicional en todos nuestros productos",
      icon: <FaShieldAlt className="w-12 h-12 mb-4 mx-auto text-[#303030]" />,
      color: "text-[#303030]"
    },
    {
      title: "Pago Contra Entrega",
      value: "100% seguro",
      description: "Solo pagas al recibir tu pedido",
      icon: <FaHandHoldingUsd className="w-12 h-12 mb-4 mx-auto text-[#303030]" />,
      color: "text-[#303030]"
    },
    {
      title: "Descuentos por Fidelidad",
      value: "Hasta 20%",
      description: "Beneficios exclusivos para clientes recurrentes",
      icon: <FaStar className="w-12 h-12 mb-4 mx-auto text-[#303030]" />,
      color: "text-[#303030]"
    }
  ];

  return (
    <div className="BenefitGrid-bg pt-16 pb-8">
      <div className="container mx-auto px-4">        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <div 
              key={index} 
              className="rounded-xl p-6 text-center"
            >
              {benefit.icon}
              <div className={`text-xl font-bold mb-3 ${benefit.color}`}>
                {benefit.value}
              </div>
              <h3 className="text-xl font-semibold mb-2 text-[#206179]">{benefit.title}</h3>
              <p className="text-gray-600">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}