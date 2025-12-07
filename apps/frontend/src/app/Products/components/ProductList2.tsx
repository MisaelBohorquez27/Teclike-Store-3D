"use client";

import { ProductCard } from "@/app/Products/components/ProductCard";
import Pagination from "@/components/Pagination";
import { SearchBar } from "@/components/SearchBar";
import { FilterSidebar } from "./FilterSidebar";
import { useProductLoader } from "@/hooks/useProductLoader";
import { motion, AnimatePresence } from "framer-motion";

export function ProductList2() {
  const { 
    products, 
    loading, 
    currentPage, 
    totalPages, 
    setCurrentPage 
  } = useProductLoader();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500 mb-4"></div>
          <p className="text-gray-400">Cargando productos...</p>
        </div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="max-w-md mx-auto">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
            <span className="text-3xl">🔍</span>
          </div>
          <h3 className="text-2xl font-bold text-white mb-3">
            No se encontraron productos
          </h3>
          <p className="text-gray-400 mb-6">
            Intenta con otros filtros o categorías
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="flex flex-col lg:flex-row gap-6 md:gap-8">
        {/* Sidebar - Se mantiene estable */}
        <div className="lg:w-1/4">
          <div className="sticky top-24">
            <div className="mb-6">
              <SearchBar />
            </div>
            <FilterSidebar />
          </div>
        </div>

        {/* Contenido Principal */}
        <div className="lg:w-3/4">
          <div className="mb-8">
            {/* Encabezado con resultados */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-white">
                  Productos
                </h2>
                <p className="text-gray-400 text-sm mt-1">
                  Mostrando {products.length} resultados
                </p>
              </div>
              <div className="px-3 py-1.5 rounded-full bg-gray-800/50 text-gray-300 text-sm">
                Página {currentPage} de {totalPages}
              </div>
            </div>

            {/* Grid de productos con animación */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`page-${currentPage}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {products.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <ProductCard product={product} />
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Paginación */}
          <div className="mt-8">
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