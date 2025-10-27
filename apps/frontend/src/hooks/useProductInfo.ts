// hooks/useProductInfo.ts
import { useState, useEffect } from "react";
import { fetchProductBySlug } from "@/services/products";
import { ProductForDetail } from "@/types/productss";

export function useProductInfo(productSlug?: string) {
  const [product, setProduct] = useState<ProductForDetail | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!productSlug || productSlug.trim() === "") {
      setProduct(null);
      setError("Slug de producto no proporcionado");
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    fetchProductBySlug(productSlug)
      .then((data) => {
        if (!data) {
          setError("Producto no encontrado");
          setProduct(null);
        } else {
          setProduct(data);
        }
      })
      .catch(() => {
        setError("Error al cargar el producto");
        setProduct(null);
      })
      .finally(() => setLoading(false));
  }, [productSlug]);

  return { product, loading, error };
}