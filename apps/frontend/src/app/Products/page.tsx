"use client";
import { useState } from "react";
import { ProductGrid } from "@/app/Products/ProductGrid";
import { ProductHero } from "./ProductHero";
import { SearchBar3 } from "@/components/ui/SearchBar3";
import { ProductList } from "./ProductList";
import { ProductList2 } from "../Search/ProductList2";

export default function ProductPage() {
  const [query] = useState(""); // <-- Estado de búsqueda

  return (
    <main className="PageProducts-bg min-h-[calc(100vh-4rem)] md:min-h-screen relative overflow-hidden">
      {/* Hero Banner */}
      <ProductHero />

      {/* Contenido Principal */}
      <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-10 md:py-12">
        <div className="flex flex-col lg:flex-col gap-6 md:gap-8 items-center">
          {/* Sidebar de Filtros */}
          <div className="w-full flex justify-center pb-10">
            <SearchBar3 />
          </div>

          {/* Grid de Productos */}
          <div className="w-full">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 md:mb-8 gap-4 sm:gap-0">
              <h2 className="TitleColor text-xl sm:text-2xl font-semibold">
                Todos los Productos
              </h2>
            </div>
            {/* 🔹 Ahora ProductGrid recibe el query */}
            <ProductGrid query={query} />
          </div>
          <div className="w-full mt-10">
            <h2> Product con paginacion </h2>
            <ProductList2 />
          </div>
        </div>
      </div>
    </main>
  );
}
