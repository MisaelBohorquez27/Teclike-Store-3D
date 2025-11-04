export function ServiceCards() {

  // tienes que separar esto
  const services = [
    {
      title: "Soporte Técnico",
      description: "Ayuda con problemas técnicos y uso de plataforma",
      icon: "🛠️"
    },
    {
      title: "Preguntas sobre Productos",
      description: "Información detallada sobre nuestros modelos 3D",
      icon: "❓"
    },
    {
      title: "Estado de Pedidos",
      description: "Seguimiento y consulta de tus compras",
      icon: "📦"
    },
    {
      title: "Facturación",
      description: "Ayuda con facturas y pagos",
      icon: "🧾"
    }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 lg:gap-6">
      {services.map((service, index) => (
        <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow text-center">
          <div className="text-3xl mb-4">{service.icon}</div>
          <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
          <p className="text-gray-600">{service.description}</p>
        </div>
      ))}
    </div>
  );
}