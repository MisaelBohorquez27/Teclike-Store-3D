import { FaqSection } from "@/components/FaqSection";
import { ContactForm } from "@/components/ContactForm";
import { ServiceCards } from "@/components/ServiceCards";
import { Navbar } from "@/components/Navbar";

export default function HelpContactPage() {
  return (
    <>
      {/* Navbar */}
      <Navbar />
      <main className="bg-gray-50 min-h-screen">
        {/* Hero Banner */}
        <section className="bg-gradient-to-r from-blue-600 to-indigo-700 py-20 text-white">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold mb-4">Ayuda y Contacto</h1>
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
        <section className="bg-white py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">
              Preguntas Frecuentes
            </h2>
            <FaqSection />
          </div>
        </section>

        {/* Sección de Contacto */}
        <section className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/2 bg-blue-600 p-8 text-white">
                <h2 className="text-2xl font-bold mb-4">
                  Información de Contacto
                </h2>
                <div className="space-y-4">
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
              <div className="md:w-1/2 p-8">
                <h2 className="text-2xl font-bold mb-6">Envíanos un Mensaje</h2>
                <ContactForm />
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
