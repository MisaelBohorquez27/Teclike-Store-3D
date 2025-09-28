"use client";
import { useTrendingProducts } from "@/hooks/useTrendingProducts";
import { TrendingProductCard } from "./Components/TrendingProductsCard";
import { CustomSwiper } from "@/components/Swipper/CustomSwiper";

export function TrendingProducts() {
  const { products, loading } = useTrendingProducts();

  if (loading) {
    return <p className="text-center py-8">Cargando productos...</p>;
  }

  return (
    <section className="TrendingProducts-bg relative py-8 sm:py-10 md:py-12">
      <div className="container mx-auto px-4 sm:px-6">
        <h2 className="TitleColor text-2xl sm:text-3xl md:text-4xl font-bold mb-6 md:mb-8">
          Productos Populares
        </h2>

        <CustomSwiper
          items={products}
          spaceBetween={16}
          breakpoints={{
            0: { slidesPerView: 1.2, spaceBetween: 10, slidesPerGroup: 1 },
            480: { slidesPerView: 2, spaceBetween: 16, slidesPerGroup: 1 },
            640: { slidesPerView: 2.7, spaceBetween: 20, slidesPerGroup: 3 },
            1024: { slidesPerView: 3, spaceBetween: 24, slidesPerGroup: 3 },
          }}
          className="pb-8 sm:pb-10 md:pb-12"
          speed={400}
          renderItem={(product) => <TrendingProductCard product={product} />}
        />
      </div>
    </section>
  );
}