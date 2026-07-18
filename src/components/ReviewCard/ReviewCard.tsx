import { useState } from 'react';
import { Star } from 'lucide-react';

import './ReviewCard.scss';

type ReviewCardProps = {
  name: string;
  city: string;
  rating: number;
  review: string;
};

const REVIEW_LIMIT = 150;

const ReviewCard = ({
  name,
  city,
  rating,
  review,
}: ReviewCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const isLongReview = review.length > REVIEW_LIMIT;

  const visibleReview =
    isExpanded || !isLongReview
      ? review
      : `${review.slice(0, REVIEW_LIMIT)}...`;

  const stars = Array.from(
    { length: 5 },
    (_, index) => (
      <Star
        key={index}
        className={`review-card__star ${
          index < rating
            ? 'review-card__star--active'
            : ''
        }`}
        aria-hidden="true"
      />
    ),
  );

  return (
    <article className="review-card">
      <div
        className="review-card__stars"
        aria-label={`Rating: ${rating} out of 5`}
      >
        {stars}
      </div>
      <div className="review-card__content">
        <p className="review-card__review">
          {visibleReview}
        </p>
        {isLongReview && (
          <button
            type="button"
            className="review-card__toggle"
            onClick={() =>
              setIsExpanded(prev => !prev)
            }
          >
            {isExpanded
              ? 'Show less'
              : 'Read more'}
          </button>
        )}
        <h3 className="review-card__name">
          {name}
        </h3>
        <p className="review-card__city">
          {city}
        </p>
      </div>
    </article>
  );
};

export default ReviewCard;