"use client";

export function SearchBar({ darkMode = false }: { darkMode?: boolean }) {
  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Buscar productos..."
        className={`border rounded-md py-2 px-4 w-64 focus:outline-none focus:ring-1 ${
          darkMode
            ? "bg-[#182d50] border border-transparent text-[#FAF9F6] placeholder-[#FAF9F6] placeholder-opacity-70 focus:ring-[#3778d4]"
            : "border-gray-300 focus:ring-blue-500"
        }`}
      />
      <span
        className={`absolute right-3 top-2.5 ${
          darkMode ? "text-[#D4AF37]" : "text-gray-400"
        }`}
      >
        🔍
      </span>
    </div>
  );
}
