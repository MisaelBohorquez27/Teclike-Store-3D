import { Rating } from "./ui/Rating";
import CartIcon from "./ui/CartIcon";

type Offer = {
  id: number;
  title: string;
  name?: string;
  rating: number;
  image?: string;
  discount: string;
  price: string;
};

export function OfferCard({ offer }: { offer: Offer }) {
  return (
    <div className="Card-bg rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="px-2 sm:px-3 py-3 sm:py-4 flex flex-col">
        <div className="relative flex justify-between items-center aspect-square">
          <img
            src={offer.image}
            alt={offer.name}
            className="w-full h-full object-cover"
          />
          <span className="absolute top-2 right-2 DealCard-Discount text-xs sm:text-sm font-bold px-1.5 sm:px-2 py-0.5 sm:py-1 rounded">
            {offer.discount}
          </span>
        </div>

        <div className="mt-3 sm:mt-4 md:mt-5">
          <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-800">
            {offer.title}
          </h3>
          <Rating value={offer.rating} />
        </div>

        <div className="mt-2 sm:mt-3 flex justify-between items-center px-2 sm:px-4">
          <span className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800">
            {offer.price}
          </span>
          <div className="rounded-xl sm:rounded-2xl p-2 sm:p-3 flex items-center justify-center hover:shadow-md transition-shadow border border-gray-100">
            <CartIcon />
          </div>
        </div>
      </div>
    </div>
  );
}
