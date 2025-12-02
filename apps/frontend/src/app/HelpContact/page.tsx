import { FaqSection } from "@/app/HelpContact/components/FaqSection";
import { ContactForm } from "@/app/HelpContact/components/ContactForm";
import { ServiceCards } from "@/app/HelpContact/components/ServiceCards";

export default function HelpContactPage() {
  return (
    <main className=" min-h-screen">
      {/* Hero Banner */}
      <section className="pt-24 sm:pt-28 md:pt-36 pb-4 sm:pb-6 md:pb-8 HelpContact-title">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <h1 className="TitleColor text-3xl sm:text-4xl font-bold mb-3 sm:mb-4 py-1">
            Ayuda y Contacto
          </h1>
          <p className="TextColor3 text-lg sm:text-xl opacity-90">
            Estamos aquí para ayudarte en lo que necesites
          </p>
        </div>
      </section>

      {/* Sección de Servicios */}
      <section className="container mx-auto px-4 sm:px-6 py-10 sm:py-14 md:py-16">
        <ServiceCards />
      </section>

      {/* Sección de Preguntas Frecuentes */}
      <section className="py-10 sm:py-14 md:py-16">
        <div className="container mx-auto px-4 sm:px-6">
          <h2 className="TextColor text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-10 md:mb-12">
            Preguntas Frecuentes
          </h2>
          <FaqSection />
        </div>
      </section>

      {/* Sección de Contacto */}
      <section className="Contact-bg py-10 sm:py-14 md:py-16">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-7xl mx-auto rounded-xl overflow-hidden">
            <div className="flex flex-col md:flex-row gap-8 lg:gap-x-30">
              {/* Información de contacto */}
              <div className="TextColor1 md:w-full lg:w-1/2 p-4 sm:p-6">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-5 md:mb-7">
                  Contacte a nuestro equipo
                </h2>
                <div className="TextColor1 space-y-4 sm:space-y-6">
                  <div>
                    <p className="text-lg sm:text-xl mb-3 sm:mb-4 md:mb-5">
                      Reciba asistencia de primera en sus dudas y problemas.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-base sm:text-lg">
                      Correo Electrónico
                    </h3>
                    <p className="text-sm sm:text-base">
                      soporte@vective3d.com
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-base sm:text-lg">
                      Teléfono
                    </h3>
                    <p className="text-sm sm:text-base">+1 (555) 123-4567</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-base sm:text-lg">
                      Horario de Atención
                    </h3>
                    <p className="text-sm sm:text-base">
                      Lunes a Viernes: 9am - 6pm
                    </p>
                    <p className="text-sm sm:text-base">Sábados: 10am - 2pm</p>
                  </div>
                </div>
              </div>

              {/* Formulario de contacto */}
              <div className="md:w-full lg:w-1/2 p-4 sm:p-6">
                <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-5 md:mb-6">
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
