// hooks/useProductInfo.ts
import { useState, useEffect } from "react";
import { fetchProductById } from "@/services/products";
import { ProductForDetail } from "@/types/productss";

export function useProductInfo(productIdParam: string | string[] | undefined) {
  const [product, setProduct] = useState<ProductForDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const productId = Number(productIdParam);
        
        if (isNaN(productId)) {
          throw new Error("ID de producto inválido");
        }

        const productData = await fetchProductById(productId);
        setProduct(productData);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error al cargar el producto");
      } finally {
        setLoading(false);
      }
    };

    if (productIdParam) {
      loadProduct();
    } else {
      setLoading(false);
      setError("ID de producto no proporcionado");
    }
  }, [productIdParam]);

  return {
    product,
    loading,
    error
  };
}