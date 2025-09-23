"use client";
import { ProductForDetail } from "@/types/productss";
import Link from "next/link";

export function ProductCard({ product }: { product: ProductForDetail }) {
  return (
    <Link href={`/Products/${product.id}`}>
      <div className="Card-bg rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
        {/* Imagen del Producto */}
        <div className="relative aspect-square">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
          {product.isNew && (
            <span className="absolute top-2 right-2 bg-green-500 text-white text-xs sm:text-sm px-2 py-1 rounded">
              Nuevo
            </span>
          )}
        </div>

        {/* Detalles del Producto */}
        <div className="p-3 sm:p-4 flex flex-col gap-1">
          <div className="flex justify-between items-start gap-2 h-auto min-h-5">
            <h3 className="font-semibold text-base sm:text-lg truncate pr-1 sm:pr-2">
              {product.name}
            </h3>
            <span className="text-xs sm:text-sm text-gray-500">
              {product.category}
            </span>
          </div>

          <div className="mt-1 sm:mt-2 flex items-center">
            {[...Array(5)].map((_, i) => (
              <span
                key={i}
                className={`text-xs sm:text-sm ${
                  i < product.rating ? "text-yellow-400" : "text-gray-300"
                }`}
              >
                ★
              </span>
            ))}
            <span className="text-xs text-gray-500 ml-1">
              ({product.rating})
            </span>
          </div>

          <div className="text-sm text-gray-700 line-clamp-2">
            <p>{product.description}</p>
          </div>

          <div className="mt-3 sm:mt-4 flex justify-between items-center">
            <span className="font-bold text-gray-900 text-sm sm:text-base">
              {product.originalPrice !== null &&
              product.originalPrice !== undefined
                ? `${product.originalPrice}`
                : "Precio no disponible"}
            </span>

            {/* ✅ Botón convertido en enlace */}
            <button
              onClick={() => (window.location.href = `/Products/${product.id}`)}
              className="text-blue-600 hover:text-blue-800 text-xs sm:text-sm font-medium transition-colors cursor-pointer"
            >
              Ver detalles
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}
