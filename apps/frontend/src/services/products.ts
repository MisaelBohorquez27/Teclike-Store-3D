import { Product } from "@/app/Products/ProductCard";

export async function fetchProducts(): Promise<Product[]> {
  const res = await fetch("http://localhost:5000/api/products", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Error al obtener productos");
  }

  return res.json(); // ya viene formateado
}

export async function fetchProductById(id: number): Promise<Product> {
  const res = await fetch(`http://localhost:5000/api/products/id/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Error al obtener el producto");
  }

  return res.json();
}