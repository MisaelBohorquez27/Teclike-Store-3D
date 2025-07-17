import { Navbar } from "@/components/Navbar";

export function HeroBanner() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <section className="max-w-2xl text-center">
          {/* Título */}
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6 leading-tight">
            ¿No sabes cómo ordenar tus productos luego de comprarlos?
          </h1>

          {/* Subtítulo */}
          <p className="text-xl md:text-2xl text-gray-600 mb-8">
            Ahorra tiempo y organizados desde ahora
          </p>

          {/* Botón */}
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-lg text-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105">
            Empezar
          </button>
        </section>
      </main>

      <footer className="bg-gray-800 text-white py-6 text-center">
        <p>www.vective3dstore.com</p>
      </footer>
    </>
  );
}
