"use client";
import { SearchBar } from "@/components/common/SearchBar";
import { ProductHero } from "../Products/components/ProductHero";
import { SearchResults } from "./components/SearchResults";

export default function SearchPage() {
  return (
    <main className="section-bg-2 text-neutral min-h-[calc(100vh-4rem)] md:min-h-screen relative overflow-hidden">
      {/* HeroBanner de la página */}
      <ProductHero />
      <div className="container mx-auto px-4 sm:px-6 pb-15 pt-5 md:pb-20 md:pt-5 max-w-6xl">
        <div className="flex justify-center">
          <SearchBar />
        </div>
        <div className="w-full flex justify-center">
          {/* Grid de productos */}
          <SearchResults />
        </div>
      </div>
    </main>
  );
}
