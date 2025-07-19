type Product = {
  id: number;
  title: string;
  tagline?: string;
  description?: string;
  features?: string[];
  stats?: string[];
  times?: string[];
  fullDescription: string;
  priceRange: { min: number; max: number };
  currency: string;
};

export function ProductCard({ product }: { product: Product }) {
  return (
    <div className="bg-gray-50 rounded-xl p-8 flex flex-col md:flex-row gap-8">
      {/* Columna izquierda */}
      <div className="md:w-1/2">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">{product.title}</h3>
        {product.tagline && (
          <p className="text-gray-600 italic mb-4">{product.tagline}</p>
        )}
        {product.description && (
          <p className="text-gray-700 mb-6">{product.description}</p>
        )}

        {product.features && (
          <ul className="space-y-2 mb-6">
            {product.features.map((feature, index) => (
              <li key={index} className="flex items-center">
                <span className="mr-2">•</span>
                <span className="text-gray-700">{feature}</span>
              </li>
            ))}
          </ul>
        )}

        {product.stats && product.times && (
          <div className="grid grid-cols-4 gap-2 mb-6">
            {product.stats.map((stat, index) => (
              <div key={index} className="bg-white p-2 rounded text-center">
                <span className="font-bold">{stat}</span>
              </div>
            ))}
            {product.times.map((time, index) => (
              <div key={index} className="col-span-2 text-sm text-gray-500">
                {time}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Columna derecha */}
      <div className="md:w-1/2">
        <p className="text-gray-600 mb-6">{product.fullDescription}</p>
        <div className="text-2xl font-bold text-gray-900 mb-6">
          {product.currency} {product.priceRange.min} - {product.currency} {product.priceRange.max}
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium w-full">
          Añadir al carrito
        </button>
      </div>
    </div>
  );
}