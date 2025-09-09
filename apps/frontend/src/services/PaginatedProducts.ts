// services/PaginatedProducts.ts
import { PaginatedResponse, Product} from "@/types/products";

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasMore: boolean;
}


// services/PaginatedProducts.ts
export async function fetchPaginatedProducts(page = 1, limit = 4): Promise<PaginatedResponse<Product>> {
  try {
    const res = await fetch(`http://localhost:5000/api/paginated?page=${page}&limit=${limit}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(`Error al obtener productos: ${res.status} ${res.statusText}`);
    }

    const data = await res.json();
    
    // DEBUG: Ver la respuesta real
    console.log('Respuesta del backend:', JSON.stringify(data, null, 2));
    
    // Verificar diferentes formatos posibles
    if (data.items && data.pagination) {
      return data;
    } else if (data.data && data.pagination) {
      return {
        items: data.data,
        data: data.data,
        pagination: data.pagination
      };
    } else if (Array.isArray(data)) {
      // Si solo devuelve un array de productos
      return {
        items: data,
        data: data,
        pagination: {
          page,
          limit,
          total: data.length,
          totalPages: 1,
          hasMore: false
        }
      };
    } else {
      throw new Error(`Formato de respuesta no reconocido: ${JSON.stringify(data)}`);
    }
  } catch (error) {
    console.error('Error in fetchPaginatedProducts:', error);
    throw new Error(error instanceof Error ? error.message : 'Error desconocido al obtener productos');
  }
}