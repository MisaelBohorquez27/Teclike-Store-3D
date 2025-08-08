import { FaqSection } from "@/app/HelpContact/FaqSection";
import { ContactForm } from "@/app/HelpContact/ContactForm";
import { ServiceCards } from "@/app/HelpContact/ServiceCards";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function HelpContactPage() {
  return (
    <>
      {/* Navbar */}
      <Navbar />
      <main className="HelpContact-bg min-h-screen">
        {/* Hero Banner */}
        <section className="pt-36 pb-4 HelpContact-title">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold mb-4 py-1">Ayuda y Contacto</h1>
            <p className="text-xl opacity-90">
              Estamos aquí para ayudarte en lo que necesites
            </p>
          </div>
        </section>

        {/* Sección de Servicios */}
        <section className="container mx-auto px-4 py-16">
          <ServiceCards />
        </section>

        {/* Sección de Preguntas Frecuentes */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">
              Preguntas Frecuentes
            </h2>
            <FaqSection />
          </div>
        </section>

        {/* Sección de Contacto */}
        <section className="Contact-bg ">
          <div className="container mx-auto px-4 py-16">


          </div>
          <div className="max-w-7xl mx-auto rounded-xl overflow-hidden">
            <div className="md:flex gap-x-30">
              <div className="md:w-1/2 text-black p-4">
                <h2 className="text-5xl font-bold mb-7">
                  Contacte a nuestro equipo
                </h2>
                <div className="space-y-6">
                   <div>
                    <p className="text-xl mb-5">
                      Reciba asistencia de primera en sus dudas y problemas.</p>
                  </div>
                  <div>
                    <h3 className="font-semibold">Correo Electrónico</h3>
                    <p>soporte@vective3d.com</p>
                  </div>
                  <div>
                    <h3 className="font-semibold">Teléfono</h3>
                    <p>+1 (555) 123-4567</p>
                  </div>
                  <div>
                    <h3 className="font-semibold">Horario de Atención</h3>
                    <p>Lunes a Viernes: 9am - 6pm</p>
                    <p>Sábados: 10am - 2pm</p>
                  </div>
                </div>
              </div>
              <div className="md:w-1/2 p-4">
                <h2 className="text-2xl font-bold mb-6">Envíanos un Mensaje</h2>
                <ContactForm />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
