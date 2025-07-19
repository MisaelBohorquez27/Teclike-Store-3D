import { Rating } from "./Rating"; 

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
      <div className="p-6 flex flex-col h-full">
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

        <div className="mt-6 flex justify-between items-center">
          <span className="text-2xl font-bold text-gray-800">{offer.price}</span>
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded text-sm font-medium">
            Añadir al carrito
          </button>
        </div>
      </div>
    </div>
  );
}