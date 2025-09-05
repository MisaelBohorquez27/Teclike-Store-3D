"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSearch } from "@/hooks/search.hook";
import { SearchInput } from "./SearchInput";
import { SearchSuggestions } from "./SearchSuggestion";

interface SearchBarProps {
  darkMode?: boolean;
  placeholder?: string;
  className?: string;
}

export function SearchBar2({
  darkMode = false,
  placeholder = "Buscar productos...",
  className = "",
}: SearchBarProps) {
  const router = useRouter();
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

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    router.push(`/search?q=${encodeURIComponent(query)}`);
    setShowSuggestions(false);
  };

  const handleSuggestionClick = (s: any) => {
    router.push(`/products/${s.slug}`);
    setQuery("");
    setShowSuggestions(false);
  };

  return (
    <div className={`relative ${className}`}>
      <form onSubmit={handleSearchSubmit}>
        <SearchInput
          query={query}
          setQuery={setQuery}
          placeholder={placeholder}
          darkMode={darkMode}
          onFocus={() => setShowSuggestions(true)}
          onChange={(value) => {
            setQuery(value);
            search(value);
          }}
          onKeyDown={() => {}}
        />
      </form>

      {showSuggestions && (
        <SearchSuggestions
          suggestions={suggestions}
          query={query}
          isLoading={isLoading}
          selectedIndex={selectedIndex}
          onSelect={handleSuggestionClick}
          onHover={setSelectedIndex}
          darkMode={darkMode}
        />
      )}
    </div>
  );
}
