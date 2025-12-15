import { Rating } from "@/components/Rating";
import { Review } from "@/types/review";
import { Quote } from "lucide-react";

export function ReviewCard({ review }: { review: Review }) {
  return (
    <div className="p-4 sm:p-6 h-full text-center group relative flex flex-col justify-between hover:shadow-lg transition-shadow duration-300 rounded-lg ">
      <div className="border-l-2 border-gray-300 pl-6 sm:pl-12 h-full pr-4 sm:pr-6">
        <h3 className="text-xl sm:text-2xl md:text-3xl font-stretch-extra-expanded font-semibold mb-4 sm:mb-6 text-cyan-500">
          {review.product.toUpperCase()}
        </h3>
        <blockquote className="mb-4 italic text-base sm:text-lg md:text-xl">
          "{review.comment}"
        </blockquote>
        <Rating value={review.rating} className="justify-center mb-6" />
        <div className="flex flex-col items-center gap-2">
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
