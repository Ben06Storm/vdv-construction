import { Star } from 'lucide-react';

import './RatingStars.scss';

interface RatingStarsProps {
  rating: number;
  max?: number;
  className?: string;
}

const RatingStars = ({
  rating,
  max = 5,
  className = '',
}: RatingStarsProps) => {
  return (
    <div
      className={`rating-stars ${className}`.trim()}
      role="img"
      aria-label={`Rating: ${rating} out of ${max}`}
    >
      {Array.from({ length: max }, (_, index) => (
        <Star
          key={index}
          className={
            index < rating
              ? 'rating-stars__star rating-stars__star--active'
              : 'rating-stars__star'
          }
          aria-hidden="true"
        />
      ))}
    </div>
  );
};

export default RatingStars;