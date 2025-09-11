"use client";

import { useEffect, useState } from "react";
import { ProductCard } from "@/app/Products/ProductCard";
import { Product } from "@/types/products";
import Pagination from "@/components/ui/Pagination";
import { fetchPaginatedProducts } from "@/services/NewProductService";

export function ProductList2({ query }: { query?: string }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // 🔹 Mejor: constante configurable (no necesitas `useState`)
  const postsPerPage = 8;

  useEffect(() => {
    setLoading(true);
    fetchPaginatedProducts(currentPage, postsPerPage)
      .then((res) => {
        setProducts(res.items);
        setTotalPages(res.pagination.totalPages);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [currentPage, postsPerPage]);

  if (loading) return <p className="text-center">Cargando productos...</p>;
  if (products.length === 0)
    return <p className="text-center">No se encontraron productos</p>;

  return (
    <div className="w-full">
      <div className="flex flex-col justify-between items-start sm:items-center mb-6 md:mb-8 gap-4 sm:gap-0">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* 🔹 Ahora Pagination controla el flujo desde el backend */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
}
