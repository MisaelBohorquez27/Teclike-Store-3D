import { apiFetch } from "./api";
import { ProductForDetail } from "@/types/productss";

export const fetchFeatured = async (limit = 6): Promise<ProductForDetail[]> => {
  try {
    const data = await apiFetch(`/bestSellerWeek?limit=${limit}`);
    return data as ProductForDetail[];
  } catch (error) {
    console.error('Error fetching best selling products:', error);
    throw error;
  }
};