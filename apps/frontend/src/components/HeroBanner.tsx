import { Navbar } from "@/components/Navbar";
import Button from "@/components/Button";
import desktop from "../../public/ui/escritorio2.png";
import Image from "next/image";

export function HeroBanner() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-tr from-[#000712] to-[#072143] flex items-center justify-center px-4 pb-8 gap-4">
        <div className="w-full max-w-2xl text-left md:w-2/3 pb-6 p-2 pr-0 rounded-lg ml-2 mb-4 mr-4">
          {/* Título */}
          <h1 className="text-4xl md:text-6xl font-bold text-[#FAF9F6] mb-6 leading-tight">
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
        <div className="w-full md:w-1/3 pl-8 mb-4 ml-6">
          <Image
            src={desktop.src}
            alt="Escritorio"
            width={1000}
            height={400}
            className="w-full max-w-md mx-auto rounded-lg object-cover"
          />
        </div>
      </main>
    </>
  );
}
