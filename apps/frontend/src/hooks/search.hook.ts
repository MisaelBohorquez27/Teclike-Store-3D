import { fetchSearchSuggestions } from "@/services/searchSuggestions";
import { useState, useCallback } from "react";
import { debounce } from "lodash";
import { SearchSuggestion } from "@/types/searchSuggestions";

export function useSearch() {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const search = useCallback(
    debounce(async (value: string) => {
      if (value.length < 2) {
        setSuggestions([]);
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      try {
        const results = await fetchSearchSuggestions(value);
        setSuggestions(results);
      } catch (error) {
        console.error(error);
        setSuggestions([]);
      } finally {
        setIsLoading(false);
      }
    }, 300),
    []
  );

  return {
    query,
    setQuery,
    suggestions,
    isLoading,
    showSuggestions,
    setShowSuggestions,
    search,
  };
}
