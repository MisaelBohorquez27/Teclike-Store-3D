"use client";
import { FilterSidebar } from "@/app/Products/FilterSidebar";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { ProductGrid } from "@/app/Products/ProductGrid";
import { Pagination } from "@/components/ui/Pagination";
import { useState } from "react";
import { SearchBar } from "@/components/SearchBar";

export default function ProductPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 10; // Total de páginas disponibles

  return (
    <main className="PageProducts-bg min-h-[calc(100vh-4rem)] md:min-h-screen relative overflow-hidden">
      {/* Hero Banner */}
      <section className="pt-20 sm:pt-28 md:pt-35 pb-12 sm:pb-16 md:pb-20">
        <div className="container mx-auto px-4 sm:px-6 text-center h-full">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 Product-title">
            Nuestra Colección
          </h1>
          <p className="text-xl sm:text-2xl opacity-90 Product-subtitle">
            Encuentra los mejores productos para tus proyectos
          </p>
        </div>
      </section>

      {/* Contenido Principal */}
      <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-10 md:py-12">
        <div className="flex flex-col lg:flex-row gap-6 md:gap-8">
          {/* Sidebar de Filtros */}
          <div className="w-full lg:w-1/4">
            <div className="flex justify-center lg:justify-start">
              <SearchBar />
            </div>
            <FilterSidebar />
          </div>

          {/* Grid de Productos */}
          <div className="w-full lg:w-3/4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 md:mb-8 gap-4 sm:gap-0">
              <h2 className="TitleColor text-xl sm:text-2xl font-semibold">
                Todos los Productos
              </h2>
              <div className="flex items-center w-full sm:w-auto">
                <span className="TextColor1 mr-2 text-sm sm:text-base">
                  Ordenar por:
                </span>
                <select className="TextColor1 border rounded-md px-2 sm:px-3 py-1 text-sm sm:text-base">
                  <option>Más recientes</option>
                  <option>Precio (menor a mayor)</option>
                  <option>Precio (mayor a menor)</option>
                  <option>Mejor valorados</option>
                </select>
              </div>
            </div>

            <ProductGrid />

            {/* Paginación */}
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={(page) => setCurrentPage(page)}
              className="mt-6 sm:mt-8"
            />
          </div>
        </div>
      </div>
    </main>
  );
}
