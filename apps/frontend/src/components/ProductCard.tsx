'use client';

type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
  rating: number;
  image: string;
  isNew?: boolean;
};

export function ProductCard({ product }: { product: Product }) {
  return (
    <div className="card-bg rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      {/* Imagen del Producto */}
      <div className="relative aspect-square">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover"
        />
        {product.isNew && (
          <span className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded">
            Nuevo
          </span>
        )}
      </div>
      
      {/* Detalles del Producto */}
      <div className="p-4">
        <div className="flex justify-between items-start">
          <h3 className="font-semibold text-lg">{product.name}</h3>
          <span className="text-sm text-gray-500">{product.category}</span>
        </div>
        
        <div className="mt-2 flex items-center">
          {[...Array(5)].map((_, i) => (
            <span 
              key={i} 
              className={`text-sm ${i < product.rating ? 'text-yellow-400' : 'text-gray-300'}`}
            >
              ★
            </span>
          ))}
          <span className="text-xs text-gray-500 ml-1">({product.rating})</span>
        </div>
        
        <div className="mt-4 flex justify-between items-center">
          <span className="font-bold text-gray-900">${product.price.toFixed(2)}</span>
          <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
            Ver detalles
          </button>
        </div>
      </div>
    </div>
  );
}