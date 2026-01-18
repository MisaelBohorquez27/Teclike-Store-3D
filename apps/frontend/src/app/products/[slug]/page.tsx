"use client";
import { useParams } from "next/navigation";
import { ProductInfo } from "./components/productinfo";
import { ProductTabs } from "./components/producttabs";
import { ProductReviews } from "./components/productreviews";
import { ProductGallery } from "./components/productgallery";
import { useProductInfo } from "@/hooks/useproductinfo";
import { Icon } from "lucide-react";

// Componente de Skeleton Loading
function ProductSkeleton() {
  return (
    <main className="min-h-screen hero-bg py-12">
      <section className="mx-auto md:mx-10 px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="flex flex-col lg:flex-row gap-4 md:gap-12 lg:gap-16">
          {/* Galería skeleton */}
          <div className="w-full lg:w-1/2 mt-6 lg:mt-8 p-4 sm:p-8 md:p-10 lg:p-6 rounded-xl">
            <div className="aspect-square bg-linear-to-r from-gray-700 via-gray-600 to-gray-700 rounded-lg animate-pulse" />
          </div>

          {/* Info skeleton */}
          <div className="w-full lg:w-1/2 mt-6 lg:mt-8 p-4 sm:p-8 md:p-10 card-bg rounded-xl">
            <div className="space-y-4">
              <div className="h-8 bg-linear-to-r from-gray-700 via-gray-600 to-gray-700 rounded animate-pulse w-3/4" />
              <div className="h-6 bg-linear-to-r from-gray-700 via-gray-600 to-gray-700 rounded animate-pulse w-1/2" />
              <div className="space-y-2">
                <div className="h-4 bg-linear-to-r from-gray-700 via-gray-600 to-gray-700 rounded animate-pulse" />
                <div className="h-4 bg-linear-to-r from-gray-700 via-gray-600 to-gray-700 rounded animate-pulse w-5/6" />
              </div>
              <div className="h-12 bg-linear-to-r from-cyan-600 to-blue-600 rounded animate-pulse w-1/2 mt-6" />
            </div>
          </div>
        </div>

        {/* Reviews skeleton */}
        <div className="rounded-xl px-6 md:px-8 mt-8">
          <div className="h-6 bg-linear-to-r from-gray-700 via-gray-600 to-gray-700 rounded animate-pulse w-1/4 mb-6" />
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-20 bg-linear-to-r from-gray-700 via-gray-600 to-gray-700 rounded animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

// Componente de Error
function ProductError({ error }: { error: string }) {
  return (
    <main className="min-h-screen hero-bg py-12">
      <section className="mx-auto max-w-2xl px-4 py-8 text-center">
        <div className="rounded-2xl p-8 backdrop-blur-sm">
          <div className="mb-4">
          </div>
          <h1 className="text-2xl font-bold text-blue-400 mb-2">Lo sentimos, hubo un error inesperado
          </h1>
          <p className="text-blue-200 mb-6">{error}</p>
        </div>
      </section>
    </main>
  );
}

export default function ProductPage() {
  const params = useParams();
  const slug =
    typeof params.slug === "string"
      ? params.slug
      : Array.isArray(params.slug)
      ? params.slug[0]
      : "";

  const { product, loading, error } = useProductInfo(slug);

  // Mientras carga → mostrar skeleton
  if (loading) {
    return <ProductSkeleton />;
  }

  // Si hay error O no hay producto → mostrar error
  if (error || !product) {
    return <ProductError error={error || "Producto no encontrado"} />;
  }

  // Producto cargado exitosamente → mostrar contenido
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