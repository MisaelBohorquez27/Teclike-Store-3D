"use client";
import { FilterSidebar } from "@/app/Products/FilterSidebar";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { ProductGrid } from "@/app/Products/ProductGrid";
import { Pagination } from "@/components/ui/Pagination";
import { useState } from "react";

export default function ProductPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 10; // Total de páginas disponibles

  return (
    <>
      {/* Navbar */}
      <Navbar />

      <main className="bg-gray-50 min-h-screen">
        {/* Hero Banner */}
        <section className="bg-gradient-to-b from-[#000712] to-[#00183f] py-20 text-white">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-5xl font-bold mb-4">Nuestra Colección</h1>
            <p className="text-2xl opacity-90">
              Encuentra los mejores productos para tus proyectos
            </p>
          </div>
        </section>

        {/* Contenido Principal */}
        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-col md:flex-row gap-8">

            {/* Sidebar de Filtros */}
            <div className="md:w-1/4">
              <FilterSidebar />
            </div>

            {/* Grid de Productos */}
            <div className="md:w-3/4">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-semibold">Todos los Productos</h2>
                <div className="flex items-center">
                  <span className="mr-2">Ordenar por:</span>
                  <select className="border rounded-md px-3 py-1">
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
                className="mt-8" // Clases adicionales si necesitas
              />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
