"use client";

import { ProductForCard } from "@/types/productss";
import { motion } from "framer-motion";
import { FiEye, FiShoppingBag, FiShoppingCart, FiStar } from "react-icons/fi";

interface TrendingProductCardProps {
  product: ProductForCard;
}

export const TrendingProductCard = ({ product }: TrendingProductCardProps) => {
  const hasDiscount =
    product.discountPrice && product.discountPrice < product.price;

  return (
    <motion.div
      whileHover={{
        y: -8,
        transition: { type: "spring", stiffness: 300 },
      }}
      className="group relative h-full"
    >
      {/* Card principal */}
      <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800/50 rounded-2xl p-4 hover:border-cyan-500/30 transition-all duration-300 h-full flex flex-col overflow-hidden group-hover:shadow-2xl group-hover:shadow-cyan-500/10">
        {/* Imagen con efecto */}
        <div className="relative h-48 md:h-56 mb-4 rounded-xl overflow-hidden">
          <motion.img
            src={product.imageUrl}
            alt={product.name}
            className="object-scale-down w-full h-full group-hover:scale-110 transition-transform duration-500"
            loading="lazy"
            decoding="async"
            initial={{ scale: 1 }}
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.5 }}
          />

          {/* Overlay de imagen */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Botones flotantes */}
          <div className="absolute bottom-4 left-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300">
            <button className="flex-1 flex items-center justify-center gap-2 py-2 px-3 bg-white/10 backdrop-blur-md hover:bg-white/20 text-white text-sm rounded-lg transition-colors cursor-pointer">
              <FiEye className="w-4 h-4" />
              <span>Ver</span>
            </button>
            <button className="flex-1 flex items-center justify-center gap-2 py-2 px-3 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white text-sm rounded-lg transition-all cursor-pointer">
              <FiShoppingCart className="w-4 h-4" />
              <span>Comprar</span>
            </button>
          </div>
        </div>

        {/* Contenido */}
        <div className="flex-grow">
          {/* Categoría */}
          <div className="mb-2">
            <span className="text-xs text-cyan-400 font-medium bg-cyan-500/10 px-2 py-1 rounded-full">
              {product.category}
            </span>
          </div>

          {/* Nombre del producto */}
          <h3 className="font-bold text-lg text-white mb-2 line-clamp-2 group-hover:text-cyan-300 transition-colors truncate">
            {product.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-4">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <FiStar
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(product.rating || 4.5)
                      ? "text-yellow-400 fill-yellow-400"
                      : "text-gray-600"
                  }`}
                />
              ))}
            </div>
            <span className="text-xs text-gray-400">
              ({product.reviewCount || Math.floor(Math.random() * 100) + 1})
            </span>
          </div>
        </div>

        {/* Precio y CTA */}
        <div className="mt-auto pt-4 border-t border-gray-800/50">
          <div className="flex justify-between items-center">
            <div className="flex flex-col">
              {hasDiscount ? (
                <>
                  <span className="text-2xl font-bold text-white">
                    {product.currency} {product.discountPrice}
                  </span>
                  <span className="text-sm text-gray-500 line-through">
                    {product.currency} {product.price}
                  </span>
                </>
              ) : (
                <span className="text-2xl font-bold text-white">
                  {product.currency} {product.price}
                </span>
              )}
            </div>

            <button className="px-4 py-2 text-white text-sm font-medium rounded-lg transition-all group-hover:scale-105">
              <FiShoppingBag className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
