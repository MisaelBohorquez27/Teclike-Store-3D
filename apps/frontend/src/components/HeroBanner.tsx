import { Navbar } from "@/components/Navbar";
import Button from "@/components/Button";

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
            Ahorra tiempo y organizalos desde ahora
          </p>

          {/* Botón */}
          <Button className="w-fit">
            Empezar
          </Button>
        </section>
      </main>
    </>
  );
}
