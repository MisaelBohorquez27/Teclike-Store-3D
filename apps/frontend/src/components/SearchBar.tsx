"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useSearch } from "@/hooks/useSearch";
import { SearchSuggestion } from "@/types/search";
import {
  getVariantStyles,
  getContainerStyles,
} from "@/utils/searchStyles";
import {
  handleKeyNavigation,
  handleBlurWithDelay,
} from "@/helpers/searchHelpers";

interface SearchBarProps {
  placeholder?: string;
  className?: string;
  variant?: "default" | "minimal" | "expanded";
  autoFocus?: boolean;
  initialQuery?: string;
}

export function SearchBar({
  placeholder = "Buscar productos...",
  className = "",
  variant = "default",
  autoFocus = false,
  initialQuery = "",
}: SearchBarProps) {
  const {
    query,
    setQuery,
    suggestions,
    isLoading,
    showSuggestions,
    setShowSuggestions,
    search,
  } = useSearch();

  const [selectedIndex, setSelectedIndex] = useState(-1);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (initialQuery) setQuery(initialQuery);
  }, [initialQuery, setQuery]);

  const performSearch = (searchQuery: string) => {
    router.push(`/Search?q=${encodeURIComponent(searchQuery)}`);
    setShowSuggestions(false);
    inputRef.current?.blur();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    setSelectedIndex(-1);
    setShowSuggestions(true);
    search(value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) performSearch(query.trim());
  };

  const handleSuggestionClick = (suggestion: SearchSuggestion) => {
    setQuery(suggestion.name);
    setShowSuggestions(false);
    performSearch(suggestion.name);
  };

  const handleKeyDown = (e: React.KeyboardEvent) =>
    handleKeyNavigation({
      e,
      suggestions,
      selectedIndex,
      setSelectedIndex,
      query,
      performSearch,
      handleSuggestionClick,
      setShowSuggestions,
    });

  const handleBlur = () =>
    handleBlurWithDelay(() => {
      setShowSuggestions(false);
      setSelectedIndex(-1);
    });

  return (
    <div className={`relative w-full max-w-md flex ${className}`}>
      <form
        onSubmit={handleSubmit}
        className={`relative flex items-center ${getContainerStyles(variant)}`}
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
          className={`w-full focus:outline-none ${getVariantStyles(variant)}`}
        />

        <button
          type="submit"
          className={`flex-shrink-0 ${
            variant === "minimal"
              ? "text-gray-500 hover:text-gray-700 px-2"
              : "bg-gray-100 text-gray-500 rounded-r-lg px-3.5 py-2 h-full hover:bg-gray-200 cursor-pointer"
          }`}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>
      </form>

      {showSuggestions && query.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
          {isLoading ? (
            <div className="p-3 text-center text-gray-500">
              <div className="animate-spin h-5 w-5 border-b-1 border-blue-500 mx-auto rounded-full"></div>
              <p className="mt-1 text-sm">Buscando...</p>
            </div>
          ) : suggestions.length > 0 ? (
            <ul>
              {suggestions.map((suggestion, index) => (
                <li
                  key={suggestion.id}
                  className={`p-3 cursor-pointer border-b border-gray-200 last:border-b-0 hover:bg-gray-50 ${
                    index === selectedIndex ? "bg-blue-50" : ""
                  }`}
                  onMouseDown={() => handleSuggestionClick(suggestion)}
                >
                  <p className="font-medium text-sm text-gray-900">{suggestion.name}</p>
                </li>
              ))}
            </ul>
          ) : (
            <div className="p-3 text-center text-gray-500">
              <p className="text-sm">No se encontraron sugerencias</p>
              <button
                onMouseDown={() => performSearch(query)}
                className="text-blue-600 hover:text-blue-800 text-xs mt-1"
              >
                Buscar "{query}"
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
