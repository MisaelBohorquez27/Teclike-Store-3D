"use client";
import { useEffect, useState } from "react";
import "swiper/css";
import { CustomSwiper } from "./ui/CustomSwiper";
import { fetchProducts } from "@/services/products";
import { fetchProductsBase } from "@/services/NewProductService";

export interface TrendingProduct {
  id: number;
  name: string;
  category: string;
  price: number;
  rating: number;
  image: string;
};

export function TrendingProducts() {
  const [products, setProducts] = useState<TrendingProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProductsBase()
      .then((res) => setProducts(res.items))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

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
          renderItem={(product) => (
            <div className="border border-gray-200 rounded-lg p-3 sm:p-4 hover:shadow-md transition-shadow h-full flex flex-col">
              <div className="relative h-40 sm:h-48 mb-3 sm:mb-4">
                <img
                  src={product.image}
                  alt={product.name}
                  className="object-cover rounded-t-lg w-full h-full"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="flex-grow">
                <h3 className="font-semibold text-base sm:text-lg SubtitleColor">
                  {product.name}
                </h3>
                <p className="TitleColor text-xs sm:text-sm mt-1">
                  {product.category}
                </p>
              </div>
              <div className="mt-3 sm:mt-4 flex justify-between items-center">
                <span className="ColorSubtitle font-bold text-sm sm:text-base">
                  {product.price.toFixed(2)}
                </span>
                <button className="text-blue-600 hover:text-blue-800 text-xs sm:text-sm font-medium">
                  Ver detalles
                </button>
              </div>
            </div>
          )}
        />
      </div>
    </section>
  );
}
