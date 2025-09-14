"use client";
import { useState } from "react";
import { ProductHero } from "./ProductHero";
import { SearchBar3 } from "@/components/ui/SearchBar3";
import { ProductList2 } from "./ProductList2";
import { FilterSidebar } from "./FilterSidebar";

export default function ProductPage() {
  const [query] = useState(""); // <-- Estado de búsqueda

  return (
    <main className="PageProducts-bg min-h-[calc(100vh-4rem)] md:min-h-screen relative overflow-hidden">
      {/* Hero Banner */}
      <ProductHero />

      {/* Contenido Principal */}
      <div className="container mx-auto px-4 sm:px-6 py-2">
        <div className="flex flex-col md:flex-row gap-6 md:gap-8">
          {/* Sidebar de Filtros */}
          <div className="md:w-1/4 flex-col justify-center py-5 md:justify-start items-center md:items-start">
            <div className="w-full ">
              <SearchBar3 />
            </div>
            <div className="w-full">
              <aside>
                {/* <FilterSidebar /> */}
                <FilterSidebar />
              </aside>
            </div>
          </div>

          <div className="md:w-3/4 mt-5">
            <ProductList2 />
          </div>
        </div>
      </div>
    </main>
  );
}
