import { SearchSuggestion } from "@/services/searchSuggestions";

interface SearchSuggestionsProps {
  suggestions: SearchSuggestion[];
  query: string;
  isLoading: boolean;
  selectedIndex: number;
  onSelect: (suggestion: SearchSuggestion) => void;
  onHover: (index: number) => void;
  darkMode: boolean;
}

export function SearchSuggestions({
  suggestions,
  query,
  isLoading,
  selectedIndex,
  onSelect,
  onHover,
  darkMode,
}: SearchSuggestionsProps) {
  if (isLoading) return <p className="p-2">Buscando...</p>;

  if (suggestions.length === 0 && query.length > 1) {
    return <p className="p-2">No se encontraron productos para "{query}"</p>;
  }

  return (
    <ul className="border rounded-lg shadow bg-white max-h-80 overflow-y-auto">
      {suggestions.map((s, index) => (
        <li
          key={s.id}
          className={`p-2 cursor-pointer ${index === selectedIndex ? "bg-gray-100" : ""}`}
          onMouseEnter={() => onHover(index)}
          onClick={() => onSelect(s)}
        >
          {s.name} - ${s.price.toFixed(2)}
        </li>
      ))}
    </ul>
  );
}
