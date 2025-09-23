"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { ProductInfo } from "./ProductInfo";
import { ProductTabs } from "./ProductTabs";
import { ProductReviews } from "./ProductReviews";
import { ProductGallery } from "./ProductGallery";
import { fetchProductById } from "@/services/products";
import { ProductForDetail } from "@/types/productss";

export default function ProductPage() {
  const params = useParams();
  const [product, setProduct] = useState<ProductForDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        setLoading(true);
        const productId = Number(params.id);
        
        if (isNaN(productId)) {
          throw new Error("ID de producto inválido");
        }

        // ✅ Consumir el servicio que ahora incluye reviews
        const productData = await fetchProductById(productId);
        // Map productData to ProductDetail, filling missing fields if necessary
        const mappedProduct: ProductForDetail = {
          id: productData.id,
          name: productData.name,
          brand: productData.brand ?? "", // default empty string if missing
          description: productData.description ?? "",
          originalPrice: productData.price as unknown as string,
          currency: productData.currency,
          image: productData.image,
          category: productData.category,
          isNew: productData.isNew ?? false,
          rating: productData.rating ?? 0,
          reviews: productData.reviews ?? [],
          specifications: productData.specifications ?? {},
          reviewCount: productData.reviewCount ?? 0,
          slug: productData.slug,
          inStock: productData.inStock ?? true,
          
        };
        setProduct(mappedProduct);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error al cargar el producto");
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      loadProduct();
    }
  }, [params.id]);

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

  return (
    <main className="min-h-screen hero-bg py-12">
      <section className="mx-auto md:mx-10 px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="flex flex-col lg:flex-row gap-4 md:gap-12 lg:gap-16">
          {/* Galería de imágenes */}
          <div className="w-full lg:w-1/2 mt-6 lg:mt-8 p-4 sm:p-8 md:p-10 lg:p-6 rounded-xl">
            <ProductGallery
              images={[product.image]} // Ahora viene del backend
              description={product.description ?? ""}
            />
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