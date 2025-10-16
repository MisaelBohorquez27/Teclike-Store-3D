import Image from "next/image";
import Button from "@/components/PagesButtons";
import CartIcon from "@/components/CartIcon";
import { ProductForDetail } from "@/types/productss";

interface ProductsProps {
  item: ProductForDetail;
  onAddToCart: (id: number, quantity: number) => void;
}

export function BestSellersWeekCard({ item, onAddToCart }: ProductsProps) {
  const handleAddToCart = (quantity: number) => {
    const availableStock = item.stock ?? 0;
    if (availableStock <= 0) {
      alert("Producto sin stock");
      return;
    }

    if (quantity < 1 || quantity > availableStock) {
      alert(`Cantidad inválida. Stock disponible: ${availableStock}`);
      return;
    }

    onAddToCart(item.id, quantity);
  };

  return (
    <div className="bg-transparent p-8 flex flex-col md:flex-row gap-8">
      {/* Columna izquierda - Imagen */}
      <ImageColumn image={item.imageUrl ?? ""} name={item.name} />

      {/* Columna derecha - Contenido */}
      <ContentColumn item={item} onAddToCart={handleAddToCart} />
    </div>
  );
}

const ImageColumn = ({ image, name }: { image: string; name: string }) => (
  <div className="md:w-1/2 p-8">
    <div className="w-full">
      <Image
        src={image || "/placeholder-product.jpg"}
        alt={name}
        width={1000}
        height={400}
        className="w-full max-w-3xs mx-auto rounded-lg object-cover"
      />
    </div>
  </div>
);

const ContentColumn = ({
  item,
  onAddToCart,
}: {
  item: ProductForDetail;
  onAddToCart: (quantity: number) => void;
}) => (
  <div className="Card-bg rounded-2xl md:w-1/2 p-8 flex flex-col gap-5 justify-center">
    <ProductInfo name={item.name} description={item.description ?? ""} />
    <ProductPrice price={item.priceInt ?? 0} currency={item.currency ?? ""} />
    <ProductRating rating={item.rating} reviewCount={item.reviewCount} />
    <AddToCartSection onAddToCart={onAddToCart} inStock={item.stock ?? 0} />
  </div>
);

const ProductInfo = ({
  name,
  description,
}: {
  name: string;
  description: string;
}) => (
  <div>
    <h3 className="TitleColor text-2xl font-bold mb-2">{name}</h3>
    <p className="TextColor mb-2">{description}</p>
  </div>
);

const ProductPrice = ({
  price,
  currency,
}: {
  price: number;
  currency: string;
}) => (
  <div className="TextColor text-2xl font-bold mb-4">
    {price.toFixed(2)} {currency}
  </div>
);

const ProductRating = ({
  rating,
  reviewCount,
}: {
  rating: number;
  reviewCount: number;
}) => (
  <div className="flex items-center mb-4">
    <span className="TextColor mr-2">⭐ {rating}</span>
    <span className="TextColor text-sm">({reviewCount} reviews)</span>
  </div>
);

const AddToCartSection = ({
  onAddToCart,
  inStock,
}: {
  onAddToCart: (quantity: number) => void;
  inStock: number;
}) => (
  <div className="flex justify-between md:w-2/3">
    <Button
      variant="primary"
      size="m"
      className="hover:border-transparent"
      onClick={() => onAddToCart(1)}
      disabled={inStock <= 0}
    >
      {inStock > 0 ? "Añadir al carrito" : "Sin stock"}
    </Button>
    <div className="bg-gray-50 rounded-2xl px-4 flex items-center justify-center hover:shadow-md transition-shadow border border-gray-100">
      <CartIcon />
    </div>
  </div>
);
