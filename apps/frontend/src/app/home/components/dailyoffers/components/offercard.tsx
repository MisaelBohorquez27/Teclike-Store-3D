"use client";

import { Rating } from "@/components/common/rating";
import CartIcon from "@/components/cart/carticon";
import { ProductWithOffer } from "@/types/offers";
import { motion } from "framer-motion";
import Image from "next/image"; // Importar Next Image
import { FiClock } from "react-icons/fi";

export function OfferCard({ product }: { product: ProductWithOffer }) {
  const discountPercentage = product.discount;

  return (
    <motion.div
      whileHover={{
        y: -10,
        transition: { type: "spring", stiffness: 300 },
      }}
      className="group relative h-full"
    >
      {/* Badge de descuento */}
      <div className="absolute -top-2 -right-2 z-20">
        <div className="px-3 py-1.5 rounded-full bg-gradient-to-br from-cyan-600 to-cyan-600 text-white text-sm font-bold shadow-lg transform rotate-3">
          {discountPercentage}
        </div>
      </div>

      {/* Card principal */}
      <div className="bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-4 hover:border-cyan-500/50 transition-all duration-300 h-full flex flex-col overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-cyan-500/10">
        
        {/* Contenedor de imagen */}
        <div className="relative h-48 md:h-56 mb-4 rounded-xl overflow-hidden">
          {/* Imagen del producto optimizada */}
          <motion.div
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.5 }}
            className="w-full h-full"
          >
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              className="object-scale-down"
              sizes="(max-width: 768px) 100vw, 
                     (max-width: 1200px) 50vw, 
                     33vw"
              priority={false}
            />
          </motion.div>

          {/* Overlay de tiempo limitado */}
          <div className="absolute top-3 left-3 px-3 py-1.5 rounded-full bg-black/70 backdrop-blur-sm text-white text-xs font-medium flex items-center gap-1.5">
            <FiClock className="w-3 h-3" />
            <span>24h</span>
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
          <h3 className="font-bold text-lg text-gray-200 mb-2 line-clamp-2 group-hover:text-cyan-400 transition-colors truncate">
            {product.name}
          </h3>

          {/* Precios */}
          <div className="mt-auto">
            <div className="flex items-baseline gap-2 mb-2">
              <span className="text-lg text-gray-500 dark:text-gray-400 line-through">
                {product.originalPrice}
              </span>
              <span className="px-2 py-1 rounded-md bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-500/10 dark:to-emerald-500/10 text-green-600 dark:text-green-400 text-xs font-bold">
                Ahorra {product.savings}
              </span>
            </div>

            <div className="flex items-end justify-between">
              <div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {product.discountPrice}
                </div>
                <p className="text-xs text-gray-400 mt-1">Precio final</p>
              </div>

              {/* Botón de carrito */}
              <motion.div
                whileHover={{ scale: 0.9 }}
                whileTap={{ scale: 0.9 }}
                className="p-3 rounded-xl duration-300 group/cart"
              >
                <div className="relative">
                  <CartIcon />
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
