"use client";

import Button from "@/components/ui/PagesButtons";
import { useSearchParams } from "next/navigation";

export function FilterSidebar() {
  const searchParams = useSearchParams();
  const categories = [
    "Interiores",
    "Muebles",
    "Electrónica",
    "Decoración",
    "Exteriores",
  ];
  const priceRanges = [
    { label: "Menos de $50", value: "0-50" },
    { label: "$50 - $100", value: "50-100" },
    { label: "$100 - $200", value: "100-200" },
    { label: "Más de $200", value: "200-1000" },
  ];

  return (
    <div className="p-6 rounded-lg">

      {/* Filtro por Categoría */}
      <div className="mb-6">
        <h4 className="font-semibold text-lg mb-3 ">Categorías</h4>
        <ul className="space-y-2">
          {categories.map((category) => (
            <li key={category}>
              <label className="flex items-center">
                <input type="checkbox" className="mr-2 rounded text-blue-600" />
                <span className="TextColor3">{category}</span>
              </label>
            </li>
          ))}
        </ul>
      </div>

      {/* Filtro por Precio */}
      <div className="mb-6">
        <h4 className="font-semibold text-lg mb-3">Rango de Precio</h4>
        <ul className="space-y-2">
          {priceRanges.map((range) => (
            <li key={range.value}>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="price-range"
                  className="mr-2 text-blue-600"
                />
                <span className="TextColor3">{range.label}</span>
              </label>
            </li>
          ))}
        </ul>
      </div>

      {/* Botón de Aplicar Filtros */}
      <Button 
      variant="primary"
      size="s"
      className="w-full">
        Aplicar Filtros
      </Button>
    </div>
  );
}
