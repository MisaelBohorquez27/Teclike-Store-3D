import { SearchResult } from "@/services/Search";
import Link from "next/dist/client/link";


export function SearchProductCard({ product }: { product: SearchResult }) {
  return (
    <div className="Card-bg rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
        {/* Imagen del Producto */}
      <div className="relative aspect-square">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover"
        />
        
      </div>
      {/* Detalles del Producto */}
      <div className="p-3 sm:p-4 flex flex-col gap-1">
        <div className="flex justify-between items-start gap-2 h-auto min-h-5">
          <h3 className="font-semibold text-base sm:text-lg truncate pr-1 sm:pr-2">{product.name}</h3>
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
          <span className="text-xs text-gray-500 ml-1">({product.rating})</span>
        </div>
        
       {/* <div className="text-sm text-gray-700 line-clamp-2">
          <p>{product.description}</p>
        </div> */}

        <div className="mt-3 sm:mt-4 flex justify-between items-center">
          <span className="font-bold text-gray-900 text-sm sm:text-base">
            ${product.price}
          </span>
          
          {/* ✅ Botón convertido en enlace */}
          <Link 
            href={`/Products/${product.id}`}
            className="text-blue-600 hover:text-blue-800 text-xs sm:text-sm font-medium transition-colors"
          >
            Ver detalles
          </Link>
        </div>
      </div>
    </div>
  );
}
