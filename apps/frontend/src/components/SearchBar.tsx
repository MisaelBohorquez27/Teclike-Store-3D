"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useSearch } from "@/hooks/useSearch";
import { SearchSuggestion } from "@/types/search";
import { FiSearch, FiX, FiClock, FiTrendingUp } from "react-icons/fi";

interface SearchBarProps {
  placeholder?: string;
  className?: string;
  variant?: "default" | "minimal" | "expanded";
  autoFocus?: boolean;
  initialQuery?: string;
  onSearch?: () => void; // Para cerrar en mobile
}

export function SearchBar({
  placeholder = "Buscar productos 3D...",
  className = "w-full",
  variant = "default",
  autoFocus = false,
  initialQuery = "",
  onSearch,
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
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [isFocused, setIsFocused] = useState(false);
  
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const blurTimeoutRef = useRef<number | null>(null);

  // Cargar búsquedas recientes del localStorage
  useEffect(() => {
    const saved = localStorage.getItem('recent-searches');
    if (saved) {
      setRecentSearches(JSON.parse(saved).slice(0, 5));
    }
  }, []);

  // Guardar búsqueda en recientes
  const saveToRecentSearches = (searchQuery: string) => {
    if (!searchQuery.trim()) return;
    
    const updated = [searchQuery, ...recentSearches.filter(s => s !== searchQuery)].slice(0, 5);
    setRecentSearches(updated);
    localStorage.setItem('recent-searches', JSON.stringify(updated));
  };

  useEffect(() => {
    if (initialQuery) setQuery(initialQuery);
  }, [initialQuery, setQuery]);

  const performSearch = (searchQuery: string) => {
    const trimmedQuery = searchQuery.trim();
    if (!trimmedQuery) return;

    saveToRecentSearches(trimmedQuery);
    router.push(`/Search?q=${encodeURIComponent(trimmedQuery)}`);
    setShowSuggestions(false);
    setIsFocused(false);
    inputRef.current?.blur();
    onSearch?.(); // Cerrar en mobile si existe
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    setSelectedIndex(-1);
    
    if (value.length > 0) {
      setShowSuggestions(true);
      search(value);
    } else {
      setShowSuggestions(true); // Mostrar recientes cuando está vacío
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) performSearch(query.trim());
  };

  const handleSuggestionClick = (suggestion: SearchSuggestion | string) => {
    const searchTerm = typeof suggestion === 'string' ? suggestion : suggestion.name;
    setQuery(searchTerm);
    setShowSuggestions(false);
    performSearch(searchTerm);
  };

  const clearSearch = () => {
    setQuery("");
    setShowSuggestions(true);
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    const allSuggestions = [
      ...recentSearches.map(term => ({ id: `recent-${term}`, name: term, type: 'recent' as const })),
      ...suggestions
    ];

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < allSuggestions.length - 1 ? prev + 1 : prev
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setSelectedIndex(prev => prev > -1 ? prev - 1 : -1);
        break;
      case "Enter":
        e.preventDefault();
        if (selectedIndex >= 0 && allSuggestions[selectedIndex]) {
          const item = allSuggestions[selectedIndex];
          const searchTerm = typeof item === 'string' ? item : item.name;
          handleSuggestionClick(searchTerm);
        } else if (query.trim()) {
          performSearch(query.trim());
        }
        break;
      case "Escape":
        setShowSuggestions(false);
        setSelectedIndex(-1);
        inputRef.current?.blur();
        break;
    }
  };

  const handleFocus = () => {
    if (blurTimeoutRef.current) {
      window.clearTimeout(blurTimeoutRef.current);
      blurTimeoutRef.current = null;
    }
    setIsFocused(true);
    setShowSuggestions(true);
  };

  const handleBlur = () => {
    blurTimeoutRef.current = window.setTimeout(() => {
      setIsFocused(false);
      setShowSuggestions(false);
      setSelectedIndex(-1);
      blurTimeoutRef.current = null;
    }, 150);
  };

  // Estilos dinámicos basados en variant y theme
  const getContainerStyles = () => {
    const base = "relative flex items-center transition-all duration-300";
    
    switch (variant) {
      case "minimal":
        return `${base} bg-transparent`;
      case "expanded":
        return `${base} bg-neutral-3 dark:bg-neutral-4 rounded-xl border-2 border-transparent focus-within:border-primary dark:focus-within:border-primary-hover`;
      default:
        return `${base} bg-neutral-3 dark:bg-neutral-4 rounded-lg border border-gray-300 dark:border-gray-400 focus-within:ring-1 focus-within:ring-gray-400 focus-within:border-transparent`;
    }
  };

  const getInputStyles = () => {
    const base = "w-full bg-transparent focus:outline-none text-neutral truncate";
    
    switch (variant) {
      case "minimal":
        return `${base} px-2 py-1 text-sm`;
      case "expanded":
        return `${base} px-4 py-3 text-lg`;
      default:
        return `${base} px-6 py-2`;
    }
  };

  const getButtonStyles = () => {
    const base = "flex-shrink-0 transition-colors duration-200";
    
    switch (variant) {
      case "minimal":
        return `${base} text-neutral-2 dark:text-neutral-3 hover:text-primary dark:hover:text-primary-hover p-1`;
      case "expanded":
        return `${base} text-neutral-5 rounded-r-lg p-3`;
      default:
        return `${base}  text-neutral-5 rounded-r-lg px-3 py-2`;
    }
  };

  const showRecentSearches = showSuggestions && query.length === 0 && recentSearches.length > 0;
  const showSearchResults = showSuggestions && query.length > 0;

  return (
    <div className={`relative w-full ${className}`}>
      <form
        onSubmit={handleSubmit}
        className={getContainerStyles()}
      >
        <div className="relative flex items-center w-full">          
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholder={placeholder}
            autoFocus={autoFocus}
            className={getInputStyles()}
            style={{ paddingLeft: variant === 'minimal' ? '20px' : '30px' }}
          />

          {query.length > 0 && (
            <button
              type="button"
              onClick={clearSearch}
              className="absolute right-9 text-neutral-1 hover:text-neutral p-1 transition-colors"
            >
              <FiX size={variant === 'expanded' ? 20 : 16} />
            </button>
          )}

          <button
            type="submit"
            className={getButtonStyles()}
            aria-label="Buscar"
          >
            <FiSearch 
            className="text-neutral-1 transition-colors"
            size={variant === 'expanded' ? 20 : 16} />
          </button>
        </div>
      </form>

      {/* Panel de sugerencias */}
      {(showRecentSearches || showSearchResults) && isFocused && (
        <div className="absolute top-full left-0 right-0 mt-2 card-bg dark:bg-neutral-4 border border-neutral-3 dark:border-neutral-4 rounded-xl shadow-2xl z-50 max-h-80 overflow-y-auto animate-in fade-in slide-in-from-top-2 duration-200">
          
          {/* Búsquedas recientes */}
          {showRecentSearches && (
            <div className="p-3 border-b border-neutral-3 dark:border-neutral-4">
              <div className="flex items-center text-sm font-medium text-neutral-2 dark:text-neutral-3 mb-2">
                <FiClock className="mr-2" size={16} />
                Búsquedas recientes
              </div>
              <ul>
                {recentSearches.map((term, index) => (
                  <li key={term}>
                    <button
                      onMouseDown={() => handleSuggestionClick(term)} // aqui abajo se pone el hover para seleccionar
                      className={`w-full text-left p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors text-sm ${
                        index === selectedIndex ? 'bg-neutral-3 dark:bg-neutral-3' : ''
                      }`}
                    >
                      {term}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Resultados de búsqueda */}
          {showSearchResults && (
            <div className="p-3">
              {isLoading ? (
                <div className="flex items-center justify-center py-4">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
                  <span className="ml-2 text-sm text-neutral">
                    Buscando...
                  </span>
                </div>
              ) : suggestions.length > 0 ? (
                <>
                  <div className="flex items-center text-sm font-medium text-neutral mb-2">
                    <FiTrendingUp className="mr-2" size={16} />
                    Sugerencias
                  </div>
                  <ul>
                    {suggestions.map((suggestion, index) => (
                      <li key={suggestion.id}>
                        <button
                          onMouseDown={() => handleSuggestionClick(suggestion)} // aqui abajo se pone el hover 
                          className={`w-full text-left p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-neutral-3 transition-colors text-sm ${
                            index === selectedIndex ? 'bg-neutral-3 dark:bg-neutral-3' : ''
                          }`}
                        >
                          {suggestion.name}
                        </button>
                      </li>
                    ))}
                  </ul>
                </>
              ) : (
                <div className="text-center py-4">
                  <p className="text-sm text-neutral-2 dark:text-neutral-3 mb-2">
                    No se encontraron resultados
                  </p>
                  <button
                    onMouseDown={() => performSearch(query)}
                    className="text-primary hover:text-primary-hover text-sm font-medium"
                  >
                    Buscar "{query}"
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}