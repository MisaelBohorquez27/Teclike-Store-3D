import { ProductReviewsProps } from "@/types/review";

export function ProductReviews({ reviews }: ProductReviewsProps) {
  // Función para formatear la fecha
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="bg-gray-900/50 backdrop-blur-md border border-gray-800/50 rounded-2xl p-6 md:p-8">
      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-white">Reseñas de Clientes</h2>
      
      {/* Estadísticas de reseñas */}
      {reviews.length > 0 && (
        <div className="mb-8 p-6 bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700/50 rounded-xl">
          <div className="flex items-center gap-6">
            <div>
              <div className="text-4xl md:text-5xl font-bold text-cyan-400">
                {(reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length).toFixed(1)}
              </div>
              <p className="text-xs text-gray-400 mt-1">de 5 estrellas</p>
            </div>
            <div className="flex-1">
              <div className="flex text-yellow-400 text-xl mb-2">
                {[...Array(5)].map((_, i) => (
                  <span key={i}>
                    {i < Math.round(reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length) 
                      ? '★' 
                      : '☆'
                    }
                  </span>
                ))}
              </div>
              <p className="text-sm text-gray-300">
                Basado en {reviews.length} {reviews.length === 1 ? 'reseña' : 'reseñas'}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Lista de reseñas */}
      {reviews.length > 0 ? (
        <div className="space-y-6">
          {reviews.map((review) => (
            <div key={review.id} className="border-b border-gray-700/50 pb-6 last:border-b-0">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-sm">
                      {(review.user || "U").charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <span className="font-semibold text-gray-100">{review.user}</span>
                    <div className="flex text-yellow-400 text-sm mt-1">
                      {[...Array(5)].map((_, i) => (
                        <span key={i}>
                          {i < review.rating ? '★' : '☆'}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <span className="text-xs text-gray-400">{formatDate(review.date)}</span>
              </div>
              
              <p className="text-gray-300 mt-3 leading-relaxed">"{review.comment}"</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-gray-800/30 border border-gray-700/50 rounded-xl">
          <p className="text-gray-300 text-lg font-medium">No hay reseñas aún</p>
          <p className="text-sm text-gray-400 mt-2">
            Sé el primero en compartir tu experiencia con este producto
          </p>
        </div>
      )}

      {/* Botón para agregar reseña (opcional) */}
      {reviews.length > 0 && (
        <div className="mt-8 text-center">
          <button className="px-6 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105">
            Escribir una reseña
          </button>
        </div>
      )}
    </div>
  );
}