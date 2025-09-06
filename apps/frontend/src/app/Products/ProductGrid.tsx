"use client";

import { useEffect, useState } from "react";
import { ProductCard } from "@/app/Products/ProductCard";
import { fetchProducts } from "@/services/products";
import { Product } from "@/types/products";

export function ProductGrid({ query }: { query: string }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    fetchProducts(query) // 👈 ahora acepta query
      .then(setProducts)
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [query]);

  if (loading) return <p className="text-center">Cargando productos...</p>;

  if (products.length === 0)
    return <p className="text-center">No se encontraron productos</p>;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-5 md:gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
