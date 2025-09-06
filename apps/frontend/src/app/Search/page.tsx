"use client";

import { useEffect, useState } from "react";
import { fetchSearchResults, SearchResult } from "@/services/Search";
import { useSearchParams } from "next/navigation";
import { SearchGrid } from "./searchGrid";
import { ProductHero } from "../Products/ProductHero";
import { SearchBar3 } from "@/components/ui/SearchBar3";
import { FilterSidebar } from "../Products/FilterSidebar";

export default function SearchPage() {
  const params = useSearchParams();
  const query = params.get("q") || ""; // query ?q=mouse
  const page = parseInt(params.get("page") || "1", 10);

  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 12,
    total: 0,
    totalPages: 1,
    hasMore: false,
  });

  useEffect(() => {
    if (!query) return;

    setLoading(true);
    fetchSearchResults(query, { page, limit: 12 })
      .then((res) => {
        setResults(res.data);
        setPagination(res.pagination);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [query, page]);

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
          {/* Grid de productos */}
          <div className="w-full lg:w-3/4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 md:mb-8 gap-4 sm:gap-0">
              <h1 className="TitleColor text-xl sm:text-2xl font-semibold">
                Resultados de: "{query}"
              </h1>
            </div>

            <SearchGrid
              results={results}
              pagination={pagination}
              query={query}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
