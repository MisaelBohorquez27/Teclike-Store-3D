"use client";

import Button from "@/components/common/pagesbuttons";
import Image from "next/image";
import { Rating } from "@/components/common/rating";
import { ProductWithOffer } from "@/types/offers";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  FiShoppingCart,
  FiZap,
  FiClock,
  FiEye,
  FiTrendingUp,
  FiShoppingBag,
} from "react-icons/fi";
import CartIcon from "@/components/cart/carticon";

interface DealCardProps {
  offer: ProductWithOffer;
  size?: "sm" | "md" | "lg";
  showTimer?: boolean;
  showBrand?: boolean;
  showRating?: boolean;
  className?: string;
  onAddToCart?: (offer: ProductWithOffer) => void;
}

export function DealCard({
  offer,
  size = "lg",
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
      image: "h-38",
      title: "text-sm",
      price: "text-lg",
      discount: "text-xs px-2 py-0.5",
      button: "text-xs",
      padding: "p-3",
      icon: "w-3 h-3",
    },
    md: {
      image: "h-46",
      title: "text-base",
      price: "text-xl",
      discount: "text-sm px-2 py-1",
      button: "text-sm",
      padding: "p-4",
      icon: "w-4 h-4",
    },
    lg: {
      image: "h-50",
      title: "text-lg",
      price: "text-2xl",
      discount: "text-base px-3 py-1.5",
      button: "text-base",
      padding: "p-5",
      icon: "w-5 h-5",
    },
  };

  const config = sizeConfig[size];
  const discountPercentage = offer.discount;

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
    <motion.div
      whileHover={{
        y: -10,
        transition: { type: "spring", stiffness: 300 },
      }}
      className={`group relative h-full ${className}`}
    >
      {/* Badge de descuento */}
      <div className="absolute -top-2 -right-2 z-20">
        <div className="px-3 py-1.5 rounded-full bg-gradient-to-br from-cyan-600 to-cyan-600 text-white text-sm font-bold shadow-lg transform rotate-3">
          {discountPercentage}
        </div>
      </div>

      {/* Badge de flash deal */}
      {offer.isFlashDeal && (
        <div className="absolute -top-2 -left-2 z-20">
          <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-gradient-to-r from-red-500 to-orange-500 text-white text-xs font-bold shadow-lg">
            <FiZap className="w-3 h-3 animate-pulse" />
            <span>FLASH</span>
          </div>
        </div>
      )}

      {/* Card principal */}
      <div className="bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-4 hover:border-cyan-500/50 transition-all duration-300 h-full flex flex-col overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-cyan-500/10">
        {/* Contenedor de imagen */}
        <div className="relative mb-4 rounded-xl overflow-hidden">
          {/* Imagen principal */}
          <div
            className={`relative ${config.image} w-full overflow-hidden rounded-xl`}
          >
            {/* Imagen del producto optimizada */}
            <motion.div
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.5 }}
              className="w-full h-full group-hover:scale-110 transition-transform duration-500"
            >
              <Image
                src={offer.imageUrl}
                alt={offer.name}
                fill
                className="object-scale-down"
                sizes="(max-width: 768px) 100vw, 
                     (max-width: 1200px) 50vw, 
                     33vw"
                priority={false}
              />
            </motion.div>

            {/* Overlay de tiempo limitado */}
            {showTimer && offer.isFlashDeal && (
              <div className="absolute top-3 left-3 px-3 py-1.5 rounded-full bg-black/70 backdrop-blur-sm text-white text-xs font-medium flex items-center gap-1.5">
                <FiClock className="w-3 h-3" />
                <span>24h</span>
              </div>
            )}

            {/* Skeleton loader mientras carga */}
            {!imageLoaded && (
              <div className="absolute inset-0 bg-gray-800/50 animate-pulse rounded-xl" />
            )}

            {/* Botones flotantes */}
            <div className="absolute bottom-4 left-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300">
              <button className="flex-1 flex items-center justify-center gap-2 py-2 px-3 bg-white/10 backdrop-blur-md hover:bg-white/20 text-white text-sm rounded-lg transition-colors cursor-pointer">
                <FiEye className="w-4 h-4" />
                <span className="truncate">Detalles</span>
              </button>
              <button
                onClick={handleAddToCart}
                className="flex-1 flex items-center justify-center gap-2 py-2 px-3 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white text-sm rounded-lg transition-all cursor-pointer"
              >
                <FiShoppingCart className="w-4 h-4" />
                <span>Comprar</span>
              </button>
            </div>
          </div>
        </div>

        {/* Contenido de la card */}
        <div className="flex-grow">
          {/* Marca (opcional) */}
          {showBrand && offer.brand && (
            <div className="mb-2">
              <span className="inline-block px-3 py-1 rounded-full bg-gradient-to-r from-blue-100 to-cyan-100 dark:from-cyan-500/10 dark:to-cyan-500/10 text-cyan-600 dark:text-cyan-400 text-xs font-medium">
                {offer.brand}
              </span>
            </div>
          )}

          {/* Nombre del producto */}
          <h3
            className={`
              font-bold text-gray-200 mb-2 line-clamp-2 group-hover:text-cyan-400 transition-colors
              ${config.title}
            `}
            title={offer.name}
          >
            {offer.name}
          </h3>

          {/* Rating (opcional) */}
          {showRating && (
            <Rating
              value={offer.rating}
              size="sm"
              showValue={false}
              className="my-1"
            />
          )}

          {/* Tiempo restante detallado */}
          {showTimer && offer.isFlashDeal && offer.timeLeft && (
            <div className="my-3 p-3 rounded-lg bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/20">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FiClock className="w-3 h-3 text-orange-400 animate-pulse" />
                  <span className="text-xs text-orange-300">
                    {offer.timeLeft > 24
                      ? `Termina en: ${Math.ceil(offer.timeLeft / 24)} días`
                      : `Termina en: ${offer.timeLeft} horas`}
                  </span>
                </div>
                <FiTrendingUp className="w-3 h-3 text-green-400" />
              </div>
            </div>
          )}
        </div>

        {/* Precio y CTA */}
        <div className="mt-auto pt-4 border-t border-gray-800/50">
          {/* Precios */}
          <div className="mb-4">
            <div className="flex items-baseline gap-2 mb-1">
              {/* Precio original tachado */}
              <span className="text-lg text-gray-500 line-through">
                {offer.originalPrice}
              </span>

              {/* Badge de ahorro */}
              {offer.savings && offer.savings !== "$0.00" && (
                <span className="px-2 py-1 rounded-md bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-500/10 dark:to-emerald-500/10 text-green-600 dark:text-green-400 text-xs font-bold">
                  Ahorras {offer.savings}
                </span>
              )}
            </div>

            {/* Precio oferta destacado */}
            <div className="flex items-end justify-between">
              <div>
                <div className={`font-bold text-gray-100 ${config.price}`}>
                  {offer.discountPrice}
                </div>
                <p className="text-xs text-gray-400 mt-1">Precio final</p>
              </div>

              {/* Icono de carrito pequeño */}
              <motion.div
                whileHover={{ scale: 0.9 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 rounded-xl duration-300 group/cart"
              >
                <div className="relative">
                  <FiShoppingBag />
                </div>
              </motion.div>
            </div>
          </div>

          {/* Botón de acción 
          <Button
            variant="primary"
            size={size === "sm" ? "xs" : size === "lg" ? "m" : "s"}
            className={`
              w-full hover:border-transparent transition-all duration-200
              hover:scale-105 active:scale-95 group/btn
              bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500
              text-white font-medium border-0
              ${config.button}
            `}
            onClick={handleAddToCart}
          >
            <span className="flex items-center justify-center gap-2">
              <FiShoppingCart className={`${config.icon} group-hover/btn:scale-110 transition-transform`} />
              Añadir al carrito
            </span>
          </Button> */}
        </div>
      </div>
    </motion.div>
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
  className = "",
}: DealCardGridProps) {
  // Mapeo de columnas a clases de grid
  const gridClasses = `
    grid gap-4 sm:gap-6
    ${
      columns.base === 1
        ? "grid-cols-1"
        : columns.base === 2
        ? "grid-cols-2"
        : columns.base === 3
        ? "grid-cols-3"
        : columns.base === 4
        ? "grid-cols-4"
        : "grid-cols-1"
    }
    ${
      columns.sm === 2
        ? "sm:grid-cols-2"
        : columns.sm === 3
        ? "sm:grid-cols-3"
        : columns.sm === 4
        ? "sm:grid-cols-4"
        : ""
    }
    ${
      columns.md === 2
        ? "md:grid-cols-2"
        : columns.md === 3
        ? "md:grid-cols-3"
        : columns.md === 4
        ? "md:grid-cols-4"
        : ""
    }
    ${
      columns.lg === 2
        ? "lg:grid-cols-2"
        : columns.lg === 3
        ? "lg:grid-cols-3"
        : columns.lg === 4
        ? "lg:grid-cols-4"
        : ""
    }
    ${
      columns.xl === 2
        ? "xl:grid-cols-2"
        : columns.xl === 3
        ? "xl:grid-cols-3"
        : columns.xl === 4
        ? "xl:grid-cols-4"
        : ""
    }
  `;

  return (
    <div className={`${gridClasses} ${className}`}>
      {offers.map((offer) => (
        <DealCard key={offer.id} offer={offer} size={size} />
      ))}
    </div>
  );
}
