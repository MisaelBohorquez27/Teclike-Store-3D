"use client";

import Button from "@/components/ui/PagesButtons";
import { OfferProduct } from "@/types/productss";

export function DealCard({
  deal,
  isFlashDeal = false,
}: {
  deal: OfferProduct;
  isFlashDeal?: boolean;
}) {
  return (
    <div className="Card-bg rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      {/* Imagen + Descuento */}
      <div className="relative">
        <img
          src={deal.image}
          alt={deal.name}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-2 right-2 DealCard-Discount text-sm font-bold px-2 py-1 rounded">
          {deal.discount}
        </div>
      </div>

      {/* Contenido */}
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-2">{deal.name}</h3>

        {/* Precios */}
        <div className="flex items-center space-x-2 mb-3">
          <span className="text-xl font-bold DealCard-Price">
            {deal.discountPrice}
          </span>
          <span className="text-gray-500 line-through">
            {deal.originalPrice}
          </span>
        </div>

        {/* Tiempo restante (solo flash deals) */}
        {isFlashDeal && deal.timeLeft && (
          <div className="flex items-center text-sm text-gray-500 mb-4">
            <span className="mr-1">⏳</span>
            <span>Termina en: {deal.timeLeft} horas</span>
          </div>
        )}

        <Button
          variant="primary"
          size="s"
          className="hover:border-transparent w-full"
        >
          Añadir al carrito
        </Button>
      </div>
    </div>
  );
}
