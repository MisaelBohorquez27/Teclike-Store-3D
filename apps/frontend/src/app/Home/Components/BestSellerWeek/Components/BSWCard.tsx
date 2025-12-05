"use client";

import Image from "next/image";
import Button from "@/components/PagesButtons";
import CartIcon from "@/components/CartIcon";
import { ProductForDetail } from "@/types/productss";
import { motion } from "framer-motion";
import { FiStar, FiShoppingCart, FiTruck, FiShield, FiClock, FiTrendingUp } from "react-icons/fi";

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
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-md border border-gray-800/50 rounded-3xl p-6 md:p-8 flex flex-col lg:flex-row gap-6 md:gap-8 shadow-xl hover:shadow-2xl hover:shadow-yellow-500/10 transition-all duration-300"
    >
      {/* Badge de TOP VENDEDOR */}
      <div className="absolute -top-3 -left-3 z-20">
        <div className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-gradient-to-r from-yellow-500 to-amber-500 text-white text-sm font-bold shadow-lg">
          <FiTrendingUp className="w-3 h-3" />
          <span>TOP</span>
        </div>
      </div>

      {/* Columna izquierda - Imagen */}
      <ImageColumn image={item.imageUrl ?? ""} name={item.name} />

      {/* Separador decorativo */}
      <div className="hidden lg:block">
        <div className="w-px h-full bg-gradient-to-b from-transparent via-gray-800/50 to-transparent" />
      </div>

      {/* Columna derecha - Contenido */}
      <ContentColumn item={item} onAddToCart={handleAddToCart} />
    </motion.div>
  );
}

const ImageColumn = ({ image, name }: { image: string; name: string }) => (
  <div className="lg:w-2/5 relative">
    <motion.div
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
      className="relative overflow-hidden rounded-2xl"
    >
      <Image
        src={image || "/placeholder-product.jpg"}
        alt={name}
        width={600}
        height={500}
        className="w-full h-64 md:h-80 object-cover rounded-2xl hover:scale-105 transition-transform duration-500"
      />
      
      {/* Overlay de hover */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
      
      {/* Badge de disponibilidad */}
      <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-black/70 backdrop-blur-sm text-white text-xs font-medium">
        <span className="flex items-center gap-1">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          Disponible
        </span>
      </div>
    </motion.div>
  </div>
);

const ContentColumn = ({
  item,
  onAddToCart,
}: {
  item: ProductForDetail;
  onAddToCart: (quantity: number) => void;
}) => (
  <div className="lg:w-3/5 flex flex-col gap-6 justify-center">
    <ProductInfo name={item.name} description={item.description ?? ""} />
    <ProductPrice price={item.priceInt ?? 0} currency={item.currency ?? ""} />
    <ProductRating rating={item.rating} reviewCount={item.reviewCount} />
    <ProductBenefits />
    <StockIndicator stock={item.stock ?? 0} />
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
    <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 line-clamp-2">
      {name}
    </h3>
    <p className="text-gray-300 leading-relaxed line-clamp-3">
      {description}
    </p>
  </div>
);

const ProductPrice = ({
  price,
  currency,
}: {
  price: number;
  currency: string;
}) => (
  <div className="flex items-baseline gap-4">
    <div>
      <div className="text-sm text-gray-400 mb-1">Precio especial</div>
      <div className="text-4xl md:text-5xl font-bold text-white">
        {currency} {price.toFixed(2)}
      </div>
    </div>
    
    {/* Ahorro estimado */}
    <div className="px-3 py-1.5 rounded-full bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20">
      <div className="text-xs text-green-400 font-medium">
        <span className="text-lg">⚡</span> Mejor precio
      </div>
    </div>
  </div>
);

const ProductRating = ({
  rating,
  reviewCount,
}: {
  rating: number;
  reviewCount: number;
}) => (
  <div className="flex flex-wrap items-center gap-4">
    {/* Stars */}
    <div className="flex items-center gap-2">
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          <FiStar
            key={i}
            className={`w-5 h-5 ${
              i < Math.floor(rating)
                ? "text-yellow-400 fill-yellow-400"
                : "text-gray-600"
            }`}
          />
        ))}
      </div>
      <span className="text-2xl font-bold text-white">{rating}</span>
    </div>
    
    {/* Review count */}
    <div className="text-gray-400">
      <span className="text-white font-semibold">{reviewCount}</span> reseñas
    </div>
    
    {/* Rating badge */}
    <div className="px-2 py-1 rounded-md bg-gradient-to-r from-yellow-500/10 to-amber-500/10">
      <span className="text-yellow-400 text-xs font-medium">EXCELENTE</span>
    </div>
  </div>
);

