import { DailyDeals } from "@/app/DailyOffers/DailyDeals";
import { CountdownTimer } from "@/app/DailyOffers/CountdownTimer";
import { HotDeals } from "@/app/DailyOffers/HotDeals";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Subscription } from "@/components/ui/Subscription";

export default function DailyDealsPage() {
  return (
    <main className="min-h-screen justify-center mx-auto">
      {/* Hero Banner */}
      <section className="PageDailyOffers-bg pb-12 sm:pb-14 md:pb-16 pt-20 sm:pt-25 md:pt-30 DailyOffers-title-bg">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <div className="flex justify-center mb-3 sm:mb-4">
            <span className="bg-white text-[#006826] px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-bold">
              OFERTAS EXCLUSIVAS
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold mb-2">
            Ofertas del Día
          </h1>
          <p className="text-lg sm:text-xl opacity-90 mb-4 sm:mb-6">
            Descuentos especiales por tiempo limitado
          </p>
          <CountdownTimer targetDate={new Date().setHours(24, 0, 0, 0)} />
        </div>
      </section>

      {/* Ofertas Flash */}
      <section className="FlashOffers-bg">
        <div className="bg-transparent container mx-auto px-4 sm:px-6 py-8 sm:py-10 md:py-12">
          <h2 className="TextColor1 text-2xl sm:text-3xl font-bold text-center mb-2">
            🔥 Flash Deals
          </h2>
          <p className="TextColor3 text-center mb-6 sm:mb-8">
            Ofertas que terminan en las próximas horas
          </p>
          <DailyDeals />
        </div>
      </section>

      {/* Ofertas Destacadas */}
      <section className="FeatureOffers-bg PageDailyOffers-bg py-8 sm:py-10 md:py-12">
        <div className="container mx-auto px-4 sm:px-6">
          <h2 className="TextColor1 text-2xl sm:text-3xl font-bold text-center mb-2">
            ⭐ Ofertas Destacadas
          </h2>
          <p className="TextColor3 text-center mb-6 sm:mb-8">
            Los mejores descuentos de la semana
          </p>
          <HotDeals />
        </div>
      </section>

      {/* Banner de Suscripción */}
      <section className="BannerSubscribe-bg text-Black py-8 sm:py-10 md:py-12">
        <div className="container mx-auto px-4 sm:px-6 flex flex-col items-center text-center">
          <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">
            ¿No quieres perderte ninguna oferta?
          </h2>
          <p className="mb-4 sm:mb-6 text-sm sm:text-base">
            Suscríbete y recibe las mejores promociones directamente en tu email
          </p>
          <Subscription />
        </div>
      </section>
    </main>
  );
}
