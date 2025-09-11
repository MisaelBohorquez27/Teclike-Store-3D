"use client";

import { useEffect, useState } from "react";
import { ProductCard } from "@/app/Products/ProductCard";
import { fetchPaginatedProducts } from "@/services/PaginatedProducts";
import { Product } from "@/types/products";
import Pagination from "@/components/ui/Pagination";

export function ProductList( ) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(2);

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
  if (products.length === 0) return <p className="text-center">No se encontraron productos</p>;

  return (
    <div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-6">
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
