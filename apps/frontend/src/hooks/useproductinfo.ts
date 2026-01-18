// hooks/useProductInfo.ts
import { useState, useEffect } from "react";
import { fetchProductBySlug } from "@/services/products";
import { ProductForDetail } from "@/types/productss";

export function useProductInfo(productSlug?: string) {
  const [product, setProduct] = useState<ProductForDetail | null>(null);
  const [loading, setLoading] = useState(true); // ✅ IMPORTANTE: Iniciar en true
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!productSlug || productSlug.trim() === "") {
      setProduct(null);
      setError("Slug de producto no proporcionado");
      setLoading(false);
      return;
    }

    // ✅ Limpiar estado ATOMICAMENTE (todo a la vez)
    setLoading(true);
    setError(null);
    setProduct(null);

    // Delay mínimo de 500ms para mejor UX (evita flash de loading)
    const minLoadTime = new Promise(resolve => setTimeout(resolve, 500));
    
    // ✅ Cancelación de requests si el componente se desmonta
    let isMounted = true;

    Promise.all([
      fetchProductBySlug(productSlug),
      minLoadTime
    ])
      .then(([data]) => {
        if (!isMounted) return;
        
        if (!data) {
          setError("Producto no encontrado");
          setProduct(null);
        } else {
          setProduct(data);
          setError(null);
        }
      })
      .catch((err) => {
        if (!isMounted) return;
        setError(err?.message || "Error al cargar el producto");
        setProduct(null);
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    // ✅ Limpiar flag si el componente se desmonta
    return () => {
      isMounted = false;
    };
  }, [productSlug]);

  return { product, loading, error };
}