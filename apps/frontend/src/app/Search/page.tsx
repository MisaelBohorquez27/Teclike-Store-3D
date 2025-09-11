"use client";
import { useSearchParams } from "next/navigation";
import { ProductHero } from "../Products/ProductHero";
import { SearchBar3 } from "@/components/ui/SearchBar3";
import { FilterSidebar } from "../Products/FilterSidebar";
import { SearchResults } from "./SearchResults";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";

  return (
    <main className="PageProducts-bg min-h-[calc(100vh-4rem)] md:min-h-screen relative overflow-hidden">
      {/* HeroBanner de la página */}
      <ProductHero />
      <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-10 md:py-12">
        <div className="flex flex-col lg:flex-row gap-6 md:gap-8">
          {/* SideBar de Filtros */}
          <div className="w-full lg:w-1/4">
            <div className="flex justify-center lg:justify-start">
              <SearchBar3 />
            </div>
            <aside>
              <FilterSidebar />
            </aside>
          </div>
          <div className="w-full lg:w-3/4">
            {/* Grid de productos */}
            <SearchResults query={query} />
          </div>
        </div>
      </div>
    </main>
  );
}
