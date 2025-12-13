"use client";
import { useParams } from "next/navigation";
import { ProductInfo } from "./components/ProductInfo";
import { ProductTabs } from "./components/ProductTabs";
import { ProductReviews } from "./components/ProductReviews";
import { ProductGallery } from "./components/ProductGallery";
import { useProductInfo } from "@/hooks/useProductInfo";

export default function ProductPage() {
  const params = useParams();
  const slug =
    typeof params.slug === "string"
      ? params.slug
      : Array.isArray(params.slug)
      ? params.slug[0]
      : "";

  const { product, loading, error } = useProductInfo(slug);

  if (loading) {
    return (
      <main className="min-h-screen hero-bg py-12">
        <div className="mx-auto px-4 py-8 text-center">
          <p>Cargando producto...</p>
        </div>
      </main>
    );
  }

  if (error || !product) {
    return (
      <main className="min-h-screen hero-bg py-12">
        <div className="mx-auto px-4 py-8 text-center">
          <p className="text-red-500">{error || "Producto no encontrado"}</p>
        </div>
      </main>
    );
  }

  // Filtrar imágenes vacías - usar imageUrls si existen, si no usar la imagen principal
  const productImages = product.imageUrls && product.imageUrls.length > 0
    ? product.imageUrls.filter((img: string) => img && img.trim() !== "")
    : [product.imageUrl].filter((img: string) => img && img.trim() !== "");

  return (
    <main className="min-h-screen hero-bg py-12">
      <section className="mx-auto md:mx-10 px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="flex flex-col lg:flex-row gap-4 md:gap-12 lg:gap-16">
          {/* Galería de imágenes */}
          <div className="w-full lg:w-1/2 mt-6 lg:mt-8 p-4 sm:p-8 md:p-10 lg:p-6 rounded-xl">
            {productImages.length > 0 ? (
              <ProductGallery
                images={productImages}
                description={product.description ?? ""}
              />
            ) : (
              <div className="aspect-square bg-gray-200 rounded-lg flex items-center justify-center">
                <span className="text-gray-500">Imagen no disponible</span>
              </div>
            )}
          </div>

          {/* Información del producto */}
          <div className="w-full lg:w-1/2 mt-6 lg:mt-8 p-4 sm:p-8 md:p-10 card-bg rounded-xl">
            <ProductInfo product={product} />
          </div>
        </div>

        {/* Reseñas y especificaciones */}
        <div className="rounded-xl px-6 md:px-8">
          <div className="mb-8">
            <ProductTabs specifications={product.specifications ?? {}} />
          </div>
          <ProductReviews reviews={product.reviews ?? []} />
        </div>
      </section>
    </main>
  );
}