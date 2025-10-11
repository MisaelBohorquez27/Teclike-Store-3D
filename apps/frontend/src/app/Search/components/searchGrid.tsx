"use client";

import Link from "next/link";
import { SearchProductCard } from "./searchProductCard";
import { SearchResult } from "@/types/searchSuggestions";

export function SearchGrid({
  results,
  pagination,
  query,
}: {
  results: SearchResult[];
  pagination: {
    page: number;
    totalPages: number;
    hasMore: boolean;
  };
  query: string;
}) {
  return (
    <div>
      {/* Grid de productos */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-5 md:gap-6">
        {results.map((p) => (
          <SearchProductCard key={p.id} product={p} />
        ))}
      </div>

      {/* Paginación */}
      <div className="flex justify-center gap-3 mt-6">
        {pagination.page > 1 && (
          <Link
            href={`/Search?q=${encodeURIComponent(query)}&page=${pagination.page - 1}`}
            className="px-3 py-1 border rounded"
          >
            Anterior
          </Link>
        )}
        {pagination.page < pagination.totalPages && (
          <Link
            href={`/Search?q=${encodeURIComponent(query)}&page=${pagination.page + 1}`}
            className="px-3 py-1 border rounded"
          >
            Siguiente
          </Link>
        )}
      </div>
    </div>
  );
}
