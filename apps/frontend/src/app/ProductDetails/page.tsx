"use client";
import { ProductInfo } from "./ProductInfo";
import { ProductTabs } from "./ProductTabs";
import { ProductReviews } from "./ProductReviews";
import Image from "next/image";
import { CustomSwiper } from "@/components/ui/CustomSwiper";
import { ProductGallery } from "./ProductGallery";

// Datos mock de prueba
const MOCK_PRODUCT = {
  id: "1",
  name: "Teclado Mecánico RGB",
  price: 89.99,
  description:
    "Teclado mecánico para gaming con retroiluminación RGB personalizable y switches Blue.",
  images: [
    "/products/mouse2-x11.png",
    "/products/mouse-x11.png",
    "/products/mouse2-x11.png",
  ],
  specifications: {
    Tipo: "Mecánico",
    Switches: "Blue",
    Conectividad: "USB-C",
    Teclas: "104",
    RGB: "Sí",
  },
  reviews: [
    {
      id: "1",
      user: "Juan Pérez",
      rating: 5,
      comment: "Excelente calidad de construcción.",
      date: "2023-10-15",
    },
  ],
};
export default function ProductPage() {
  return (
    <main className="min-h-screen hero-bg py-12">
      <section className="mx-auto md:mx-10 px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Sección principal del producto */}
        <div className="flex flex-col lg:flex-row gap-4 md:gap-12 lg:gap-16">
          {/* Galería de imágenes (izquierda) */}
          <div className="w-full lg:w-1/2 mt-6 lg:mt-8 p-4 sm:p-8 md:p-10 lg:p-6 rounded-xl">
            <ProductGallery
              images={MOCK_PRODUCT.images}
              description={MOCK_PRODUCT.description}
            />
          </div>

          {/* Información del producto (derecha) */}
          <div className="w-full lg:w-1/2 mt-6 lg:mt-8 p-4 sm:p-8 md:p-10 card-bg rounded-xl">
            <ProductInfo product={MOCK_PRODUCT} />
          </div>
        </div>

        {/* Reseñas del producto */}
        <div className="rounded-xl px-6 md:px-8">
          <div className="mb-8">
            <ProductTabs specifications={MOCK_PRODUCT.specifications} />
          </div>
          <ProductReviews reviews={MOCK_PRODUCT.reviews} />
        </div>
      </section>
    </main>
  );
}
