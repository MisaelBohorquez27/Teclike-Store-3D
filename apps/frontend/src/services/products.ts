import {Product} from "@/app/Products/ProductCard";

export type ProductFromApi = {
  id: number;
  slug: string;
  name: string;
  description?: string;
  priceCents: number;
  currency: string;
  category?: string;
  imageUrl?: string;
  assets?: any;
  createdAt: string;
  updatedAt: string;
};

// función para mapear de API → frontend
function mapProduct(apiProduct: ProductFromApi): Product {
  return {
    id: apiProduct.id,
    name: apiProduct.name,
    category: apiProduct.category ?? "General",
    price: apiProduct.priceCents / 100,
    rating: 4, // fijo por ahora
    image: apiProduct.imageUrl ?? "/placeholder.png",
  };
}

// función fetch de productos
export async function fetchProducts(): Promise<Product[]> {
  const res = await fetch("http://localhost:5000/api/products", {
    cache: "no-store", // evita cache en Next.js
  });
  if (!res.ok) throw new Error("Error al obtener productos");
  const data: ProductFromApi[] = await res.json();
  return data.map(mapProduct);
}

export async function fetchProductBySlug(slug: string) {
  const res = await fetch(`http://localhost:5000/api/products/slug/${slug}`);
  if (!res.ok) throw new Error("Error al obtener producto");
  return res.json();
}

export async function fetchTrendingProducts(): Promise<Product[]> {
  const res = await fetch("http://localhost:5000/api/products/trending", {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Error al obtener productos trending");
  const data: ProductFromApi[] = await res.json();
  return data.map(mapProduct);
}