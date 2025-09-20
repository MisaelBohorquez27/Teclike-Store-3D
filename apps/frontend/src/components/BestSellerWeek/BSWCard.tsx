import Image from "next/image";
import Button from "@/components/ui/PagesButtons";
import CartIcon from "../ui/CartIcon";

export type TopProductsSell = {
  id: string;
  title: string;
  description?: string;
  price: number;
  currency: string;
  imageUrl?: string; // para imagen
  stock?: number;
};

interface ProductsProps {
  item: TopProductsSell;
  onAddToCart: (id: string, quantity: number) => void;
}

export function TopProductsSellCard({ item, onAddToCart }: ProductsProps) {
  const handleAddToCart = (Quantity: number) => {
    if (Quantity >= 1 && Quantity <= (item.stock || Infinity)) {
      onAddToCart(item.id, Quantity);
    } else {
      alert("Cantidad inválida o sin stock");
    }
  };

  return (
    <div className="bg-transparent p-8 flex flex-col md:flex-row gap-8">
      {/* Columna izquierda */}
      <div className="md:w-1/2 p-8">
        <div className="w-full">
          <Image
            src={item.imageUrl || "/products/mouse-x11.png"}
            alt={item.title}
            width={1000}
            height={400}
            className="w-full max-w-3xs mx-auto rounded-lg object-cover"
          />
        </div>
      </div>

      {/* Columna derecha */}
      <div className="Card-bg rounded-2xl md:w-1/2 p-8 flex flex-col gap-5 justify-center">
        <div>
          <h3 className="TitleColor text-2xl font-bold mb-2">{item.title}</h3>
          <p className="TextColor mb-6">{item.description}</p>
        </div>

        <div>
          <div className="TextColor text-2xl font-bold mb-6">
            {item.currency} {item.price}
          </div>
          <div className="flex justify-between md:w-2/3">
            <Button
              variant="primary"
              size="m"
              className="hover:border-transparent "
              onClick={() => handleAddToCart(1)}
            >
              Añadir al carrito
            </Button>
            <div className="bg-gray-50 rounded-2xl px-4 flex items-center justify-center hover:shadow-md transition-shadow border border-gray-100">
              <CartIcon />
            </div>
          </div>
        </div>
        <div className="md:w-1/3" />
      </div>
    </div>
  );
}
