"use client";

import Button from "@/components/PagesButtons";
import { Rating } from "@/components/Rating";
import { ProductWithOffer } from "@/types/offers";
import { useState } from "react";

interface DealCardProps {
  offer: ProductWithOffer;
  size?: "sm" | "md" | "lg";
  showTimer?: boolean;
  showBrand?: boolean;
  showRating?: boolean;
  className?: string;
  onAddToCart?: (offer: ProductWithOffer) => void;
}

// Mejora del componente DealCard con opciones de personalización
export function DealCard({
  offer,
  size = "md",
  showTimer = true,
  showBrand = false,
  showRating = false,
  className = "",
  onAddToCart,
}: DealCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Configuraciones por tamaño
  const sizeConfig = {
    sm: {
      image: "h-32 sm:h-36",
      title: "text-sm sm:text-base",
      price: "text-base",
      discount: "text-xs px-1.5 py-0.5",
      button: "text-xs",
      padding: "p-2 sm:p-3",
    },
    md: {
      image: "h-40 sm:h-48 md:h-52",
      title: "text-base sm:text-lg",
      price: "text-lg sm:text-xl",
      discount: "text-sm px-2 py-1",
      button: "text-sm",
      padding: "p-3 sm:p-4",
    },
    lg: {
      image: "h-48 sm:h-56 md:h-64",
      title: "text-lg sm:text-xl md:text-2xl",
      price: "text-xl sm:text-2xl",
      discount: "text-base px-3 py-1.5",
      button: "text-base",
      padding: "p-4 sm:p-6",
    },
  };

  const config = sizeConfig[size];

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onAddToCart?.(offer);
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div
      className={`
        Card-bg rounded-xl shadow-md overflow-hidden hover:shadow-xl 
        transition-all duration-300 hover:-translate-y-1 
        border border-gray-100 hover:border-gray-200
        flex flex-col h-full
        ${className}
      `}
    >
      {/* Imagen + Descuento */}
      <div className="relative flex-shrink-0">
        <div className="relative">
          {/* Imagen principal */}
          <img
            src={imageError ? "/products/default.png" : offer.imageUrl}
            alt={offer.name}
            className={`
              w-full object-cover transition-opacity duration-300
              ${config.image}
              ${imageLoaded ? "opacity-100" : "opacity-0"}
            `}
            onLoad={handleImageLoad}
            onError={handleImageError}
          />
          
          {/* Skeleton loader mientras carga */}
          {!imageLoaded && (
            <div
              className={`
                absolute inset-0 bg-gray-200 animate-pulse
                ${config.image}
              `}
            />
          )}
        </div>

        {/* Badge de descuento */}
        <div
          className={`
            absolute top-2 right-2 DealCard-Discount font-bold rounded
            ${config.discount}
          `}
        >
          {offer.discount}
        </div>

        {/* Badge de oferta flash */}
        {offer.isFlashDeal && (
          <div
            className="absolute top-2 left-2 bg-red-500 text-white text-xs 
                     font-bold px-2 py-1 rounded animate-pulse"
          >
            🔥 FLASH
          </div>
        )}
      </div>

      {/* Contenido - Se expande para ocupar espacio disponible */}
      <div className={`flex flex-col flex-grow ${config.padding}`}>
        {/* Marca (opcional) */}
        {showBrand && offer.brand && (
          <span className="text-xs text-gray-500 uppercase tracking-wide mb-1">
            {offer.brand}
          </span>
        )}

        {/* Título */}
        <h3
          className={`
            font-semibold text-gray-800 mb-2 line-clamp-2
            hover:text-blue-600 transition-colors
            ${config.title}
          `}
          title={offer.name}
        >
          {offer.name}
        </h3>

        {/* Rating (opcional) */}
        <Rating value={offer.rating} />

        {/* Precios */}
        <div className="flex items-center space-x-2 mb-3 mt-auto">
          <span
            className={`
              font-bold DealCard-Price
              ${config.price}
            `}
          >
            {offer.discountPrice}
          </span>
          <span
            className="text-gray-500 line-through text-sm sm:text-base"
          >
            {offer.originalPrice}
          </span>
        </div>

        {/* Ahorro */}
        {offer.savings && offer.savings !== "$0.00" && (
          <div className="text-xs text-green-600 font-medium mb-3">
            Ahorras {offer.savings}
          </div>
        )}

        {/* Tiempo restante (solo flash deals) */}
        {showTimer && offer.isFlashDeal && offer.timeLeft && (
          <div className="flex items-center text-xs sm:text-sm text-orange-600 mb-3 bg-orange-50 px-2 py-1 rounded">
            <span className="mr-1 animate-pulse">⏳</span>
            <span>
              {offer.timeLeft > 24 
                ? `Termina en: ${Math.ceil(offer.timeLeft / 24)} días`
                : `Termina en: ${offer.timeLeft} horas`
              }
            </span>
          </div>
        )}

        {/* Botón de acción */}
        <Button
          variant="primary"
          size={size === "sm" ? "xs" : size === "lg" ? "m" : "s"}
          className={`
            hover:border-transparent w-full transition-all duration-200
            hover:scale-105 active:scale-95
            ${config.button}
          `}
          onClick={handleAddToCart}
        >
          Añadir al carrito
        </Button>
      </div>
    </div>
  );
}

// Componente contenedor para grid responsive
interface DealCardGridProps {
  offers: ProductWithOffer[];
  columns?: {
    base?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function DealCardGrid({ 
  offers, 
  columns = { base: 1, sm: 2, md: 3, lg: 4 },
  size = "md",
  className = "" 
}: DealCardGridProps) {
  const gridClasses = `
    grid gap-4 sm:gap-6
    ${columns.base ? `grid-cols-${columns.base}` : "grid-cols-1"}
    ${columns.sm ? `sm:grid-cols-${columns.sm}` : ""}
    ${columns.md ? `md:grid-cols-${columns.md}` : ""}
    ${columns.lg ? `lg:grid-cols-${columns.lg}` : ""}
    ${columns.xl ? `xl:grid-cols-${columns.xl}` : ""}
  `;

  return (
    <div className={`${gridClasses} ${className}`}>
      {offers.map((offer) => (
        <DealCard
          key={offer.id}
          offer={offer}
          size={size}
        />
      ))}
    </div>
  );
}