const ProductBenefits = () => (
  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
    {[
      { icon: FiTruck, text: "Envío Gratis", color: "text-blue-400" },
      { icon: FiShield, text: "Garantía", color: "text-green-400" },
      { icon: FiClock, text: "24/7 Soporte", color: "text-purple-400" },
    ].map((benefit, index) => (
      <div
        key={index}
        className="flex items-center gap-2 p-3 rounded-xl bg-gray-800/30 border border-gray-700/30"
      >
        <benefit.icon className={`w-4 h-4 ${benefit.color}`} />
        <span className="text-sm text-gray-300">{benefit.text}</span>
      </div>
    ))}
  </div>
);

const StockIndicator = ({ stock }: { stock: number }) => (
  <div className="space-y-2">
    <div className="flex justify-between text-sm">
      <span className="text-gray-400">Disponibilidad</span>
      <span className={`font-medium ${stock > 0 ? 'text-green-400' : 'text-red-400'}`}>
        {stock > 0 ? `${stock} unidades` : 'Agotado'}
      </span>
    </div>
    
    {/* Progress bar */}
    <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
      <div 
        className="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full transition-all duration-500"
        style={{ width: `${Math.min((stock / 100) * 100, 100)}%` }}
      />
    </div>
    
    {/* Stock warning */}
    {stock > 0 && stock < 20 && (
      <div className="flex items-center gap-2 text-xs text-amber-400">
        <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse" />
        ¡Últimas unidades disponibles!
      </div>
    )}
  </div>
);

const AddToCartSection = ({
  onAddToCart,
  inStock,
}: {
  onAddToCart: (quantity: number) => void;
  inStock: number;
}) => (
  <div className="flex flex-col sm:flex-row gap-4 items-center">
    {/* Quantity selector */}
    {inStock > 0 && (
      <div className="flex items-center gap-2 p-2 rounded-xl bg-gray-800/50 border border-gray-700/50">
        <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-700 hover:bg-gray-600 text-white">
          -
        </button>
        <span className="w-12 text-center text-white font-medium">1</span>
        <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-700 hover:bg-gray-600 text-white">
          +
        </button>
      </div>
    )}
    
    {/* Add to cart button */}
    <Button
      variant="primary"
      size="m"
      className={`group flex-1 flex items-center justify-center gap-3 ${
        inStock > 0 
          ? 'bg-gradient-to-r from-yellow-600 to-amber-600 hover:from-yellow-500 hover:to-amber-500' 
          : 'bg-gray-800 cursor-not-allowed'
      } text-white font-bold py-4 px-6 rounded-xl hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-yellow-500/25`}
      onClick={() => onAddToCart(1)}
      disabled={inStock <= 0}
    >
      {inStock > 0 ? (
        <>
          <FiShoppingCart className="w-5 h-5 group-hover:scale-110 transition-transform" />
          <span>Añadir al Carrito</span>
        </>
      ) : (
        <span>Sin Stock</span>
      )}
    </Button>
    
    {/* Cart icon */}
    <motion.div
      whileHover={{ scale: 1.1, rotate: 5 }}
      whileTap={{ scale: 0.95 }}
      className="p-4 rounded-xl bg-gradient-to-br from-gray-800 to-gray-900 hover:from-gray-700 hover:to-gray-800 border border-gray-700 hover:border-yellow-500/30 shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer"
    >
      <div className="relative">
        <CartIcon />
        {/* New indicator */}
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-ping" />
      </div>
    </motion.div>
  </div>
);