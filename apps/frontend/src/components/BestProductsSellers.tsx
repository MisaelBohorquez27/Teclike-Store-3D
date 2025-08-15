import Image from "next/image";
import mouse from "../../public/products/mouse-x11.png";
import Button from "@/components/ui/PagesButtons";
import CartIcon from "./ui/CartIcon";

type Product = {
  id: number;
  title: string;
  description?: string;
  features?: string[];
  fullDescription: string;
  priceRange: { min: number; max: number };
  currency: string;
};

export function BestProductsSellers({ product }: { product: Product }) {
  return (
    <div className="bg-transparent p-8 flex flex-col md:flex-row gap-8">
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
      <div className="Card-bg rounded-2xl md:w-1/2 p-8">
        <h3 className="TitleColor text-2xl font-bold mb-2">{product.title}</h3>
        {product.description && (
          <p className="TextColor mb-6">{product.description}</p>
        )}

        {product.features && (
          <ul className="TextColor space-y-2 mb-6">
            {product.features.map((feature, index) => (
              <li key={index} className="flex items-center">
                <span className="mr-2">•</span>
                <span className="">{feature}</span>
              </li>
            ))}
          </ul>
        )}

        <p className="TextColor mb-6">{product.fullDescription}</p>
        <div className="TextColor text-2xl font-bold mb-6">
          {product.currency} {product.priceRange.min} - {product.currency}{" "}
          {product.priceRange.max}
        </div>
        <div className="flex justify-between md:w-2/3">
          <Button
            variant="primary"
            size="m"
            className="hover:border-transparent "
          >
            Añadir al carrito
          </Button>
          <div className="bg-gray-50 rounded-2xl px-4 flex items-center justify-center hover:shadow-md transition-shadow border border-gray-100">
            <CartIcon />
          </div>
        </div>
        <div className="md:w-1/3" />
      </div>
    </div>
  );
}
