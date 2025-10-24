// src/services/offers.ts

// 🚨 Importar la instancia de Axios configurada, no la antigua función apiFetch
import { ProductForCard } from "@/types/productss";
import httpClient from "./httpClient";

export async function fetchFeaturedOffers(limit = 6): Promise<ProductForCard[]> {
  // 1. Usar httpClient.get(endpoint, config)
  const response = await httpClient.get<ProductForCard[]>(
    '/offers',
    {
      // 2. Axios adjunta los parámetros de consulta automáticamente usando el campo 'params'
      params: {
        limit: limit,
      }
    }
  );

  // 3. Axios devuelve el JSON del cuerpo en la propiedad 'data' del objeto response
  const data = response.data; 

  // 4. Normalización simplificada (siempre devuelve un array o maneja el tipo)
  // Nota: Si tu backend SIEMPRE devuelve un array de ProductForCard[], esta verificación puede ser:
  return Array.isArray(data) ? data : []; 
}