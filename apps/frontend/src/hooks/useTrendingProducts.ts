import { useEffect, useState } from "react";
import { Product } from "../types/products";
import { fetchProductsBase } from "@/services/NewProductService";

export const useTrendingProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const response = await fetchProductsBase();
        setProducts(response.items);
      } catch (error) {
        console.error("Error loading trending products:", error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  return { products, loading };
};