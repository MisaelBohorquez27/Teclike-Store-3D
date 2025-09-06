"use client";

import { useState, useEffect } from "react";
import { SearchInput } from "./SearchInput";
import { fetchSearchSuggestions, SearchSuggestion } from "@/services/searchSuggestions";

interface SearchBarProps {
  query: string;
  setQuery: (val: string) => void;
  darkMode?: boolean;
}

export function SearchBar2({ query, setQuery, darkMode = false }: SearchBarProps) {
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    if (query.length < 2) {
      setSuggestions([]);
      return;
    }
    const timeout = setTimeout(async () => {
      try {
        const res = await fetchSearchSuggestions(query);
        setSuggestions(res);
        setShowSuggestions(true);
      } catch (err) {
        console.error("Error al obtener sugerencias", err);
      }
    }, 300);

    return () => clearTimeout(timeout);
  }, [query]);

  return (
    <div className="relative w-full max-w-md">
      <SearchInput
        query={query}
        setQuery={setQuery}
        onFocus={() => setShowSuggestions(true)}
        onChange={setQuery}
        onKeyDown={(e) => e.key === "Escape" && setShowSuggestions(false)}
        placeholder="Buscar productos..."
        darkMode={darkMode}
      />

      {showSuggestions && suggestions.length > 0 && (
        <ul className="absolute w-full bg-white shadow-lg rounded-lg mt-1 z-50">
          {suggestions.map((s) => (
            <li
              key={s.id}
              onClick={() => {
                setQuery(s.name);
                setShowSuggestions(false);
              }}
              className="px-4 py-2 cursor-pointer hover:bg-gray-100"
            >
              {s.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
