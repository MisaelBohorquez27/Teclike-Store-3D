// components/FilterSidebar.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Button from "@/components/ui/PagesButtons";

export function FilterSidebar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const paramsString = searchParams?.toString() ?? "";

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

  // Inicializar desde URL
  useEffect(() => {
    const cat = searchParams.get("category");
    setSelectedCategories(cat ? cat.split(",").map((s) => s.trim()).filter(Boolean) : []);

    const min = searchParams.get("minPrice");
    const max = searchParams.get("maxPrice");
    if (min && max) setSelectedPrice(`${min}-${max}`);
    else setSelectedPrice(null);
  }, [paramsString]);

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    );
  };

  const applyFilters = () => {
    const params = new URLSearchParams(searchParams.toString());

    if (selectedCategories.length > 0) {
      // guardamos CSV: "Mice,Keyboards" (backend puede adaptarse si quieres OR)
      params.set("category", selectedCategories.join(","));
    } else {
      params.delete("category");
    }

    if (selectedPrice) {
      const [min, max] = selectedPrice.split("-");
      params.set("minPrice", min);
      params.set("maxPrice", max);
    } else {
      params.delete("minPrice");
      params.delete("maxPrice");
    }

    // reset pagina
    params.set("page", "1");

    // Mantener la query (q) si existe — no la eliminamos
    // Redirigir a la ruta que muestra los productos (ajusta si tu ruta es /Products o /products)
    router.push(`/Products?${params.toString()}`);
  };

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
