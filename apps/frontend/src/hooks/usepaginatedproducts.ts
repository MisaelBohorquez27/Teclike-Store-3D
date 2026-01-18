// hooks/usePaginatedProducts.ts
'use client';

import { useState, useCallback } from 'react';
import { fetchPaginatedProducts } from '@/services/products';

export const usePaginatedProducts = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 12,
    total: 0,
    totalPages: 1,
    hasMore: false,
  });

  const loadProducts = useCallback(async (
    page: number = 1,
    limit: number = 12,
  ) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetchPaginatedProducts(page, limit);
      
      setProducts(response.items);
      setPagination(response.pagination);
      
      return response;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al cargar productos';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  const loadNextPage = useCallback(async () => {
    if (pagination.hasMore) {
      return loadProducts(pagination.page + 1, pagination.limit);
    }
  }, [pagination, loadProducts]);

  const refresh = useCallback(async () => {
    return loadProducts(1, pagination.limit);
  }, [loadProducts, pagination.limit]);

  return {
    products,
    loading,
    error,
    pagination,
    loadProducts,
    loadNextPage,
    refresh,
    hasMore: pagination.hasMore
  };
};