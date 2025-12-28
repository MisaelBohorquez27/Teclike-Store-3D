"use client";
import { ImageUploader } from "@/components/unUsed/ImageUpload";
import { ProductHero } from "./components/ProductHero";
import { ProductList2 } from "./components/ProductList2";

export default function ProductPage() {

  return (
    <>
      {/* Hero Banner */}
      <ProductHero />

      {/* Contenido Principal */}
      <div className="container mx-auto px-4 sm:px-6 py-2">
        <ProductList2 />
      </div>
    </>
  );
}
