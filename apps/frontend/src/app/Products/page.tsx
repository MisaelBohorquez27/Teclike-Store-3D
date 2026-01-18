"use client";
import { Suspense } from "react";
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
        <Suspense fallback={<div className="text-center py-10"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div></div>}>
          <ProductList2 />
        </Suspense>
      </div>
    </>
  );
}
