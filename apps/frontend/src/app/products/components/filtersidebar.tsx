"use client";

import { useRouter, useSearchParams } from "next/navigation";
import Button from "@/components/common/pagesbuttons";
import { useFilterState } from "@/hooks/usefilterstate";
import { motion, AnimatePresence } from "framer-motion";
import { FiFilter, FiX, FiCheck, FiDollarSign, FiGrid } from "react-icons/fi";
import { useState, useEffect } from "react";

export function FilterSidebar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [categoryCounts, setCategoryCounts] = useState<Record<string, number>>({});

  const {
    selectedCategories,
    selectedPrice,
    toggleCategory,
    setSelectedPrice,
    applyFilters
  } = useFilterState(searchParams, router);

  const categories = ["Mice", "Keyboards", "Headsets", "Monitors", "Consoles", "Accessories", "Gaming Chairs", "Controllers"];
  const priceRanges = [
    { label: "Menos de $50", value: "0-50"},
    { label: "$50 - $100", value: "50-100"},
    { label: "$100 - $200", value: "100-200"},
    { label: "$200 - $500", value: "200-500"},
    { label: "Más de $500", value: "500-5000"},
  ];

  useEffect(() => {
    // Generar conteos solo en client (evita hydration mismatch)
    const counts: Record<string, number> = {};
    categories.forEach(cat => {
      counts[cat] = Math.floor(Math.random() * 50) + 1;
    });
    setCategoryCounts(counts);
  }, []);

  // Contar filtros activos
  const activeFiltersCount = selectedCategories.length + (selectedPrice ? 1 : 0);

  const handleApplyFilters = () => {
    applyFilters();
    setIsMobileOpen(false); // Cerrar en móvil al aplicar
  };

  const handleClearAll = () => {
    selectedCategories.forEach(cat => toggleCategory(cat));
    if (selectedPrice) setSelectedPrice(selectedPrice);
  };

  return (
    <>
      {/* Mobile Filter Toggle Button */}
      <div className="lg:hidden mb-6">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="w-full flex items-center justify-center gap-3 px-6 py-3 bg-linear-to-r from-gray-900 to-black hover:from-gray-800 hover:to-gray-900 border border-gray-800 hover:border-cyan-500/30 rounded-xl text-white font-medium transition-all duration-300"
        >
          <FiFilter className="w-5 h-5" />
          <span>Filtros</span>
          {activeFiltersCount > 0 && (
            <span className="px-2 py-1 text-xs bg-cyan-500 text-white rounded-full">
              {activeFiltersCount}
            </span>
          )}
        </motion.button>
      </div>

      {/* Filter Sidebar */}
      <AnimatePresence>
        {(isMobileOpen || typeof window === 'undefined' || window.innerWidth >= 1024) && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="lg:sticky lg:top-24 bg-linear-to-br from-gray-900/80 to-black/80 backdrop-blur-xl border border-gray-800/50 rounded-2xl p-6 shadow-2xl max-h-[calc(100vh-120px)] overflow-y-auto lg:max-h-none lg:overflow-visible"
          >
            {/* Header */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-linear-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20">
                    <FiFilter className="w-5 h-5 text-cyan-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Filtros</h3>
                </div>
                
                <div className="flex items-center gap-2">
                  {activeFiltersCount > 0 && (
                    <button
                      onClick={handleClearAll}
                      className="text-xs text-gray-400 hover:text-white transition-colors"
                    >
                      Limpiar todo
                    </button>
                  )}
                  <button
                    onClick={() => setIsMobileOpen(false)}
                    className="lg:hidden p-2 hover:bg-gray-800/50 rounded-lg transition-colors"
                  >
                    <FiX className="w-5 h-5 text-gray-400" />
                  </button>
                </div>
              </div>

              {/* Active Filters Indicator */}
              {activeFiltersCount > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-3 rounded-xl bg-linear-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-cyan-300">Filtros activos: {activeFiltersCount}</span>
                    <div className="flex gap-2">
                      {selectedCategories.slice(0, 2).map(cat => (
                        <span key={cat} className="px-2 py-1 text-xs bg-gray-800/50 text-gray-300 rounded-full">
                          {cat}
                        </span>
                      ))}
                      {selectedCategories.length > 2 && (
                        <span className="px-2 py-1 text-xs bg-gray-800/50 text-gray-300 rounded-full">
                          +{selectedCategories.length - 2}
                        </span>
                      )}
                      {selectedPrice && (
                        <span className="px-2 py-1 text-xs bg-gray-800/50 text-gray-300 rounded-full">
                          💰
                        </span>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Grid Layout: 2 columns on mobile, 1 on desktop */}
            <div className="grid grid-cols-1 lg:grid-cols-1 gap-6 mb-8">
              {/* Categories Section */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <FiGrid className="w-4 h-4 text-cyan-400" />
                  <h4 className="text-lg font-semibold text-white">Categorías</h4>
                </div>
                
                <div className="space-y-2">
                  {categories.map((category, index) => (
                    <motion.div
                      key={category}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.03 }}
                    >
                      <label className="group flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-all duration-300 cursor-pointer">
                        <div className="relative">
                          <input
                            type="checkbox"
                            checked={selectedCategories.includes(category)}
                            onChange={() => toggleCategory(category)}
                            className="sr-only"
                          />
                          <div className={`w-5 h-5 rounded border flex items-center justify-center transition-all ${
                            selectedCategories.includes(category)
                              ? 'bg-linear-to-r from-cyan-500 to-blue-500 border-transparent'
                              : 'border-gray-700 group-hover:border-gray-600'
                          }`}>
                            {selectedCategories.includes(category) && (
                              <FiCheck className="w-3 h-3 text-white" />
                            )}
                          </div>
                        </div>
                        <span className={`text-sm transition-colors ${
                          selectedCategories.includes(category)
                            ? 'text-gray-100 font-medium'
                            : 'text-gray-400 group-hover:text-gray-200'
                        }`}>
                          {category}
                        </span>
                        <span className="ml-auto text-xs text-gray-500">
                          {categoryCounts[category] ?? "-"}
                        </span>
                      </label>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Price Range Section */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <FiDollarSign className="w-4 h-4 text-green-400" />
                  <h4 className="text-lg font-semibold text-white">Rango de Precio</h4>
                </div>
                
                <div className="space-y-2">
                {priceRanges.map((range, index) => (
                  <motion.div
                    key={range.value}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.03 + 0.2 }}
                  >
                    <label className="group flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-all duration-300 cursor-pointer">
                      <div className="relative">
                        <input
                          type="radio"
                          name="price-range"
                          checked={selectedPrice === range.value}
                          onChange={() => setSelectedPrice(selectedPrice === range.value ? null : range.value)}
                          className="sr-only"
                        />
                        <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all ${
                          selectedPrice === range.value
                            ? 'border-transparent'
                            : 'border-gray-700 group-hover:border-gray-600'
                        }`}>
                          <div className={`w-2.5 h-2.5 rounded-full transition-all ${
                            selectedPrice === range.value
                              ? 'bg-linear-to-r from-green-500 to-emerald-500'
                              : 'bg-transparent'
                          }`} />
                        </div>
                      </div>
                      <span className={`text-sm transition-colors ${
                        selectedPrice === range.value
                          ? 'text-gray-100 font-medium'
                          : 'text-gray-400 group-hover:text-gray-200'
                      }`}>
                        {range.label}
                      </span>
                    </label>
                  </motion.div>
                ))}
              </div>
              </div>
            </div>

            {/* Apply Filters Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Button
                variant="primary"
                size="m"
                className="w-full group relative overflow-hidden bg-linear-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-cyan-500/20"
                onClick={handleApplyFilters}
              >
                <span className="flex items-center justify-center gap-2 relative z-10">
                  <FiCheck className="w-5 h-5" />
                  Aplicar Filtros
                  {activeFiltersCount > 0 && (
                    <span className="px-2 py-0.5 text-xs bg-white/20 rounded-full">
                      {activeFiltersCount}
                    </span>
                  )}
                </span>
                <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent -skew-x-12 transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              </Button>
            </motion.div>

            {/* Reset Filters */}
            {activeFiltersCount > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-4 text-center"
              >
                <button
                  onClick={handleClearAll}
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  Restablecer filtros
                </button>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}