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
        <ProductList2 />
      </div>
    </main>
  );
}
