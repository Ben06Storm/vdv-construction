import { Star } from 'lucide-react';

import type { Rating } from '../../data/reviews';

import './ReviewCard.scss';

type ReviewCardProps = {
  name: string;
  city: string;
  rating: Rating;
  review: string;
  onReadMore: () => void;
};

const REVIEW_LIMIT = 100;

const ReviewCard = ({
  name,
  city,
  rating,
  review,
  onReadMore,
}: ReviewCardProps) => {
  const isLongReview =
    review.length > REVIEW_LIMIT;

  const visibleReview = isLongReview
    ? `${review.slice(0, REVIEW_LIMIT)}...`
    : review;

  const stars = Array.from(
    { length: 5 },
    (_, index) => (
      <Star
        key={index}
        className={`
          review-card__star
          ${index < rating
            ? 'review-card__star--active'
            : ''
          }
        `}
        aria-hidden="true"
      />
    ),
  );
  return (
    <article className="review-card">
      <div
        className="review-card__stars"
        role="img"
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
            onClick={onReadMore}
          >
            Read more
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