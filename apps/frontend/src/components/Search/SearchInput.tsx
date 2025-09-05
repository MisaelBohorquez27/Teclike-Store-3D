import { useRef } from "react";

interface SearchInputProps {
  query: string;
  setQuery: (value: string) => void;
  onFocus: () => void;
  onChange: (value: string) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  placeholder: string;
  darkMode: boolean;
}

export function SearchInput({
  query,
  setQuery,
  onFocus,
  onChange,
  onKeyDown,
  placeholder,
  darkMode,
}: SearchInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="relative w-full">
      <input
        ref={inputRef}
        type="text"
        value={query}
        onFocus={onFocus}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={onKeyDown}
        placeholder={placeholder}
        className={`w-full border rounded-lg py-2 px-4 pl-10 pr-10 focus:outline-none focus:ring-2 transition-all
          ${darkMode
            ? "bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:ring-blue-500"
            : "bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-blue-500"
          }`}
      />

      {query && (
        <button
          type="button"
          onClick={() => {
            setQuery("");
            inputRef.current?.focus();
          }}
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700"
        >
          ✖
        </button>
      )}
    </div>
  );
}
