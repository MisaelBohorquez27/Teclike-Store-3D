import { useState, useEffect } from "react";
import { ProductForDetail } from "@/types/productss";
import { fetchFeatured } from "@/services/bestSellerWeek";

export const useBestSellerWeek = () => {
  const [bestSellerWeek, setBestSellerWeek] = useState<ProductForDetail[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchFeatured();
        setBestSellerWeek(data);
      } catch (err) {
        console.error("Error fetching best sellers:", err);
        setError("Error al cargar los productos más vendidos");
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  return { bestSellerWeek, loading, error };
};