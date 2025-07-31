import Image from "next/image";
import mouse from "../../public/products/mouse-x11.png";
import Button from "@/components/ui/PagesButtons";
import CartIcon from "./CartIcon";

type Product = {
  id: number;
  title: string;
  tagline?: string;
  description?: string;
  features?: string[];
  stats?: string[];
  times?: string[];
  fullDescription: string;
  priceRange: { min: number; max: number };
  currency: string;
};

export function BestProductsSellers({ product }: { product: Product }) {
  return (
    <div className="bg-[#ffff] p-8 flex flex-col md:flex-row gap-8">
      {" "}
      {/* El color debe ser el mismo del fondo de la pagina */}
      {/* Columna izquierda */}
      <div className="md:w-1/2 p-8">
        <div className="w-full">
          <Image
            src={mouse.src}
            alt="mouse"
            width={1000}
            height={400}
            className="w-full max-w-3xs mx-auto rounded-lg object-cover"
          />
        </div>
      </div>
      {/* Columna derecha */}
      <div className="bg-gray-50 rounded-2xl md:w-1/2 p-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          {product.title}
        </h3>
        {/* {product.tagline && (
          <p className="text-gray-600 italic mb-4">{product.tagline}</p>
        )} */}
        {product.description && (
          <p className="text-gray-700 mb-6">{product.description}</p>
        )}

        {product.features && (
          <ul className="space-y-2 mb-6">
            {product.features.map((feature, index) => (
              <li key={index} className="flex items-center">
                <span className="mr-2">•</span>
                <span className="text-gray-700">{feature}</span>
              </li>
            ))}
          </ul>
        )}

        {/* {product.stats && product.times && (
          <div className="grid grid-cols-4 gap-2 mb-6">
            {product.stats.map((stat, index) => (
              <div key={index} className="bg-white p-2 rounded text-center">
                <span className="font-bold">{stat}</span>
              </div>
            ))}
            {product.times.map((time, index) => (
              <div key={index} className="col-span-2 text-sm text-gray-500">
                {time}
              </div>
            ))}
          </div>
        )} */}

        <p className="text-gray-600 mb-6">{product.fullDescription}</p>
        <div className="text-2xl font-bold text-gray-900 mb-6">
          {product.currency} {product.priceRange.min} - {product.currency}{" "}
          {product.priceRange.max}
        </div>
        <div className="flex justify-between md:w-2/3">
          <Button
            variant="primary"
            size="lg"
            className="hover:border-transparent "
          >
            Añadir al carrito
          </Button>
          <div className="bg-gray-50 rounded-2xl px-4 flex items-center justify-center hover:shadow-md transition-shadow border border-gray-100">
            <CartIcon />
          </div>
        </div>
        <div className="md:w-1/3"/>        
      </div>
    </div>
  );
}
