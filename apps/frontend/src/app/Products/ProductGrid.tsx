import { ProductCard } from '@/components/ProductCard';

const PRODUCTS = [
  {
    id: 1,
    name: "Audifonos Razer",
    title: "Sala Moderna 3D",
    fullDescription: "Modelo 3D de una sala moderna, ideal para proyectos de interiores.",
    category: "Interiores",
    price: 49.99,
    priceRange: "$40 - $60",
    currency: "USD",
    rating: 4.5,
    image: "/products/Audifonos-caja.png",
    isNew: true
  },
  {
    id: 2,
    name: "Mouse X-11",
    title: "Muebles Vintage Pack",
    fullDescription: "Paquete de modelos 3D de muebles vintage para decoración.",
    category: "Muebles",
    price: 79.99,
    priceRange: "$70 - $90",
    currency: "USD",
    rating: 4.2,
    image: "/products/mouse2-x11.png"
  },
  // Añade más productos...
];

export function ProductGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {PRODUCTS.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}