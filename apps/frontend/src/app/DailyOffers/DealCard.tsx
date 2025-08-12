"use client";

import Button from "@/components/ui/PagesButtons";

type Deal = {
  id: number;
  name: string;
  originalPrice: number;
  discountPrice: number;
  discount: number;
  image: string;
  sold?: number;
  total?: number;
  timeLeft?: number;
};

export function DealCard({
  deal,
  isFlashDeal = false,
}: {
  deal: Deal;
  isFlashDeal?: boolean;
}) {
  return (
    <div className="Card-bg rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      {/* Badge de Oferta */}
      <div className="relative">
        <img
          src={deal.image}
          alt={deal.name}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-2 right-2 DealCard-Discount text-sm font-bold px-2 py-1 rounded">
          -{deal.discount}%
        </div>
      </div>

      {/* Contenido */}
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-2">{deal.name}</h3>

        {/* Precios */}
        <div className="flex items-center space-x-2 mb-3">
          <span className="text-xl font-bold DealCard-Price">
            ${deal.discountPrice.toFixed(2)}
          </span>
          <span className="text-gray-500 line-through">
            ${deal.originalPrice.toFixed(2)}
          </span>
        </div>

        {/* Barra de progreso para Flash Deals */}
        {isFlashDeal && deal.sold && deal.total && (
          <div className="mb-3">
            <div className="flex justify-between text-xs text-gray-500 mb-1">
              <span>
                Vendidos: {deal.sold}/{deal.total}
              </span>
              <span>{Math.round((deal.sold / deal.total) * 100)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="DealCard-Bar h-2 rounded-full"
                style={{ width: `${(deal.sold / deal.total) * 100}%` }}
              ></div>
            </div>
          </div>
        )}

        {/* Tiempo restante */}
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
