"use client";

import { useEffect, useState } from "react";
import { ProductCard } from "@/app/Products/ProductCard";
import { Product } from "@/types/products";
import { fetchProducts } from "@/services/products";

export function ProductGrid({ query }: { query: string }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);


  useEffect(() => {
    setLoading(true);
    fetchProducts(query)
      .then((res) => {
        setProducts(res);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [query, currentPage]);

  if (loading) return <p className="text-center">Cargando productos...</p>;
  if (products.length === 0) return <p className="text-center">No se encontraron productos</p>;

  return (
    <div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
