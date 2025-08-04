import { DailyDeals } from "@/app/DailyOffers/DailyDeals";
import { CountdownTimer } from "@/app/DailyOffers/CountdownTimer";
import { HotDeals } from "@/app/DailyOffers/HotDeals";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Subscription } from "@/components/Subscription";

export default function DailyDealsPage() {
  return (
    <>
      {/*NavBar*/}
      <Navbar />
      <main className="bg-gray-50 min-h-screen">
        {/* Hero Banner */}
        <section className="bg-gradient-to-r from-[#003f8d] to-[#53729d] py-16 text-white">
          <div className="container mx-auto px-4 text-center">
            <div className="flex justify-center mb-4">
              <span className="bg-white text-red-600 px-3 py-1 rounded-full text-sm font-bold">
                OFERTAS EXCLUSIVAS
              </span>
            </div>
            <h1 className="text-4xl font-bold mb-2">Ofertas del Día</h1>
            <p className="text-xl opacity-90 mb-6">
              Descuentos especiales por tiempo limitado
            </p>
            <CountdownTimer targetDate={new Date().setHours(24, 0, 0, 0)} />
          </div>
        </section>
        
        {/* Ofertas Flash */}
        <section className="container mx-auto px-4 py-12">
          <h2 className="text-3xl font-bold text-center mb-2">
            🔥 Flash Deals
          </h2>
          <p className="text-gray-600 text-center mb-8">
            Ofertas que terminan en las próximas horas
          </p>
          <DailyDeals />
        </section>

        {/* Ofertas Destacadas */}
        <section className="bg-white py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-2">
              ⭐ Ofertas Destacadas
            </h2>
            <p className="text-gray-600 text-center mb-8">
              Los mejores descuentos de la semana
            </p>
            <HotDeals />
          </div>
        </section>

        {/* Banner de Suscripción */}
        <section className="bg-[#e5e5e5] text-Black py-12">
          <div className="container mx-auto px-4 flex flex-col items-center text-center">
            <h2 className="text-2xl font-bold mb-4">
              ¿No quieres perderte ninguna oferta?
            </h2>
            <p className="mb-6">
              Suscríbete y recibe las mejores promociones directamente en tu
              email
            </p>
            <Subscription />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
