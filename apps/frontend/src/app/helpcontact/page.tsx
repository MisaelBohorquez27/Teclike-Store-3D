import { FaqSection } from "@/app/helpcontact/components/faqsection";
import { ContactForm } from "@/app/helpcontact/components/contactform";
import { ServiceCards } from "@/app/helpcontact/components/servicecards";
import { FiMail, FiPhone, FiClock } from "react-icons/fi";

export default function HelpContactPage() {
  return (
    <main className="min-h-screen bg-linear-to-b from-gray-950 via-black to-gray-950">
      {/* Hero Banner */}
      <section className="pt-20 sm:pt-24 md:pt-28 pb-12 sm:pb-6 md:pb-10 relative overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-b from-cyan-800/10 to-transparent pointer-events-none" />
        <div className="container mx-auto px-4 sm:px-6 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black mb-6">
            <span className="text-white">Ayuda&nbsp;y&nbsp;</span>
            <span className="bg-linear-to-r from-cyan-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Contacto
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto">
            Estamos aquí para ayudarte en lo que necesites. Contacta con nuestro equipo experto
          </p>
        </div>
      </section>

      {/* Sección de Servicios */}
      <section className="container mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-20">
        {/*  
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            Nuestros Servicios
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Te ofrecemos múltiples canales para resolver tus dudas
          </p>
        </div>*/}
        <ServiceCards />
      </section>

      {/* Sección de Preguntas Frecuentes */}
      <section className="bg-linear-to-br from-gray-900/60 to-black/60 py-12 sm:py-16 md:py-20 border-y border-gray-800/50">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
              Preguntas Frecuentes
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Encuentra respuestas rápidas a las preguntas más comunes
            </p>
          </div>
          <FaqSection />
        </div>
      </section>

      {/* Sección de Contacto */}
      <section className="py-12 sm:py-16 md:py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16">
              {/* Información de contacto */}
              <div className="flex flex-col justify-center">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-8">
                  Contacta con Nuestro Equipo
                </h2>
                <p className="text-gray-400 text-lg mb-8">
                  Recibe asistencia para todas tus dudas y problemas. Nuestro equipo está disponible para ayudarte.
                </p>
                
                <div className="space-y-6">
                  {/* Email */}
                  <div className="flex gap-4 items-start">
                    <div className="p-3 rounded-lg bg-blue-600/20 text-blue-400 shrink-0 mt-1">
                      <FiMail className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white text-lg mb-1">
                        Correo Electrónico
                      </h3>
                      <p className="text-gray-400">soporte@teclike.com</p>
                    </div>
                  </div>

                  {/* Teléfono */}
                  <div className="flex gap-4 items-start">
                    <div className="p-3 rounded-lg bg-purple-600/20 text-purple-400 shrink-0 mt-1">
                      <FiPhone className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white text-lg mb-1">
                        Teléfono
                      </h3>
                      <p className="text-gray-400">+593 959814905</p>
                    </div>
                  </div>

                  {/* Horario */}
                  <div className="flex gap-4 items-start">
                    <div className="p-3 rounded-lg bg-emerald-600/20 text-emerald-400 shrink-0 mt-1">
                      <FiClock className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white text-lg mb-2">
                        Horario de Atención
                      </h3>
                      <p className="text-gray-400">Lunes a Viernes: 9:00 AM - 6:00 PM</p>
                      <p className="text-gray-400">Sábados: 10:00 AM - 2:00 PM</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Formulario de contacto */}
              <div className="bg-linear-to-br from-gray-900/80 to-black/80 rounded-xl p-6 sm:p-8 border border-gray-800/50 h-fit">
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
                  Envíanos un Mensaje
                </h2>
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
