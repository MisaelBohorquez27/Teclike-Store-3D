"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useSearch } from "../../hooks/search.hook";
import { SearchSuggestion } from "@/types/searchSuggestions";

interface SearchBarProps {
  placeholder?: string;
  className?: string;
  variant?: "default" | "minimal" | "expanded";
  autoFocus?: boolean;
  initialQuery?: string;
}

export function SearchBar3({ 
  placeholder = "Buscar productos...", 
  className = "", 
  variant = "default",
  autoFocus = false,
  initialQuery = ""
}: SearchBarProps) {
  const {
    query,
    setQuery,
    suggestions,
    isLoading,
    showSuggestions,
    setShowSuggestions,
    search
  } = useSearch();

  const [selectedIndex, setSelectedIndex] = useState(-1);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  // Sincronizar con initialQuery
  useEffect(() => {
    if (initialQuery) {
      setQuery(initialQuery);
    }
  }, [initialQuery, setQuery]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    setSelectedIndex(-1);
    setShowSuggestions(true);
    search(value); // Usar el debounced search del hook
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      performSearch(query.trim());
    }
  };

  const handleSuggestionClick = (suggestion: SearchSuggestion) => {
    setQuery(suggestion.name);
    setShowSuggestions(false);
    performSearch(suggestion.name);
  };

  const performSearch = (searchQuery: string) => {
    // Redirigir a la página de búsqueda
    router.push(`/Search?q=${encodeURIComponent(searchQuery)}`);
    setShowSuggestions(false);
    inputRef.current?.blur();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showSuggestions || suggestions.length === 0) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < suggestions.length - 1 ? prev + 1 : prev
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
        break;
      case "Enter":
        e.preventDefault();
        if (selectedIndex >= 0 && selectedIndex < suggestions.length) {
          handleSuggestionClick(suggestions[selectedIndex]);
        } else if (query.trim()) {
          performSearch(query.trim());
        }
        break;
      case "Escape":
        setShowSuggestions(false);
        setSelectedIndex(-1);
        break;
    }
  };

  const handleBlur = () => {
    setTimeout(() => {
      setShowSuggestions(false);
      setSelectedIndex(-1);
    }, 200);
  };

  // Estilos según la variante
  const getVariantStyles = () => {
    switch (variant) {
      case "minimal":
        return "border-0 bg-transparent focus:outline-none px-2 py-1";
      case "expanded":
        return "px-6 py-3 text-lg border-2 border-gray-300 focus:border-blue-500 rounded-full";
      default:
        return "px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent";
    }
  };

  const getContainerStyles = () => {
    switch (variant) {
      case "minimal":
        return "border-b border-gray-200";
      case "expanded":
        return "bg-white rounded-full shadow-lg";
      default:
        return "bg-white rounded-lg";
    }
  };

  return (
    <div className={`relative ${className}`}>
      <form 
        onSubmit={handleSubmit} 
        className={`relative flex items-center ${getContainerStyles()}`}
      >
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => setShowSuggestions(true)}
          onBlur={handleBlur}
          placeholder={placeholder}
          autoFocus={autoFocus}
          className={`w-full bg-transparent focus:outline-none ${getVariantStyles()}`}
        />
        
        <button
          type="submit"
          className={`flex-shrink-0 ${
            variant === "minimal" 
              ? "text-gray-500 hover:text-gray-700 px-2" 
              : "bg-blue-600 text-white hover:bg-blue-700 rounded-r-lg px-4 py-2"
          }`}
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>
      </form>

      {/* Sugerencias */}
      {showSuggestions && query.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
          {isLoading ? (
            <div className="p-3 text-center text-gray-500">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500 mx-auto"></div>
              <p className="mt-1 text-sm">Buscando...</p>
            </div>
          ) : suggestions.length > 0 ? (
            <ul>
              {suggestions.map((suggestion, index) => (
                <li
                  key={suggestion.id}
                  className={`p-3 cursor-pointer border-b border-gray-100 last:border-b-0 hover:bg-gray-50 ${
                    index === selectedIndex ? "bg-blue-50" : ""
                  }`}
                  onMouseDown={() => handleSuggestionClick(suggestion)}
                >
                  <div className="flex items-center">
                    {suggestion.imageUrl && (
                      <img
                        src={suggestion.imageUrl}
                        alt={suggestion.name}
                        className="w-8 h-8 object-cover rounded mr-3"
                      />
                    )}
                    <div className="flex-1">
                      <p className="font-medium text-sm text-gray-900">
                        {suggestion.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {suggestion.category}
                      </p>
                    </div>
                    <span className="font-semibold text-sm text-gray-700">
                      ${suggestion.price.toFixed(2)}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          ) : query.length > 1 ? (
            <div className="p-3 text-center text-gray-500">
              <p className="text-sm">No se encontraron sugerencias</p>
              <button
                onMouseDown={() => performSearch(query)}
                className="text-blue-600 hover:text-blue-800 text-xs mt-1"
              >
                Buscar "{query}"
              </button>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}