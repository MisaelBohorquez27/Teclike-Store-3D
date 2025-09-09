// components/ProductGrid.tsx
"use client";

import { useEffect, useState } from "react";
import { fetchPaginatedProducts } from "@/services/PaginatedProducts";
import { Product } from "@/types/products";

interface PaginationInfo {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasMore: boolean;
}

export default function ProductGrid() {
  const [products, setProducts] = useState<Product[]>([]);
  const [pagination, setPagination] = useState<PaginationInfo | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        
        console.log('Cargando productos, página:', currentPage);
        
        const response = await fetchPaginatedProducts(currentPage, 12);
        
        console.log('Respuesta recibida:', response);
        
        // Manejar diferentes formatos de respuesta
        if (response) {
          // Si la respuesta tiene items
          if (response.items) {
            setProducts(response.items);
            setPagination(response.pagination);
          } 
          // Si la respuesta tiene data (formato alternativo)
          else if (response.data) {
            setProducts(response.data);
            setPagination(response.pagination);
          }
          // Si es un array directo
          else if (Array.isArray(response)) {
            setProducts(response);
            setPagination({
              page: currentPage,
              limit: 12,
              total: response.length,
              totalPages: 1,
              hasMore: false
            });
          } else {
            console.warn('Formato de respuesta inesperado:', response);
            setProducts([]);
            setPagination(null);
          }
        } else {
          setProducts([]);
          setPagination(null);
        }
      } catch (err) {
        console.error("Error loading products:", err);
        setError(err instanceof Error ? err.message : "Error al cargar los productos");
        setProducts([]);
        setPagination(null);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [currentPage]);

  const handlePageChange = (newPage: number) => {
    if (!pagination || (newPage >= 1 && newPage <= pagination.totalPages)) {
      setCurrentPage(newPage);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Componente de paginación simple
  const SimplePagination = () => {
    if (!pagination || pagination.totalPages <= 1) return null;

    return (
      <div className="flex items-center gap-2 justify-center mt-8">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-2 border border-gray-300 rounded-md text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
        >
          ← Anterior
        </button>

        {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((pageNum) => (
          <button
            key={pageNum}
            onClick={() => handlePageChange(pageNum)}
            className={`px-3 py-2 border rounded-md text-sm min-w-[44px] ${
              currentPage === pageNum
                ? "bg-blue-600 text-white border-blue-600"
                : "border-gray-300 hover:bg-gray-50"
            }`}
          >
            {pageNum}
          </button>
        ))}

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === pagination.totalPages}
          className="px-3 py-2 border border-gray-300 rounded-md text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
        >
          Siguiente →
        </button>
      </div>
    );
  };

  if (error) {
    return (
      <section className="space-y-6 p-6">
        <h2 className="text-2xl font-bold text-gray-800">Productos</h2>
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-800 font-semibold">Error:</p>
          <p className="text-red-700 mt-1">{error}</p>
          <p className="text-red-600 text-sm mt-2">
            Verifica la consola para más detalles
          </p>
          <button
            onClick={() => {
              setCurrentPage(1);
              setError(null);
            }}
            className="mt-3 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Reintentar
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="space-y-6 p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Productos</h2>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
          <p className="text-gray-600">Cargando productos...</p>
        </div>
      ) : (
        <>
          {/* Grid de productos */}
          {products.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products.map((product) => (
                  <div 
                    key={product.id} 
                    className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-300 bg-white"
                  >
                    <div className="relative mb-3">
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="w-full h-48 object-cover rounded-lg mb-3"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = '/placeholder-product.png';
                        }}
                      />
                      {product.isNew && (
                        <span className="absolute top-2 left-2 bg-green-600 text-white text-xs px-2 py-1 rounded-full">
                          Nuevo
                        </span>
                      )}
                    </div>
                    
                    <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                      {product.name}
                    </h3>
                    
                    <p className="text-xl font-bold text-green-700 mb-2">
                      {product.currency} {typeof product.price === 'number' ? product.price.toLocaleString() : product.price}
                    </p>
                    
                    <p className="text-sm text-gray-600 mb-3 capitalize">
                      {product.category}
                    </p>
                  </div>
                ))}
              </div>

              {/* Información de resultados */}
              {pagination && (
                <div className="text-center text-sm text-gray-600 mt-4">
                  Mostrando {products.length} de {pagination.total} productos
                  {pagination.totalPages > 1 && (
                    <span> - Página {currentPage} de {pagination.totalPages}</span>
                  )}
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <p className="text-gray-500 text-lg">No se encontraron productos</p>
              <p className="text-gray-400 text-sm mt-1">
                Intenta ajustar los filtros o vuelve más tarde
              </p>
            </div>
          )}

          {/* Paginación */}
          <SimplePagination />
        </>
      )}
    </section>
  );
}