import { FaShippingFast, FaShieldAlt, FaHandHoldingUsd, FaStar } from 'react-icons/fa';

export function BenefitsGrid() {
  const benefits = [
    {
      title: "Entrega Rápida",
      value: "48h",
      description: "Despacho express en productos seleccionados",
      icon: <FaShippingFast className="w-12 h-12 mb-4 mx-auto text-blue-600" />,
      color: "text-blue-600"
    },
    {
      title: "Garantía Extendida",
      value: "24 meses",
      description: "Cobertura adicional en todos nuestros productos",
      icon: <FaShieldAlt className="w-12 h-12 mb-4 mx-auto text-green-600" />,
      color: "text-green-600"
    },
    {
      title: "Pago Contra Entrega",
      value: "100% seguro",
      description: "Solo pagas al recibir tu pedido",
      icon: <FaHandHoldingUsd className="w-12 h-12 mb-4 mx-auto text-purple-600" />,
      color: "text-purple-600"
    },
    {
      title: "Descuentos por Fidelidad",
      value: "Hasta 20%",
      description: "Beneficios exclusivos para clientes recurrentes",
      icon: <FaStar className="w-12 h-12 mb-4 mx-auto text-yellow-500" />,
      color: "text-yellow-500"
    }
  ];

  return (
    <div className="bg-white py-12">
      <div className="container mx-auto px-4">        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <div 
              key={index} 
              className="bg-gray-50 rounded-xl p-6 text-center hover:shadow-md transition-shadow border border-gray-100"
            >
              {benefit.icon}
              <div className={`text-4xl font-bold mb-3 ${benefit.color}`}>
                {benefit.value}
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">{benefit.title}</h3>
              <p className="text-gray-600">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}