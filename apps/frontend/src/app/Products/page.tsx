"use client";
import { ImageUploader } from "@/components/ImageUpload";
import { ProductHero } from "./components/ProductHero";
import { ProductList2 } from "./components/ProductList2";

export default function ProductPage() {

  return (
    <main className="min-h-[calc(100vh-4rem)] md:min-h-screen relative overflow-hidden section-bg-2 text-neutral">
      {/* Hero Banner */}
      <ProductHero />
      <ImageUploader />

      {/* Contenido Principal */}
      <div className="container mx-auto px-4 sm:px-6 py-2">
        <ProductList2 />
      </div>
    </main>
  );
}
