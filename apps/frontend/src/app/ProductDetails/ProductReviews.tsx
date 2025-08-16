export function ProductReviews({ reviews }: { reviews: any[] }) {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Reseñas</h2>
      {reviews.length > 0 ? (
        reviews.map(review => (
          <div key={review.id} className="border-b pb-4 mb-4">
            <div className="flex items-center">
              <span className="font-medium">{review.user}</span>
              <span className="ml-4 text-yellow-500">
                {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
              </span>
            </div>
            <p className="mt-1 italic">"{review.comment}"</p>
            <p className="text-sm text-gray-500">{review.date}</p>
          </div>
        ))
      ) : (
        <p>No hay reseñas aún</p>
      )}
    </div>
  );
}