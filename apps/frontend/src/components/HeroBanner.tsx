import { Navbar } from "@/components/Navbar";
import Button from "@/components/Button";
import desktop from "../assets/escritorio.png";

export function HeroBanner() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-gradient-to-br from-[#06162f] to-[#072143] flex items-center justify-center p-4 gap-4">
        <div className="max-w-2xl text-center w-1/2 p-4 rounded-lg">
          {/* Título */}
          <h1 className="text-4xl md:text-5xl font-bold text-[#FAF9F6] mb-6 leading-tight">
            ¿No sabes cómo ordenar tus productos luego de comprarlos?
          </h1>

          {/* Subtítulo */}
          <p className="text-xl md:text-2xl text-[#FAF9F6] opacity-90 mb-8">
            Ahorra tiempo y organízalos desde ahora
          </p>

          {/* Botón */}
          <Button
            variant="primary"
            size="lg"
            className="hover:border-transparent"
          >
            Empezar
          </Button>
        </div>
        <div className="w-1/2 p-4 rounded-lg">
          <img
            src={desktop.src} //Arreglar esto en un futuro
            alt="Escritorio"
            className="w-full max-w-md mx-auto mt-8"
          />
        </div>
      </main>
    </>
  );
}
