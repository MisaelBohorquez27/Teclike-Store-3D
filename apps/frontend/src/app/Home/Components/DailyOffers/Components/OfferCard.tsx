import { Rating } from "@/components/Rating";
import CartIcon from "@/components/CartIcon";
import { ProductForCard } from "@/types/productss";

export function OfferCard({ product }: { product: ProductForCard }) {
  return (
    <div className="Card-bg rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="px-2 sm:px-3 py-3 sm:py-4 flex flex-col">
        <div className="relative flex justify-between items-center aspect-square">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-cover"
          />
          <span className="absolute top-2 right-2 DealCard-Discount text-xs sm:text-sm font-bold px-1.5 sm:px-2 py-0.5 sm:py-1 rounded">
            {product.discount}
          </span>
        </div>

        <div className="mt-3 sm:mt-4 md:mt-5">
          <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-800 truncate">
            {product.brand}
          </h3>
          <Rating value={product.rating} />
        </div>

        <div className="mt-2 sm:mt-3 flex justify-between items-center px-2 sm:px-4">
          <span className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800">
            {product.originalPrice}
          </span>
          <div className="rounded-xl sm:rounded-2xl p-2 sm:p-3 flex items-center justify-center hover:shadow-md transition-shadow border border-gray-100">
            <CartIcon />
          </div>
        </div>
      </div>
    </div>
  );
}
