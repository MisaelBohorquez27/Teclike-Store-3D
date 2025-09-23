"use client";
import { ProductHero } from "./ProductHero";
import { ProductList2 } from "./ProductList2";

export default function ProductPage() {

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
