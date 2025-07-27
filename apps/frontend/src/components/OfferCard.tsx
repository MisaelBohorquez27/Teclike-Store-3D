import { Rating } from "./Rating";
import CartIcon from "./CartIcon";

type Offer = {
  id: number;
  title: string;
  description: string;
  rating: number;
  discount: string;
  price: string;
};

export function OfferCard({ offer }: { offer: Offer }) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow h-full">
      <div className="px-2 py-6 flex flex-col h-full">
        <div className="flex justify-between items-start">
          <h3 className="text-xl font-semibold text-gray-800">{offer.title}</h3>
          <span className="bg-red-500 text-white text-sm font-bold px-2 py-1 rounded">
            {offer.discount}
          </span>
        </div>

        <p className="text-gray-600 mt-2 flex-grow">{offer.description}</p>

        <div className="mt-4">
          <Rating value={offer.rating} />
        </div>

        <div className="mt-6 flex justify-between items-center px-4">
          <span className="text-2xl font-bold text-gray-800">
            {offer.price}
          </span>
          <div className="bg-gray-50 rounded-2xl p-3 text-center hover:shadow-md transition-shadow border border-gray-100">
            <CartIcon />
          </div>
        </div>
      </div>
    </div>
  );
}
