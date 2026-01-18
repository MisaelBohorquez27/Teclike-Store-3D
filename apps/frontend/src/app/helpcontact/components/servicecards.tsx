'use client';

import { motion } from 'framer-motion';
import { FiTool, FiHelpCircle, FiPackage, FiDollarSign } from 'react-icons/fi';

export function ServiceCards() {
  const services = [
    {
      title: "Soporte Técnico",
      description: "Ayuda con problemas técnicos y uso de plataforma",
      icon: FiTool,
      color: "from-blue-700 to-cyan-500"
    },
    {
      title: "Preguntas sobre Productos",
      description: "Información detallada sobre nuestros productos",
      icon: FiHelpCircle,
      color: "from-blue-700 to-cyan-500"
    },
    {
      title: "Estado de Pedidos",
      description: "Seguimiento y consulta de tus compras",
      icon: FiPackage,
      color: "from-blue-700 to-cyan-500"
    },
    {
      title: "Facturación",
      description: "Ayuda inmediata con facturas, envíos y pagos",
      icon: FiDollarSign,
      color: "from-blue-700 to-cyan-500"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <motion.div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
    >
      {services.map((service, index) => {
        const Icon = service.icon;
        return (
          <motion.div
            key={index}
            variants={itemVariants}
            whileHover={{ y: -8, transition: { duration: 0.3 } }}
            className="group relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-100 rounded-xl blur-xl transition-opacity duration-500" style={{
              backgroundImage: `linear-gradient(135deg, var(--tw-gradient-stops))`
            }} />
            <div className={`relative bg-gradient-to-br ${service.color} p-0.5 rounded-xl`}>
              <div className="bg-gradient-to-br from-gray-900/80 to-black/80 rounded-xl p-6 h-full flex flex-col justify-center text-center hover:from-gray-800/80 hover:to-black/90 transition-all duration-300 border border-gray-800/30">
                <div className="flex justify-center mb-4">
                  <div className={`p-3 rounded-lg bg-gradient-to-br ${service.color}`}>
                    <Icon className="w-6 h-6 text-gray-100" />
                  </div>
                </div>
                <h3 className="text-lg font-bold text-gray-100 mb-2">
                  {service.title}
                </h3>
                <p className="text-sm text-gray-300 leading-relaxed">
                  {service.description}
                </p>
              </div>
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}