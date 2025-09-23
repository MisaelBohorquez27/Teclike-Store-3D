// components/ProductList2/hooks/useProductLoader.ts
import { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import { fetchProductsBase } from "@/services/NewProductService";
import { ProductForDetail } from "@/types/productss";

const POSTS_PER_PAGE = 6;

export function useProductLoader(searchParams: URLSearchParams) {
  const paramsString = searchParams?.toString() ?? "";

  const [products, setProducts] = useState<ProductForDetail[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Reiniciar página cuando cambian los params
  useEffect(() => {
    setCurrentPage(1);
  }, [paramsString]);

  const loadProducts = useCallback(async () => {
    setLoading(true);
    try {
      const filters = buildFilters(searchParams, currentPage);
      const res = await fetchProductsBase(filters);
      
      const productsForDetail: ProductForDetail[] = res.items.map((product: any) => ({
        ...product,
        originalPrice: product.originalPrice ?? product.price ?? "0",
      }));
      
      setProducts(productsForDetail);
      setTotalPages(res.pagination?.totalPages ?? 1);
    } catch (err) {
      console.error("❌ Error cargando productos:", err);
      setProducts([]);
      setTotalPages(1);
    } finally {
      setLoading(false);
    }
  }, [currentPage, searchParams]);

  // Cargar productos cuando cambian las dependencias
  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  return {
    products,
    loading,
    currentPage,
    totalPages,
    setCurrentPage
  };
}

// Función helper para construir los filtros
function buildFilters(searchParams: URLSearchParams, currentPage: number) {
  const q = searchParams.get("q") ?? undefined;
  const categoryParam = searchParams.get("category") ?? undefined;
  const minPriceParam = searchParams.get("minPrice");
  const maxPriceParam = searchParams.get("maxPrice");
  const inStockParam = searchParams.get("inStock");

  const filters: any = {
    page: currentPage,
    limit: POSTS_PER_PAGE,
  };

  if (q && q.trim().length >= 1) filters.q = q.trim();
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

  return filters;
}