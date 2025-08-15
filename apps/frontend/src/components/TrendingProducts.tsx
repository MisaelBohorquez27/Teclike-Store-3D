"use client";
import "swiper/css";
import { CustomSwiper } from "./ui/CustomSwiper";

const TRENDING_PRODUCTS = [
  {
    id: 1,
    title: "Air Jordan 4 Infrared 2022",
    details: "Size 8",
    price: 150.0,
    currency: "$",
    image: "https://example.com/image1.jpg",
  },
  {
    id: 2,
    title: "Air Jordan 8 Retro 'BUGS BUNNY'",
    details: "2013 - Size 8.5 - 305381103 (8170-40)",
    price: 140.0,
    currency: "$",
    image: "https://example.com/image1.jpg",
  },
  {
    id: 3,
    title: "Nike Air Max 90 Premium",
    details: "10.5 NEW!!!",
    price: 109.95,
    currency: "$",
    image: "https://example.com/image1.jpg",
  },
  {
    id: 4,
    title: "Nike Air Max I Premium",
    details: "Dark Smoke Grey Flash Crimson H.9292.070...",
    price: 115.0,
    currency: "$",
    image: "https://example.com/image1.jpg",
  },
  {
    id: 5,
    title: "Nike Air Jordan 13 Retro Low",
    details: "Pure Money White Mt Silver Platinum Si...",
    price: 100.0,
    currency: "$",
    image: "https://example.com/image1.jpg",
  },
  {
    id: 6,
    title: "Nike / Anthracite",
    details: "Size 11",
    price: 160.0,
    currency: "$",
    image: "https://example.com/image1.jpg",
  },
];

export function TrendingProducts() {
  return (
    <section className="TrendingProducts-bg relative py-8 sm:py-10 md:py-12">
      <div className="container mx-auto px-4 sm:px-6">
        <h2 className="TitleColor text-2xl sm:text-3xl md:text-4xl font-bold mb-6 md:mb-8">
          Productos Populares
        </h2>

        <CustomSwiper
          items={TRENDING_PRODUCTS}
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
                  alt={product.title}
                  className="object-cover rounded-t-lg w-full h-full"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="flex-grow">
                <h3 className="font-semibold text-base sm:text-lg SubtitleColor">
                  {product.title}
                </h3>
                <p className="TitleColor text-xs sm:text-sm mt-1">
                  {product.details}
                </p>
              </div>
              <div className="mt-3 sm:mt-4 flex justify-between items-center">
                <span className="ColorSubtitle font-bold text-sm sm:text-base">
                  {product.currency}
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
