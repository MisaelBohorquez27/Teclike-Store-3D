import { DailyDeals } from "@/app/DailyOffers/components/DailyDeals";
import { CountdownTimer } from "@/app/DailyOffers/components/CountdownTimer";
import { HotDeals } from "@/app/DailyOffers/components/HotDeals";
import { Subscription } from "@/components/Subscription";

export default function DailyDealsPage() {
  // Configuración de fechas para el countdown
  const getTargetDate = () => {
    const now = new Date();
    now.setHours(24, 0, 0, 0); // Mañana a medianoche
    return now.getTime();
  };

  return (
    <main className="min-h-screen">
      {/* Hero Banner */}
      <section 
        className="PageDailyOffers-bg relative overflow-hidden"
        aria-labelledby="daily-offers-title"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center py-16 sm:py-20 lg:py-24">
            {/* Badge */}
            <div className="flex justify-center mb-4 sm:mb-5">
              <span 
                className="bg-white text-[#006826] px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-bold tracking-wide shadow-lg animate-pulse"
                aria-label="Ofertas exclusivas disponibles"
              >
                🎯 OFERTAS EXCLUSIVAS
              </span>
            </div>
            
            <h1 
              className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 daily-offers-title drop-shadow-lg"
            >
              Ofertas del Día
            </h1>
            
            <p className="text-lg sm:text-xl lg:text-2xl DailyOffers-subtitle mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed drop-shadow-md">
              Descuentos especiales por tiempo limitado
            </p>
            
            <div className="max-w-md mx-auto">
              <CountdownTimer 
                targetDate={getTargetDate()} 
              />
            </div>
          </div>
        </div>
      </section>

      <section 
        className="FlashOffers-bg relative"
        aria-labelledby="flash-deals-title"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.15)_1px,transparent_0)] bg-[length:20px_20px]" />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="py-12 sm:py-16 lg:py-20">
            {/* Encabezado */}
            <div className="text-center mb-8 sm:mb-12 lg:mb-16">
              <div className="flex items-center justify-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                <span className="text-2xl sm:text-3xl animate-bounce">🔥</span>
                <h2 
                  id="flash-deals-title"
                  className="TextColor1 text-2xl sm:text-3xl lg:text-4xl font-bold"
                >
                  Flash Deals
                </h2>
              </div>
              <p className="TextColor3 text-base sm:text-lg lg:text-xl max-w-2xl mx-auto leading-relaxed">
                Ofertas que terminan en las próximas horas • No te quedes sin la tuya
              </p>
            </div>

            {/* Componente de Ofertas Diarias */}
            <div className="relative">
              <DailyDeals />
            </div>
          </div>
        </div>
      </section>

      {/* Ofertas Destacadas (Comentado por ahora) */}
      {/*
      <section 
        className="FeatureOffers-bg PageDailyOffers-bg py-12 sm:py-16 lg:py-20"
        aria-labelledby="featured-offers-title"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <div className="flex items-center justify-center gap-2 sm:gap-3 mb-3 sm:mb-4">
              <span className="text-2xl sm:text-3xl">⭐</span>
              <h2 
                id="featured-offers-title"
                className="TextColor1 text-2xl sm:text-3xl lg:text-4xl font-bold"
              >
                Ofertas Destacadas
              </h2>
            </div>
            <p className="TextColor3 text-base sm:text-lg lg:text-xl max-w-2xl mx-auto">
              Los mejores descuentos de la semana seleccionados para ti
            </p>
          </div>
          <HotDeals />
        </div>
      </section>
      */}

      {/* Banner de Suscripción */}
      <section 
        className="BannerSubscribe-bg relative overflow-hidden"
        aria-labelledby="subscription-title"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="py-12 sm:py-16 lg:py-20">
            <div className="max-w-3xl mx-auto text-center">
              {/* Icono decorativo */}
              <div className="flex justify-center mb-4 sm:mb-6">
                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center backdrop-blur-sm">
                  <span className="text-2xl sm:text-3xl">📧</span>
                </div>
              </div>
              
              {/* Título y descripción */}
              <h2 
                id="subscription-title"
                className="text-Black text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4"
              >
                ¿No quieres perderte ninguna oferta?
              </h2>
              
              <p className="text-Black/80 text-base sm:text-lg lg:text-xl mb-6 sm:mb-8 leading-relaxed">
                Suscríbete y recibe las mejores promociones directamente en tu email
              </p>

              {/* Componente de Suscripción */}
              <div className="max-w-md mx-auto">
                <Subscription />
              </div>

              {/* Texto de seguridad */}
              <p className="text-Black/60 text-xs sm:text-sm mt-4 sm:mt-6">
                📍 Sin spam • Puedes cancelar cuando quieras • Protegemos tus datos
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Sección de Información Adicional */}
      <section className="border-t border-gray-200 py-8 sm:py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 text-center">
            <div className="p-4 sm:p-6">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <span className="text-xl">🚚</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">
                Envío Rápido
              </h3>
              <p className="text-gray-600 text-xs sm:text-sm">
                Recibe tus productos en 24-48 horas
              </p>
            </div>
            
            <div className="p-4 sm:p-6">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <span className="text-xl">🛡️</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">
                Pago Seguro
              </h3>
              <p className="text-gray-600 text-xs sm:text-sm">
                Transacciones protegidas y cifradas
              </p>
            </div>
            
            <div className="p-4 sm:p-6">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <span className="text-xl">↩️</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">
                Devoluciones
              </h3>
              <p className="text-gray-600 text-xs sm:text-sm">
                30 días para cambiar de opinión
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}