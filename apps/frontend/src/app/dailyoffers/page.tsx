import { DailyDeals } from "@/app/dailyoffers/components/dailydeals";
import { CountdownTimer } from "@/app/dailyoffers/components/countdowntimer";
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
    <main className="bg-linear-to-b from-gray-950 via-black to-gray-950">
      {/* Hero Banner */}
      <section
        className="relative overflow-hidden"
        aria-labelledby="daily-offers-title"
      >
        {/* Efectos de fondo */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-linear-to-br from-cyan-900/20 via-transparent to-blue-900/20" />

          {/* Efectos de luz 
          <div className="absolute top-1/4 -left-32 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />*/}
          <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />

          {/* Patrón sutil */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.1)_1px,transparent_1px)] bg-size-[80px_80px]" />
          </div>
        </div>

        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center pt-18 md:pt-22 lg:pt-24 pb-2 md:pb-4 lg:pb-6">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-black mb-6">
              <span className="text-gray-100">Nuestras </span>
              <span className="bg-linear-to-r from-cyan-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
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

          </div>
        </div>

        {/* Línea decorativa inferior */}
      </section>

      {/* Sección principal de ofertas */}
      <section
        className="relative py-2 md:py-4 lg:py-6"
        aria-labelledby="flash-deals-title"
      >
        <div className="absolute inset-0 bg-linear-to-bl from-blue-900/20 via-transparent to-cyan-900/20" />

        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Encabezado de sección
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              <span className="bg-linear-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
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
        <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-cyan-500/30 to-transparent" />
      </section>
    </main>
  );
}
