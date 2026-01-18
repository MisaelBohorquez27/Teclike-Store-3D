"use client";
import { Suspense } from "react";
import { SearchBar } from "@/components/common/searchbar";
import { ProductHero } from "../Products/components/producthero";
import { SearchResults } from "./components/searchresults";

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
          <Suspense fallback={<div className="text-center py-10"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div></div>}>
            <SearchResults />
          </Suspense>
        </div>
      </div>
    </main>
  );
}
