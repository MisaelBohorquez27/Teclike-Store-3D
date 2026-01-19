// components/hooks/useFilterState.ts
import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";

export function useFilterState(searchParams: URLSearchParams, router: ReturnType<typeof useRouter>) {
  const paramsString = searchParams?.toString() ?? "";

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedPrice, setSelectedPrice] = useState<string | null>(null);

  // Inicializar desde URL
  useEffect(() => {
    const cat = searchParams.get("category");
    setSelectedCategories(cat ? cat.split(",").map((s) => s.trim()).filter(Boolean) : []);

    const min = searchParams.get("minPrice");
    const max = searchParams.get("maxPrice");
    if (min && max) setSelectedPrice(`${min}-${max}`);
    else setSelectedPrice(null);
  }, [paramsString]);

  const toggleCategory = useCallback((category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    );
  }, []);

  const handleSetSelectedPrice = useCallback((price: string | null) => {
    setSelectedPrice(price);
  }, []);

  const applyFilters = useCallback(() => {
    const params = new URLSearchParams(searchParams.toString());

    if (selectedCategories.length > 0) {
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

    // Mantener la query (q) si existe
    router.push(`/products?${params.toString()}`);
  }, [selectedCategories, selectedPrice, searchParams, router]);

  return {
    selectedCategories,
    selectedPrice,
    toggleCategory,
    setSelectedPrice: handleSetSelectedPrice,
    applyFilters
  };
}