import { useEffect, useState } from "react";
import { ProductForCard } from "../types/productss";
import { fetchAllProducts } from "../services/products";

export const useTrendingProducts = () => {
  const [products, setProducts] = useState<ProductForCard[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const response = await fetchAllProducts();
        setProducts(response.items);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  return { products, loading };
};