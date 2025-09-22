import { ProductForDetail } from "@/types/productss";

export const fetchFeatured = async (limit = 6): Promise<ProductForDetail[]> => {
  try {
    const response = await fetch(`http://localhost:5000/api/topSellingProd?limit=${limit}`);
    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }
    
    const data = await response.json();
    return data as ProductForDetail[];
  } catch (error) {
    console.error('Error fetching top selling products:', error);
    throw error;
  }
};