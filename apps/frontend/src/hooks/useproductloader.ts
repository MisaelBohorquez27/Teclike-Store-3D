// components/ProductList2/hooks/useProductLoader.ts
"use client";

import { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import { ProductForDetail } from "@/types/productss";
import { fetchAllProducts } from "@/services/products";

const POSTS_PER_PAGE = 6;

export function useProductLoader() {
  const searchParams = useSearchParams();
  
  const [products, setProducts] = useState<ProductForDetail[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Extraer parámetros una vez
  const q = searchParams?.get("q") ?? "";
  const category = searchParams?.get("category") ?? "";
  const minPrice = searchParams?.get("minPrice") ?? "";
  const maxPrice = searchParams?.get("maxPrice") ?? "";
  const inStock = searchParams?.get("inStock") ?? "";

  // Construir filtros solo cuando cambian los parámetros
  const buildFilters = useCallback((page: number = currentPage) => {
    const filters: any = {
      page: page,
      limit: POSTS_PER_PAGE,
    };

    if (q && q.trim().length >= 1) filters.q = q.trim();
    if (category) filters.category = category;

    if (minPrice) {
      const min = Number(minPrice);
      if (!Number.isNaN(min) && min > 0) filters.minPrice = min;
    }

    if (maxPrice) {
      const max = Number(maxPrice);
      if (!Number.isNaN(max) && max > 0) filters.maxPrice = max;
    }

    if (inStock !== "") {
      if (inStock === "true") filters.inStock = true;
      else if (inStock === "false") filters.inStock = false;
    }

    return filters;
  }, [currentPage, q, category, minPrice, maxPrice, inStock]);

  // Función para cargar productos
  const loadProducts = useCallback(async (page: number = currentPage) => {
    setLoading(true);
    try {
      const filters = buildFilters(page);
      const res = await fetchAllProducts(filters);
      
      const productsForDetail: ProductForDetail[] = res.items.map((product: any) => ({
        ...product,
        originalPrice: product.originalPrice ?? product.price ?? "0",
      }));
      
      setProducts(productsForDetail);
      setTotalPages(res.pagination?.totalPages ?? 1);
      setCurrentPage(page);
    } catch (err) {
      setProducts([]);
      setTotalPages(1);
    } finally {
      setLoading(false);
    }
  }, [buildFilters, currentPage]);

  // Cargar productos cuando cambian los filtros
  useEffect(() => {
    // Solo cargar si hay cambios reales en los filtros
    loadProducts(1);
  }, [q, category, minPrice, maxPrice, inStock]);

  // Cargar productos cuando cambia la página
  const handlePageChange = useCallback((page: number) => {
    // Prevenir carga si es la misma página
    if (page === currentPage) return;
    
    loadProducts(page);
  }, [currentPage, loadProducts]);

  return {
    products,
    loading,
    currentPage,
    totalPages,
    setCurrentPage: handlePageChange
  };
}