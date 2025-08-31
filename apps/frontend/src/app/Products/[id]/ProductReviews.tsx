interface Review {
  id: number;
  user: string;
  rating: number;
  comment: string;
  date: string;
}

interface ProductReviewsProps {
  reviews: Review[];
}

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
    <div>
      <h2 className="text-2xl font-bold mb-6">Reseñas de Clientes</h2>
      
      {/* Estadísticas de reseñas */}
      {reviews.length > 0 && (
        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center gap-4">
            <div className="text-3xl font-bold text-gray-900">
              {reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length}
            </div>
            <div>
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <span key={i}>
                    {i < Math.round(reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length) 
                      ? '★' 
                      : '☆'
                    }
                  </span>
                ))}
              </div>
              <p className="text-sm text-gray-600">
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
            <div key={review.id} className="border-b border-gray-200 pb-6 last:border-b-0">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-medium text-sm">
                      {review.user.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-900">{review.user}</span>
                    <div className="flex text-yellow-400 mt-1">
                      {[...Array(5)].map((_, i) => (
                        <span
                          key={i}
                          className={i < review.rating ? "text-yellow-400" : "text-gray-300"}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <span className="text-sm text-gray-500">{formatDate(review.date)}</span>
              </div>
              
              <p className="text-gray-700 mt-3 leading-relaxed">"{review.comment}"</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 bg-gray-50 rounded-lg">
          <p className="text-gray-500 text-lg">No hay reseñas aún</p>
          <p className="text-sm text-gray-400 mt-2">
            Sé el primero en compartir tu experiencia con este producto
          </p>
        </div>
      )}

      {/* Botón para agregar reseña (opcional) */}
      {reviews.length > 0 && (
        <div className="mt-8 text-center">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md transition-colors">
            Escribir una reseña
          </button>
        </div>
      )}
    </div>
  );
}