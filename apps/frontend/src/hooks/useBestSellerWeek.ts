import { useState, useEffect } from "react";
import { ProductForDetail } from "@/types/productss";
import { fetchFeatured } from "@/services/BestSellerWeek";

export const useTopProductsSell = () => {
  const [topProductsSell, setTopProductsSell] = useState<ProductForDetail[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchFeatured();
        setTopProductsSell(data);
      } catch (err) {
        console.error("Error fetching top sellers:", err);
        setError("Error al cargar los productos más vendidos");
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  return { topProductsSell, loading, error };
};