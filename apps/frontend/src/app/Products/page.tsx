import { FilterSidebar } from "@/components/FilterSidebar";
import { Navbar } from "@/components/Navbar";
import { ProductGrid } from "@/components/ProductGrid";

export default function ProductPage() {
  return (
    <>
      {/* Navbar */}
      <Navbar />

      <main className="bg-gray-50 min-h-screen">
        {/* Hero Banner */}
        <section className="bg-gradient-to-r from-blue-600 to-indigo-700 py-20 text-white">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold mb-4">Nuestra Colección</h1>
            <p className="text-xl opacity-90">
              Encuentra los mejores productos 3D para tus proyectos
            </p>
          </div>
        </section>

        {/* Contenido Principal */}
        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-col md:flex-row gap-8">

            {/* Sidebar de Filtros */}
            <div className="md:w-1/4">
              <FilterSidebar />
            </div>

            {/* Grid de Productos */}
            <div className="md:w-3/4">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-semibold">Todos los Productos</h2>
                <div className="flex items-center">
                  <span className="mr-2">Ordenar por:</span>
                  <select className="border rounded-md px-3 py-1">
                    <option>Más recientes</option>
                    <option>Precio (menor a mayor)</option>
                    <option>Precio (mayor a menor)</option>
                    <option>Mejor valorados</option>
                  </select>
                </div>
              </div>

              <ProductGrid />

              {/* Paginación */}
              <div className="flex justify-center mt-12">
                <nav className="flex items-center space-x-2">
                  <button className="px-3 py-1 rounded border">
                    ← Anterior
                  </button>
                  <button className="px-3 py-1 rounded bg-blue-600 text-white">
                    1
                  </button>
                  <button className="px-3 py-1 rounded border">2</button>
                  <button className="px-3 py-1 rounded border">3</button>
                  <span className="px-2">...</span>
                  <button className="px-3 py-1 rounded border">10</button>
                  <button className="px-3 py-1 rounded border">
                    Siguiente →
                  </button>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
