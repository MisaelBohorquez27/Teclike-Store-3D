"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { ProductCard } from "@/app/products/components/productcard";
import Pagination from "@/components/common/pagination";
import { fetchSearchResults } from "@/services/search";
import { ProductForDetail } from "@/types/productss";

export function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";

  const [products, setProducts] = useState<ProductForDetail[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const postsPerPage = 6;

  useEffect(() => {
    if (!query) return;
    setLoading(true);

    fetchSearchResults(query, { page: currentPage, limit: postsPerPage })
      .then((res: any) => {
        if (!res.success || !res.data) {
          setProducts([]);
          setTotalPages(1);
          return;
        }

        setProducts(
          res.data.map((item: any) => ({
            ...item,
            originalPrice: item.originalPrice ?? item.price ?? "0",
          }))
        );
        setTotalPages(res.pagination?.totalPages ?? 1);
      })
      .catch((err) => {
        // Search error
      })
      .finally(() => setLoading(false));
  }, [query, currentPage, postsPerPage]);

  if (loading) return <p className="text-center">Cargando productos...</p>;
  if (products.length === 0)
    return <p className="text-center">No se encontraron productos</p>;

  return (
    <div className="w-full py-10">
      {query && query.trim().length >= 2 && (
        <h2 className="TitleColor text-xl sm:text-2xl font-semibold py-10">
          Resultados para: <span className="text-blue-600">{query}</span>
        </h2>
      )}

      <div className="grid grid-cols-2 md:grid-cols-3 gap-5 md:gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}
