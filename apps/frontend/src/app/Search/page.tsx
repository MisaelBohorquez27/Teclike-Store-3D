"use client";
import { SearchBar3 } from "@/components/ui/SearchBar3";
import { ProductHero } from "../Products/ProductHero";
import { SearchResults } from "./components/SearchResults";

export default function SearchPage() {
  return (
    <main className="PageProducts-bg min-h-[calc(100vh-4rem)] md:min-h-screen relative overflow-hidden">
      {/* HeroBanner de la página */}
      <ProductHero />
      <div className="container mx-auto px-4 sm:px-6 pb-15 pt-5 md:pb-20 md:pt-5 max-w-6xl">
        <div className="flex justify-center">
          <SearchBar3 />
        </div>
        <div className="w-full flex justify-center">
          {/* Grid de productos */}
          <SearchResults />
        </div>
      </div>
    </main>
  );
}
