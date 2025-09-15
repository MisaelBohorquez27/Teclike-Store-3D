// components/ProductList2.tsx (o donde lo tengas)
"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { ProductCard } from "@/app/Products/ProductCard";
import { Product } from "@/types/products";
import Pagination from "@/components/ui/Pagination";
import { fetchProductsBase } from "@/services/NewProductService"; // usa fetchProductsBase para poder pasar q y filtros
import { SearchBar3 } from "@/components/ui/SearchBar3";
import { FilterSidebar } from "./FilterSidebar";

export function ProductList2() {
  const searchParams = useSearchParams();
  const paramsString = searchParams?.toString() ?? "";

  const q = searchParams.get("q") ?? undefined;
  const categoryParam = searchParams.get("category") ?? undefined; // puede ser "Mice" o "Mice,Keyboards"
  const minPriceParam = searchParams.get("minPrice");
  const maxPriceParam = searchParams.get("maxPrice");
  const inStockParam = searchParams.get("inStock");

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const postsPerPage = 6;

  // cuando cambian los params (query/filtros) reiniciamos página a 1
  useEffect(() => {
    setCurrentPage(1);
  }, [paramsString]);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        // parse params seguros
        const filters: any = {
          page: currentPage,
          limit: postsPerPage,
        };

        if (q && q.trim().length >= 1) filters.q = q.trim();

        // Si category tiene varias separadas por coma, las dejamos como string
        // (ver nota abajo: backend puede soportar CSV o solo 1 categoría)
        if (categoryParam) filters.category = categoryParam;

        if (minPriceParam) {
          const min = Number(minPriceParam);
          if (!Number.isNaN(min)) filters.minPrice = min;
        }
        if (maxPriceParam) {
          const max = Number(maxPriceParam);
          if (!Number.isNaN(max)) filters.maxPrice = max;
        }
        if (inStockParam !== null) {
          if (inStockParam === "true") filters.inStock = true;
          else if (inStockParam === "false") filters.inStock = false;
        }

        const res = await fetchProductsBase(filters);
        setProducts(res.items);
        setTotalPages(res.pagination?.totalPages ?? 1);
      } catch (err) {
        console.error("❌ Error cargando productos:", err);
        setProducts([]);
        setTotalPages(1);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [currentPage, postsPerPage, paramsString]); // paramsString incluye q y filtros

  if (loading) return <p className="text-center">Cargando productos...</p>;
  if (products.length === 0)
    return <p className="text-center">No se encontraron productos</p>;

  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row gap-6 md:gap-8">
        <div className="md:w-1/4 flex-col justify-center py-5 md:justify-start items-center md:items-start">
          <div className="w-full ">
            <SearchBar3 />
          </div>
          <div className="w-full">
            <aside>
              <FilterSidebar />
            </aside>
          </div>
        </div>

        <div className="md:w-3/4 mt-5">
          <div className="flex flex-col justify-between items-start sm:items-center mb-6 md:mb-8 gap-4 sm:gap-0">
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={(p) => setCurrentPage(p)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
