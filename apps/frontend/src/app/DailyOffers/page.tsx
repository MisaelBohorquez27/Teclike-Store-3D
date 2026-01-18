import { DailyDeals } from "@/app/DailyOffers/components/dailydeals";
import { CountdownTimer } from "@/app/DailyOffers/components/countdowntimer";
import { Subscription } from "@/components/common/subscription";
import {
  FiTruck,
  FiShield,
  FiRefreshCw,
  FiZap,
  FiMail,
  FiGift,
} from "react-icons/fi";

export default function DailyDealsPage() {
  // Configuración de fechas para el countdown
  const getTargetDate = () => {
    const now = new Date();
    now.setHours(24, 0, 0, 0); // Mañana a medianoche
    return now.getTime();
  };

  return (
    <main className="bg-gradient-to-b from-gray-950 via-black to-gray-950">
      {/* Hero Banner */}
      <section
        className="relative overflow-hidden"
        aria-labelledby="daily-offers-title"
      >
        {/* Efectos de fondo */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/20 via-transparent to-blue-900/20" />

          {/* Efectos de luz 
          <div className="absolute top-1/4 -left-32 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />*/}
          <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />

          {/* Patrón sutil */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.1)_1px,transparent_1px)] bg-[size:80px_80px]" />
          </div>
        </div>

        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center pt-18 md:pt-22 lg:pt-24 pb-2 md:pb-4 lg:pb-6">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-black mb-6">
              <span className="text-gray-100">Nuestras </span>
              <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Ofertas 
              </span>
            </h1>

            <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto mb-8">
              Descubre promociones exclusivas que desaparecen en <br />
              <span className="text-cyan-400 font-semibold mx-1">24 horas</span>
              • Stock limitado
            </p>

            {/* Countdown Timer mejorado */}
            <div className="max-w-2xl mx-auto mb-4">
              <CountdownTimer targetDate={getTargetDate()} />
            </div>

            {/* Stats de ofertas 
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
              {[
                {
                  value: "10+",
                  label: "Ofertas Activas",
                  color: "text-cyan-400",
                },
                {
                  value: "40%",
                  label: "Descuento Promedio",
                  color: "text-cyan-400",
                },
                {
                  value: "24h",
                  label: "Tiempo Completo",
                  color: "text-cyan-400",
                },
                {
                  value: "20+",
                  label: "Comprados Hoy",
                  color: "text-cyan-400",
                },
              ].map((stat, index) => (
                <div
                  key={index}
                  className="p-4 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10"
                >
                  <div
                    className={`text-2xl md:text-3xl font-bold ${stat.color} mb-1`}
                  >
                    {stat.value}
                  </div>
                  <div className="text-xs text-gray-400">{stat.label}</div>
                </div>
              ))}
            </div>*/}
          </div>
        </div>

        {/* Línea decorativa inferior */}
      </section>

      {/* Sección principal de ofertas */}
      <section
        className="relative py-2 md:py-4 lg:py-6"
        aria-labelledby="flash-deals-title"
      >
        <div className="absolute inset-0 bg-gradient-to-bl from-blue-900/20 via-transparent to-cyan-900/20" />

        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Encabezado de sección
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Ofertas Destacadas
              </span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Productos seleccionados con los mayores descuentos del día
            </p>
          </div> */}

          <div className="relative">
            <DailyDeals />
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />
      </section>

      {/* Banner de Suscripción Modernizado 
      <section
        className="relative py-16 md:py-20 lg:py-24 overflow-hidden"
        aria-labelledby="subscription-title"
      >
        // Fondo con efectos
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/20 via-transparent to-blue-900/20" />
          <div className="absolute top-32 -right-32 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-xl border border-gray-800/50 rounded-3xl p-8 md:p-12 shadow-2xl">
              <div className="text-center">
                // Icono decorativo
                <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-500 mb-6">
                  <FiMail className="w-8 h-8 md:w-10 md:h-10 text-white" />
                </div>

                // Título y descripción
                <h2
                  id="subscription-title"
                  className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4"
                >
                  No te pierdas las próximas
                  <span className="text-cyan-400"> ofertas exclusivas</span>
                </h2>

                <p className="text-gray-300 text-lg mb-8 leading-relaxed">
                  Suscríbete y recibe alertas de las mejores promociones antes
                  que nadie. Ofertas flash, descuentos exclusivos y contenido
                  especial solo para suscriptores.
                </p>

                // Componente de Suscripción
                <div className="max-w-md mx-auto">
                  <Subscription />
                </div>

                // Beneficios
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                  {[
                    { icon: "🎁", text: "Ofertas exclusivas" },
                    { icon: "⏰", text: "Alertas tempranas" },
                    { icon: "🔒", text: "Sin spam" },
                  ].map((benefit, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-center gap-2 p-3 rounded-xl bg-white/5"
                    >
                      <span className="text-xl">{benefit.icon}</span>
                      <span className="text-sm text-gray-300">
                        {benefit.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>*/}

      {/* Sección de Garantías 
      <section className="relative py-12 md:py-16 lg:py-20">

        //Fondo con efectos
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-bl from-blue-900/20 via-transparent to-cyan-900/20" />
          <div className="absolute -top-32 -right-32 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-100 mb-4">
              Compra con
              <span className="text-cyan-400"> total confianza</span>
            </h3>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Tu satisfacción es nuestra prioridad. Por eso ofrecemos:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                icon: FiTruck,
                title: "Envío Express",
                description: "Entrega en 24-48 horas",
                color: "from-cyan-500 to-blue-500",
                features: [
                  "Rastreo en tiempo real",
                  "Entrega programada",
                  "Sin costos ocultos",
                ],
              },
              {
                icon: FiShield,
                title: "Seguridad Garantizada",
                description: "Transacciones 100% seguras",
                color: "from-green-500 to-emerald-500",
                features: [
                  "Pago cifrado",
                  "Protección antifraude",
                  "Certificado SSL",
                ],
              },
              {
                icon: FiRefreshCw,
                title: "Devolución Flexible",
                description: "30 días para decidir",
                color: "from-purple-500 to-pink-500",
                features: [
                  "Devolución gratuita",
                  "Reembolso rápido",
                  "Sin preguntas",
                ],
              },
            ].map((item, index) => (
              <div
                key={index}
                className="group p-6 md:p-8 rounded-2xl bg-gradient-to-br from-gray-900/60 to-black/60 backdrop-blur-sm border border-gray-800/50 hover:border-gray-700/50 transition-all duration-300 hover:scale-105"
              >
                <div className="flex flex-col items-center text-center">
                  // Icono 
                  <div
                    className={`w-14 h-14 rounded-xl bg-gradient-to-r ${item.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                  >
                    <item.icon className="w-7 h-7 text-white" />
                  </div>

                  // Título 
                  <h4 className="text-xl font-bold text-white mb-2">
                    {item.title}
                  </h4>

                  // Descripción 
                  <p className="text-gray-300 mb-4">{item.description}</p>

                  // Features
                  <div className="space-y-2">
                    {item.features.map((feature, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2 text-sm text-gray-400"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-current" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          // CTA adicional
          <div className="text-center mt-12 md:mt-16">
            <div className="inline-flex items-center gap-3 p-4 rounded-2xl bg-gradient-to-r from-gray-900/50 to-black/50 backdrop-blur-sm border border-gray-800/50">
              <FiGift className="w-6 h-6 text-cyan-400" />
              <p className="text-gray-300">
                <span className="text-white font-semibold">¿Tienes dudas?</span>{" "}
                Nuestro equipo está disponible 24/7 para ayudarte
              </p>
            </div>
          </div>
        </div>
      </section>*/}
    </main>
  );
}
