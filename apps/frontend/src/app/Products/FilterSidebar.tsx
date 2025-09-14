"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Button from "@/components/ui/PagesButtons";

export function FilterSidebar() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Estado local para filtros
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedPrice, setSelectedPrice] = useState<string | null>(null);

  const categories = ["Mice", "Keyboards", "Headsets", "Monitors", "Consoles"];
  const priceRanges = [
    { label: "Menos de $50", value: "0-50" },
    { label: "$50 - $100", value: "50-100" },
    { label: "$100 - $200", value: "100-200" },
    { label: "Más de $200", value: "200-1000" },
  ];

  // Cuando el usuario hace click en checkbox categoría
  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  // Cuando aplica filtros → actualizamos URL
  const applyFilters = () => {
    const params = new URLSearchParams(searchParams.toString());

    // Categorías (ejemplo: category=Mice,Keyboards)
    if (selectedCategories.length > 0) {
      params.set("category", selectedCategories.join(","));
    } else {
      params.delete("category");
    }

    // Rango de precios
    if (selectedPrice) {
      const [min, max] = selectedPrice.split("-");
      params.set("minPrice", min);
      params.set("maxPrice", max);
    } else {
      params.delete("minPrice");
      params.delete("maxPrice");
    }

    // Reiniciar paginación cuando aplico filtros
    params.set("page", "1");

    router.push(`/Search?${params.toString()}`);
    
  };

  return (
    <div className="p-4 sm:p-5 md:p-6 rounded-lg">
      {/* Filtro por Categoría */}
      <div className="grid grid-cols-2 md:grid-cols-1 justify-items-center lg:justify-items-start">
        <div className="mb-5 md:mb-6">
          <h4 className="font-semibold text-base sm:text-lg mb-2 sm:mb-3">
            Categorías
          </h4>
          <ul className="space-y-1.5 sm:space-y-2">
            {categories.map((category) => (
              <li key={category}>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(category)}
                    onChange={() => toggleCategory(category)}
                    className="mr-2 rounded text-blue-600 w-4 h-4"
                  />
                  <span className="TextColor3 text-sm sm:text-base">
                    {category}
                  </span>
                </label>
              </li>
            ))}
          </ul>
        </div>

        {/* Filtro por Precio */}
        <div className="mb-5 md:mb-6">
          <h4 className="font-semibold text-base sm:text-lg mb-2 sm:mb-3">
            Rango de Precio
          </h4>
          <ul className="space-y-1.5 sm:space-y-2">
            {priceRanges.map((range) => (
              <li key={range.value}>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="price-range"
                    checked={selectedPrice === range.value}
                    onChange={() => setSelectedPrice(range.value)}
                    className="mr-2 text-blue-600 w-4 h-4"
                  />
                  <span className="TextColor3 text-sm sm:text-base">
                    {range.label}
                  </span>
                </label>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Botón de Aplicar Filtros */}
      <div className="flex justify-center">
        <Button
          variant="primary"
          size="s"
          className="w-xs xl:w-full text-sm sm:text-base py-2 sm:py-2.5"
          onClick={applyFilters}
        >
          Aplicar Filtros
        </Button>
      </div>
    </div>
  );
}
