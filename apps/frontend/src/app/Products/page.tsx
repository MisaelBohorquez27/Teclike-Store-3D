"use client";
import { useState } from "react";
import { FilterSidebar } from "@/app/Products/FilterSidebar";
import { ProductGrid } from "@/app/Products/ProductGrid";
import { Pagination } from "@/components/ui/Pagination";
import { ProductHero } from "./ProductHero";
import { SearchBar3 } from "@/components/ui/SearchBar3";

export default function ProductPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [query] = useState(""); // <-- Estado de búsqueda
  const totalPages = 10; // 🔹 Este vendrá del backend más adelante

  return (
    <main className="PageProducts-bg min-h-[calc(100vh-4rem)] md:min-h-screen relative overflow-hidden">
      {/* Hero Banner */}
      <ProductHero />

      {/* Contenido Principal */}
      <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-10 md:py-12">
        <div className="flex flex-col lg:flex-row gap-6 md:gap-8">
          {/* Sidebar de Filtros */}
          <div className="w-full lg:w-1/4">
            <div className="flex justify-center lg:justify-start">
              <SearchBar3 /> 
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

            {/* 🔹 Ahora ProductGrid recibe el query */}
            <ProductGrid query={query} />

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
