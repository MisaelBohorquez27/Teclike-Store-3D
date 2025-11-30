import { Rating } from "@/components/Rating";
import { Review } from "@/types/review";

export function ReviewCard({ review }: { review: Review }) {
  return (
    <div className="p-4 sm:p-6 h-full text-center">
      <div className="border-l-2 border-gray-300 pl-6 sm:pl-12 h-full pr-4 sm:pr-6">
        <h3 className="text-xl sm:text-2xl font-stretch-extra-expanded font-semibold mb-4 sm:mb-6">
          {review.product.toUpperCase()}
        </h3>
        <blockquote className="mb-4 italic text-base sm:text-lg">
          "{review.comment}"
        </blockquote>
        <Rating value={review.rating} className="justify-center mb-6" />
        <div>
          <img
            src={review.avatar}
            alt={review.name}
            className="w-8 h-8 sm:w-10 sm:h-10 rounded-full mx-auto"
            loading="lazy"
          />
          <span className="font-medium mx-auto text-sm sm:text-base">
            {review.name}
          </span>
        </div>
      </div>
    </div>
  );
}
