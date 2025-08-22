export async function fetchProducts() {
  const res = await fetch("http://localhost:5000/api/products");
  if (!res.ok) throw new Error("Error al obtener productos");
  return res.json();
}

export async function fetchProductBySlug(slug: string) {
  const res = await fetch(`http://localhost:5000/api/products/slug/${slug}`);
  if (!res.ok) throw new Error("Error al obtener producto");
  return res.json();
}
