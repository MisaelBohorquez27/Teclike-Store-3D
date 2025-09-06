import { Product } from "@/app/Products/ProductCard";

// Obtener productos (todos o por búsqueda)
export async function fetchProducts(query?: string): Promise<Product[]> {
  const url = query && query.trim().length > 1
    ? `http://localhost:5000/api/search?q=${encodeURIComponent(query)}`
    : "http://localhost:5000/api/products";

  const res = await fetch(url, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Error al obtener productos");
  }

  const data = await res.json();

  // Si tu backend devuelve { data: [...] }, normalizamos:
  return Array.isArray(data) ? data : data.data || [];
}

// Obtener producto por id
export async function fetchProductById(id: number): Promise<Product> {
  const res = await fetch(`http://localhost:5000/api/products/id/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Error al obtener el producto");
  }

  return res.json();
}
