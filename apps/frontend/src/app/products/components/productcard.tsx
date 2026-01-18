"use client";

import { ProductForDetail } from "@/types/productss";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  FiEye,
  FiStar,
  FiShoppingBag,
  FiZap,
  FiShoppingCart,
} from "react-icons/fi";
import { Rating } from "@/components/common/rating";
import Image from "next/image";

export function ProductCard({ product }: { product: ProductForDetail }) {
  return (
    <Link href={`/Products/${product.slug}`} className="block">
      <motion.div
        whileHover={{
          y: -8,
          transition: { type: "spring", stiffness: 300 },
        }}
        className="group relative h-full"
      >
        {/* Card principal */}
        <div className="bg-gradient-to-br from-gray-900/60 to-black/60 backdrop-blur-sm border border-gray-800/50 rounded-2xl p-4 hover:border-cyan-500/30 transition-all duration-300 h-full flex flex-col overflow-hidden group-hover:shadow-2xl group-hover:shadow-cyan-500/10">
          {/* Imagen del Producto */}
          <div className="relative aspect-square mb-4 rounded-xl overflow-hidden">
            {/* Imagen del producto optimizada */}
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="w-full h-full group-hover:scale-110 transition-transform duration-500"
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

            {/* Overlay de imagen */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {/* Botones flotante */}
            <div className="absolute bottom-4 left-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300">
              <button className="flex-1 flex items-center justify-center gap-2 py-2 px-3 bg-white/10 backdrop-blur-md hover:bg-white/20 text-white text-sm rounded-lg transition-colors cursor-pointer">
                <FiEye className="w-4 h-4" />
                <span className="truncate">Detalles</span>
              </button>
              <button className="flex-1 flex items-center justify-center gap-2 py-2 px-3 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white text-sm rounded-lg transition-all cursor-pointer">
                <FiShoppingCart className="w-4 h-4" />
                <span>Comprar</span>
              </button>
            </div>
          </div>

          {/* Contenido */}
          <div className="flex-grow space-y-3">
            {/* Categoría */}
            <div>
              <span className="text-xs text-cyan-400 font-medium bg-cyan-500/10 px-2 py-1 rounded-full">
                {product.category}
              </span>
            </div>

            {/* Nombre y Rating */}
            <div>
              <h3 className="font-bold text-lg text-gray-100 mb-2 line-clamp-2 group-hover:text-cyan-300 transition-colors truncate">
                {product.name}
              </h3>
            </div>

            {/* Descripción */}
            <p className="text-gray-300 text-sm line-clamp-2 leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Precio y CTA */}
          <div className="mt-auto pt-4 border-t border-gray-800/50">
            <div className="flex justify-between items-center">
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-gray-100">
                  {product.price}
                </span>
              </div>

              <button className="px-4 py-2 text-gray-100 text-sm font-medium rounded-lg transition-all group-hover:scale-105 flex items-center gap-2 cursor-pointer">
                <FiShoppingBag className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
