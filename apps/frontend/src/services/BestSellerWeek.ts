import httpClient from "./httpClient";
import { ProductForDetail } from "@/types/productss";

// Fetch productos más vendidos de la semana
export const fetchFeatured = async (limit = 6): Promise<ProductForDetail[]> => {
  const response = await httpClient.get<ProductForDetail[]>(
    `/bestSellerWeek?limit=${limit}`,
    {
      params: {
        limit: limit,
      }
    }
  );
  const data = response.data;
  return Array.isArray(data) ? data : [];
};