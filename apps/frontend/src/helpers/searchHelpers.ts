import { SearchSuggestion } from "@/types/search";

interface KeyNavParams {
  e: React.KeyboardEvent;
  suggestions: SearchSuggestion[];
  selectedIndex: number;
  setSelectedIndex: React.Dispatch<React.SetStateAction<number>>;
  query: string;
  performSearch: (q: string) => void;
  handleSuggestionClick: (s: SearchSuggestion) => void;
  setShowSuggestions: (v: boolean) => void;
}

export function handleKeyNavigation({
  e,
  suggestions,
  selectedIndex,
  setSelectedIndex,
  query,
  performSearch,
  handleSuggestionClick,
  setShowSuggestions,
}: KeyNavParams) {
  if (suggestions.length === 0) return;

  switch (e.key) {
    case "ArrowDown":
      e.preventDefault();
      setSelectedIndex((prev) => (prev < suggestions.length - 1 ? prev + 1 : prev));
      break;
    case "ArrowUp":
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
      break;
    case "Enter":
      e.preventDefault();
      if (selectedIndex >= 0) {
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
}

export function handleBlurWithDelay(callback: () => void) {
  setTimeout(callback, 200);
}
