// components/FilterSidebar.tsx
"use client";

import { useRouter, useSearchParams } from "next/navigation";
import Button from "@/components/PagesButtons";
import { useFilterState } from "@/hooks/useFilterState";

export function FilterSidebar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const {
    selectedCategories,
    selectedPrice,
    toggleCategory,
    setSelectedPrice,
    applyFilters
  } = useFilterState(searchParams, router);

  const categories = ["Mice", "Keyboards", "Headsets", "Monitors", "Consoles"];
  const priceRanges = [
    { label: "Menos de $50", value: "0-50" },
    { label: "$50 - $100", value: "50-100" },
    { label: "$100 - $200", value: "100-200" },
    { label: "Más de $200", value: "200-1000" },
  ];

  return (
    <div className="p-4 sm:p-5 md:p-6 rounded-lg">
      <div className="grid grid-cols-2 md:grid-cols-1 justify-items-center lg:justify-items-start">
        <div className="mb-5 md:mb-6">
          <h4 className="font-semibold text-base sm:text-lg mb-2 sm:mb-3">Categorías</h4>
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
                  <span className="TextColor3 text-sm sm:text-base">{category}</span>
                </label>
              </li>
            ))}
          </ul>
        </div>

        <div className="mb-5 md:mb-6">
          <h4 className="font-semibold text-base sm:text-lg mb-2 sm:mb-3">Rango de Precio</h4>
          <ul className="space-y-1.5 sm:space-y-2">
            {priceRanges.map((range) => (
              <li key={range.value}>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="price-range"
                    checked={selectedPrice === range.value}
                    onChange={() => setSelectedPrice(selectedPrice === range.value ? null : range.value)}
                    className="mr-2 text-blue-600 w-4 h-4"
                  />
                  <span className="TextColor3 text-sm sm:text-base">{range.label}</span>
                </label>
              </li>
            ))}
          </ul>
        </div>
      </div>

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