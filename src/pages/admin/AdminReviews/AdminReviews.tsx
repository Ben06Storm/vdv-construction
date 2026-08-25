import { useEffect, useState } from 'react';

import {
  getAdminReviews,
  updateReviewStatus,
} from '../../../services/adminApi';

import type {
  Review,
  ReviewStatus,
} from '../../../types/review';

import './AdminReviews.scss';

const AdminReviews = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [updatingId, setUpdatingId] = useState<number | null>(null);

  useEffect(() => {
    const loadReviews = async () => {
      try {
        const data = await getAdminReviews();

        console.log('ADMIN REVIEWS:', data);

        setReviews(data);
      } catch (error) {
        console.error('ADMIN REVIEWS ERROR:', error);

        setError(
          error instanceof Error
            ? error.message
            : 'Failed to load reviews.',
        );
      } finally {
        setLoading(false);
      }
    };

    loadReviews();
  }, []);

  const handleStatusChange = async (
    id: number,
    status: ReviewStatus,
  ) => {
    try {
      setUpdatingId(id);
      setError('');

      const updatedReview = await updateReviewStatus(
        id,
        status,
      );

      setReviews((currentReviews) =>
        currentReviews.map((review) =>
          review.id === updatedReview.id
            ? updatedReview
            : review,
        ),
      );
    } catch (error) {
      console.error(
        'UPDATE REVIEW STATUS ERROR:',
        error,
      );

      setError(
        error instanceof Error
          ? error.message
          : 'Failed to update review status.',
      );
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <main className="admin-reviews">
      <div className="admin-reviews__container">
        <h1 className="admin-reviews__title">
          Reviews Admin
        </h1>
        {loading && (
          <p className="admin-reviews__message">
            Loading reviews...
          </p>
        )}
        {error && (
          <p className="admin-reviews__error">
            {error}
          </p>
        )}
        {!loading && !error && (
          reviews.length === 0 ? (
            <p className="admin-reviews__message">
              No reviews found.
            </p>
          ) : (
            <div className="admin-reviews__list">
              {reviews.map((review) => {
                const isUpdating =
                  updatingId === review.id;
                return (
                  <article
                    className="admin-review-card"
                    key={review.id}
                  >
                    <h2 className="admin-review-card__name">
                      {review.name}
                    </h2>
                    <p className="admin-review-card__city">
                      {review.city}
                    </p>
                    <p className="admin-review-card__rating">
                      Rating: {review.rating}/5
                    </p>
                    <p className="admin-review-card__text">
                      {review.review}
                    </p>
                    <strong className={`admin-review-card__status admin-review-card__status--${review.status.toLowerCase()}`}>
                      Status: {review.status}
                    </strong>
                      {review.status === 'PENDING' && (
                        <div className="admin-review-card__actions">
                          <button
                            className="admin-review-card__button admin-review-card__button--approve"
                            type="button"
                            onClick={() =>
                              handleStatusChange(
                                review.id,
                                'APPROVED',
                              )
                            }
                            disabled={isUpdating}
                          >
                            {isUpdating
                              ? 'Updating...'
                              : 'Approve'}
                          </button>
                          <button
                            className="admin-review-card__button admin-review-card__button--reject"
                            type="button"
                            onClick={() =>
                              handleStatusChange(
                                review.id,
                                'REJECTED',
                              )
                            }
                            disabled={isUpdating}
                          >
                            {isUpdating
                              ? 'Updating...'
                              : 'Reject'}
                          </button>
                        </div>
                      )}
                  </article>
                );
              })}
            </div>
          )
        )}
      </div>
    </main>
  );
};

export default AdminReviews;