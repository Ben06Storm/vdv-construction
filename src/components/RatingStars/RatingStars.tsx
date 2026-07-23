import { Star } from 'lucide-react';

import './RatingStars.scss';

interface RatingStarsProps {
  rating: number;
  max?: number;
  className?: string;
  interactive?: boolean;
  onRatingChange?: (rating: number) => void;
}

const RatingStars = ({
  rating,
  max = 5,
  className = '',
  interactive = false,
  onRatingChange,
}: RatingStarsProps) => {
  return (
    <div
      className={`rating-stars ${className}`.trim()}
      role={interactive ? 'radiogroup' : 'img'}
      aria-label={
        interactive
          ? 'Rating'
          : `Rating: ${rating} out of ${max}`
      }
    >
      {Array.from(
        { length: max },
        (_, index) => {
          const starRating = index + 1;
          const isActive =
            starRating <= rating;
          if (interactive) {
            return (
              <button
                key={starRating}
                type="button"
                className={
                  isActive
                    ? 'rating-stars__star rating-stars__star--active'
                    : 'rating-stars__star'
                }
                onClick={() =>
                  onRatingChange?.(starRating)
                }
                role="radio"
                aria-checked={
                  starRating === rating
                }
                aria-label={`${starRating} stars`}
              >
                <Star
                  size={24}
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
              </button>
            );
          }
          return (
            <Star
              key={starRating}
              className={
                isActive
                  ? 'rating-stars__star rating-stars__star--active'
                  : 'rating-stars__star'
              }
              aria-hidden="true"
            />
          );
        },
      )}
    </div>
  );
};

export default RatingStars;