"use client";

import { useState, useCallback, useEffect } from "react";
import { CheckoutService } from "@/services/checkoutservice";
import { CheckoutSummary } from "@/types/checkout";

interface UseCheckoutReturn {
  summary: CheckoutSummary | null;
  loading: boolean;
  error: string | null;
  fetchSummary: () => Promise<void>;
  formatTotal: (amount: number) => string;
}

export const useCheckout = (): UseCheckoutReturn => {
  const [summary, setSummary] = useState<CheckoutSummary | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Obtener resumen del checkout
  const fetchSummary = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const checkoutSummary = await CheckoutService.getCheckoutSummary();
      setSummary(checkoutSummary);
      console.log('✅ Resumen cargado:', checkoutSummary);
    } catch (err: any) {
      const errorMessage = err.message || "Error al cargar el resumen";
      console.error(errorMessage);
      setError(errorMessage);
      setSummary(null);
    } finally {
      setLoading(false);
    }
  }, []);

  // Cargar resumen al montar
  useEffect(() => {
    fetchSummary();
  }, [fetchSummary]);

  // Formatear moneda
  const formatTotal = useCallback((amount: number) => {
    return CheckoutService.formatCurrency(amount, summary?.currency || 'USD');
  }, [summary?.currency]);

  return {
    summary,
    loading,
    error,
    fetchSummary,
    formatTotal,
  };
};
