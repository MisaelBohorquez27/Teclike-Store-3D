// components/ui/ReviewCard.tsx

export type Review = {
  id: number;
  name: string;
  product: string;
  comment: string;
  rating: number;
  avatar: string;
};

export function ReviewCard({ review }: { review: Review }) {
  return (
    <div className="p-4 sm:p-6 h-full text-center">
      <div className="border-l-2 border-gray-300 pl-6 sm:pl-12 h-full pr-4 sm:pr-6">
        <h3 className="TitleColor text-xl sm:text-2xl font-stretch-extra-expanded font-semibold mb-4 sm:mb-6">
          {review.product.toUpperCase()}
        </h3>
        <blockquote className="SubtitleColor mb-4 italic text-base sm:text-lg">
          "{review.comment}"
        </blockquote>
        <div className="mb-4 mx-auto">
          {[...Array(5)].map((_, i) => (
            <span
              key={i}
              className={`text-lg sm:text-xl ${
                i < review.rating ? "text-green-600" : "text-gray-300"
              }`}
            >
              ★
            </span>
          ))}
        </div>
        <div>
          <img
            src={review.avatar}
            alt={review.name}
            className="w-8 h-8 sm:w-10 sm:h-10 rounded-full mx-auto"
            loading="lazy"
          />
          <span className="font-medium text-gray-800 mx-auto text-sm sm:text-base">
            {review.name}
          </span>
        </div>
      </div>
    </div>
  );
}
