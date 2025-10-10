// components/ProductList2.tsx
"use client";

import { useSearchParams } from "next/navigation";
import { ProductCard } from "@/app/Products/components/ProductCard";
import Pagination from "@/components/ui/Pagination";
import { SearchBar3 } from "@/components/ui/SearchBar3";
import { FilterSidebar } from "./FilterSidebar";
import { useProductLoader } from "@/hooks/useProductLoader";

export function ProductList2() {
  const searchParams = useSearchParams();
  
  const { 
    products, 
    loading, 
    currentPage, 
    totalPages, 
    setCurrentPage 
  } = useProductLoader(searchParams);

  if (loading) return <p className="text-center">Cargando productos...</p>;
  if (products.length === 0)
    return <p className="text-center">No se encontraron productos</p>;

  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row gap-6 md:gap-8">
        <div className="md:w-1/4 flex flex-col justify-center py-5 md:justify-start items-center md:items-start">
          <div className="w-full flex justify-center">
            <SearchBar3 />
          </div>
          <div className="w-full flex justify-center md:justify-start">
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
              onPageChange={setCurrentPage}
            />
          </div>
        </div>
      </div>
    </div>
  );
}