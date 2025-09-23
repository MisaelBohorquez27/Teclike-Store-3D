import { Product } from "../../types/products";

interface TrendingProductCardProps {
  product: Product;
}

export const TrendingProductCard = ({ product }: TrendingProductCardProps) => {
  return (
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
          {product.currency} {product.price} 
        </span>
        <button className="text-blue-600 hover:text-blue-800 text-xs sm:text-sm font-medium">
          Ver detalles
        </button>
      </div>
    </div>
  );
};