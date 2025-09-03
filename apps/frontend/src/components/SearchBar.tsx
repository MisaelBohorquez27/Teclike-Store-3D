"use client";

export function SearchBar({ darkMode = false }: { darkMode?: boolean }) {
  return (
    <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md">
      <input
        type="text"
        placeholder="Buscar productos..."
        className={`border rounded-md py-2 px-4 w-full focus:outline-none focus:ring-1 bg-white placeholder-gray-400 text-gray-700
      ${
        darkMode
          ? "bg-[#182d50] border-[#3778d4] text-[#FAF9F6] placeholder-[#FAF9F6] placeholder-opacity-70 focus:ring-[#3778d4]"
          : "border-gray-300 focus:ring-blue-500"
      }
      text-sm sm:text-base
      pl-10 pr-4
    `}
      /> 
      <span
        className={`absolute right-4 top-1/2 transform -translate-y-1/2 ${
          darkMode ? "text-[#D4AF37]" : "text-gray-400"
        } text-lg sm:text-xl`}
      >
        🔍
      </span>
    </div>
  );
}
