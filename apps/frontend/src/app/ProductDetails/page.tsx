"use client";
import { ProductInfo } from "./ProductInfo";
import { ProductTabs } from "./ProductTabs";
import { ProductReviews } from "./ProductReviews";
import Image from "next/image";
import { CustomSwiper } from "@/components/ui/CustomSwiper";

// Datos mock de prueba
const MOCK_PRODUCT = {
  id: "1",
  name: "Teclado Mecánico RGB",
  price: 89.99,
  description:
    "Teclado mecánico para gaming con retroiluminación RGB personalizable y switches Blue.",
  images: [
    "/products/mouse2-x11.png",
    "/products/mouse2-x11.png",
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

// Componente ProductGallery usando CustomSwiper
function ProductGallery({ images }: { images: string[] }) {
  return (
    <div className="w-full">
      <CustomSwiper
        items={images}
        renderItem={(img) => (
          <div className="relative aspect-square w-full">
            <Image
              src={img}
              alt="Producto"
              fill
              className="object-contain rounded-lg border"
            />
          </div>
        )}
        slidesPerView={1}
        withIndicators={true}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 1 },
          1024: { slidesPerView: 1 },
        }}
      />
    </div>
  );
}

export default function ProductPage() {
  return (
    <main className="hero-bg min-h-screen">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row gap-10 md:gap-20">
          <div className="w-1/2 mt-12 p-14">
            <ProductGallery images={MOCK_PRODUCT.images} />
          </div>
          <div className="mt-12 w-1/2">
            <ProductInfo product={MOCK_PRODUCT} />
            <ProductTabs
              description={MOCK_PRODUCT.description}
              specifications={MOCK_PRODUCT.specifications}
            />
          </div>
        </div>
        <div className="mt-16">
          <ProductReviews reviews={MOCK_PRODUCT.reviews} />
        </div>
      </section>
    </main>
  );
}
