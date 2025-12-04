"use client";

import { Rating } from "@/components/Rating";
import CartIcon from "@/components/CartIcon";
import { ProductWithOffer } from "@/types/offers";
import { motion } from "framer-motion";
import { FiClock, FiZap, FiShoppingCart, FiEye, FiTrendingUp } from "react-icons/fi";

export function OfferCard({ product }: { product: ProductWithOffer }) {
  // Calcular porcentaje de descuento si no viene en product.discount
  const discountPercentage = product.discount;

  return (
    <motion.div
      whileHover={{ 
        y: -10,
        transition: { type: "spring", stiffness: 300 }
      }}
      className="group relative h-full"
    >
      {/* Badge de descuento */}
      <div className="absolute -top-2 -right-2 z-20">
        <div className="px-3 py-1.5 rounded-full bg-gradient-to-br from-red-600 to-pink-600 text-white text-sm font-bold shadow-lg transform rotate-3">
          {discountPercentage}
        </div>
      </div>

      {/* Card principal */}
      <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-900/90 dark:to-gray-800/90 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-2xl p-4 hover:border-orange-400/50 dark:hover:border-orange-500/50 transition-all duration-300 h-full flex flex-col overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-orange-500/20 dark:hover:shadow-orange-500/10">
        
        {/* Contenedor de imagen */}
        <div className="relative h-48 md:h-56 mb-4 rounded-xl overflow-hidden">
          {/* Imagen del producto */}
          <motion.img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            loading="lazy"
            decoding="async"
          />
          
          {/* Overlay de tiempo limitado */}
          <div className="absolute top-3 left-3 px-3 py-1.5 rounded-full bg-black/70 backdrop-blur-sm text-white text-xs font-medium flex items-center gap-1.5">
            <FiClock className="w-3 h-3" />
            <span>24h</span>
          </div>
          
          {/* Overlay de hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Botones flotantes */}
          <div className="absolute bottom-4 left-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300">
            <button className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-white/20 backdrop-blur-md hover:bg-white/30 text-white text-sm rounded-lg transition-colors">
              <FiEye className="w-4 h-4" />
              <span className="hidden sm:inline">Ver</span>
            </button>
            <button className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-400 hover:to-red-400 text-white text-sm font-medium rounded-lg transition-all shadow-md hover:shadow-lg">
              <FiShoppingCart className="w-4 h-4" />
              <span className="hidden sm:inline">Comprar</span>
            </button>
          </div>
        </div>

        {/* Contenido de la card */}
        <div className="flex-grow">
          {/* Categoría */}
          <div className="mb-3">
            <span className="inline-block px-3 py-1 rounded-full bg-gradient-to-r from-blue-100 to-cyan-100 dark:from-cyan-500/10 dark:to-cyan-500/10 text-cyan-600 dark:text-cyan-400 text-xs font-medium">
              {product.offerType || "Oferta Especial"}
            </span>
          </div>

          {/* Nombre del producto */}
          <h3 className="font-bold text-lg text-gray-200 mb-2 line-clamp-2 group-hover:text-cyan-400 transition-colors">
            {product.name}
          </h3>

          {/* Precios */}
          <div className="mt-auto">
            <div className="flex items-baseline gap-2 mb-2">
              {/* Precio original tachado */}
              <span className="text-lg text-gray-500 dark:text-gray-400 line-through">
                {product.originalPrice}
              </span>
              
              {/* Badge de ahorro */}
              <span className="px-2 py-1 rounded-md bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-500/10 dark:to-emerald-500/10 text-green-600 dark:text-green-400 text-xs font-bold">
                Ahorra {product.savings}
              </span>
            </div>

            {/* Precio oferta destacado */}
            <div className="flex items-end justify-between">
              <div>
                <div className="text-3xl font-bold text-gray-900 dark:text-white">
                  {product.discountPrice}
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Precio final
                </p>
              </div>

              {/* Botón de carrito */}
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="p-3 rounded-xl bg-gradient-to-br from-gray-100 to-white dark:from-gray-800 dark:to-gray-900 hover:from-orange-500 hover:to-red-500 border border-gray-200 dark:border-gray-700 hover:border-transparent shadow-md hover:shadow-lg transition-all duration-300 group/cart"
              >
                <div className="relative">
                  <CartIcon />
                  {/* Indicador de nuevo item */}
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full animate-ping opacity-75 group-hover/cart:hidden" />
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}