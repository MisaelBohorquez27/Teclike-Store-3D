"use client";

export function SearchBar() {
  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Buscar productos..."
        className="border border-gray-300 rounded-md py-2 px-4 w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <span className="absolute right-3 top-2.5 text-gray-400">🔍</span>
    </div>
  );
}
