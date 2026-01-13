"use client";

import { ProductCard } from "@/app/Products/components/ProductCard";
import Pagination from "@/components/common/Pagination";
import { SearchBar } from "@/components/common/SearchBar";
import { FilterSidebar } from "./FilterSidebar";
import { useProductLoader } from "@/hooks/useProductLoader";
import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";

// Skeleton EXACTO mismo tamaño que ProductCard
const ProductSkeleton = () => (
  <div className="h-[420px] bg-gradient-to-br from-gray-900/60 to-black/60 backdrop-blur-sm border border-gray-800/50 rounded-2xl p-4 animate-pulse">
    <div className="h-48 mb-4 rounded-xl bg-gray-800/50" />
    <div className="space-y-3">
      <div className="h-4 bg-gray-800/50 rounded w-1/4" />
      <div className="h-6 bg-gray-800/50 rounded w-3/4" />
      <div className="flex gap-1">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-4 w-4 bg-gray-800/50 rounded" />
        ))}
      </div>
      <div className="h-12 bg-gray-800/50 rounded" />
    </div>
  </div>
);

export function ProductList2() {
  const { 
    products, 
    loading, 
    currentPage, 
    totalPages, 
    setCurrentPage 
  } = useProductLoader();

  const gridRef = useRef<HTMLDivElement>(null);
  const [gridHeight, setGridHeight] = useState(600); // Altura inicial

  // Medir altura del grid cuando cambia
  useEffect(() => {
    if (gridRef.current) {
      // Usar requestAnimationFrame para medición precisa
      requestAnimationFrame(() => {
        const height = gridRef.current?.offsetHeight || 600;
        setGridHeight(height);
      });
    }
  }, [products, loading]);

  return (
    <div className="w-full">
      <div className="flex flex-col lg:flex-row gap-6 md:gap-8 pb-28 md:pb-32">
        {/* Sidebar */}
        <div className="lg:w-1/4">
          <div className="relative top-24">
            <div className="mb-6">
              <SearchBar />
            </div>
            <FilterSidebar />
          </div>
        </div>

        {/* Contenido Principal */}
        <div className="lg:w-3/4">
          {/* Encabezado */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-white">Productos</h2>
              <p className="text-gray-400 text-sm mt-1">
                {loading ? "Cargando..." : `${products.length} resultados`}
              </p>
            </div>
            <div className={`px-3 py-1.5 rounded-full transition-all duration-300 ${
              loading 
                ? "bg-cyan-500/20 text-cyan-300" 
                : "bg-gray-800/50 text-gray-300"
            }`}>
              Página {currentPage} de {totalPages}
            </div>
          </div>

          {/* Grid con ALTURA FIJA */}
          <div 
            className="relative mb-8 transition-all duration-300"
            style={{ minHeight: `${gridHeight}px` }}
          >
            <div ref={gridRef}>
              <motion.div
                key={`page-${currentPage}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {loading ? (
                  // Skeletons (MISMA CANTIDAD que los productos esperados)
                  [...Array(6)].map((_, index) => (
                    <ProductSkeleton key={`skeleton-${index}`} />
                  ))
                ) : (
                  // Productos reales
                  products.map((product, index) => (
                    <motion.div
                      key={`${product.id}-${index}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ 
                        duration: 0.4,
                        delay: index * 0.05,
                        ease: "easeOut"
                      }}
                    >
                      <ProductCard product={product} />
                    </motion.div>
                  ))
                )}
              </motion.div>
            </div>

            {/* Overlay de carga muy sutil */}
            {loading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute inset-0 bg-black/10 backdrop-blur-[1px] rounded-2xl"
              />
            )}
          </div>

          {/* Paginación - Fuera del contenedor de altura fija */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>
    </div>
  );
}