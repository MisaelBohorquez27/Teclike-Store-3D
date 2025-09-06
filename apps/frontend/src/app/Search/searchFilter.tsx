"use client";

export function SearchFilters() {
  return (
    <div>
      <h2 className="font-semibold mb-2">Categorías</h2>
      <ul className="space-y-1">
        <li><input type="checkbox" /> Electrónica</li>
        <li><input type="checkbox" /> Hogar</li>
        <li><input type="checkbox" /> Juguetes</li>
      </ul>

      <h2 className="font-semibold mt-4 mb-2">Disponibilidad</h2>
      <ul className="space-y-1">
        <li><input type="checkbox" /> En stock</li>
        <li><input type="checkbox" /> Agotado</li>
      </ul>
    </div>
  );
}
