import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  deleteReview,
  getAdminReviews,
  updateReviewStatus,
} from '../../../services/adminApi';

import type {
  Review,
  ReviewStatus,
} from '../../../types/review';

import './AdminReviews.scss';

type ReviewFilter =
  | 'ALL'
  | 'PENDING'
  | 'APPROVED'
  | 'REJECTED';

const AdminReviews = () => {
  const navigate = useNavigate();

  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [updatingId, setUpdatingId] = useState<number | null>(null);
  const [filter, setFilter] = useState<ReviewFilter>('ALL');

  useEffect(() => {
    const loadReviews = async () => {
      try {
        const data = await getAdminReviews();
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

  const handleDelete = async (id: number) => {
    const isConfirmed = window.confirm(
      'Are you sure you want to delete this review?',
    );

    if (!isConfirmed) {
      return;
    }

    try {
      setUpdatingId(id);
      setError('');

      await deleteReview(id);

      setReviews((currentReviews) =>
        currentReviews.filter(
          (review) => review.id !== id,
        ),
      );
    } catch (error) {
      console.error('DELETE REVIEW ERROR:', error);

      setError(
        error instanceof Error
          ? error.message
          : 'Failed to delete review.',
      );
    } finally {
      setUpdatingId(null);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');

    navigate('/admin/login');
  };

  const pendingCount = reviews.filter(
    (review) => review.status === 'PENDING',
  ).length;

  const approvedCount = reviews.filter(
    (review) => review.status === 'APPROVED',
  ).length;

  const rejectedCount = reviews.filter(
    (review) => review.status === 'REJECTED',
  ).length;

  const filteredReviews =
    filter === 'ALL'
      ? reviews
      : reviews.filter(
        (review) => review.status === filter,
      );

  const totalReviews = reviews.length;
  const averageRating =
    reviews.length === 0
      ? 0
      : reviews.reduce(
        (sum, review) => sum + review.rating,
        0,
      ) / reviews.length;

  return (
    <main className="admin-reviews">
      <div className="admin-reviews__container">
        <div className="admin-reviews__header">
          <h1 className="admin-reviews__title">
            Reviews Admin
          </h1>
          <button
            className="admin-reviews__logout"
            type="button"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
        <div className="admin-reviews__stats">
          <article className="admin-stat-card">
            <span className="admin-stat-card__label">
              Total Reviews
            </span>
            <strong className="admin-stat-card__value">
              {totalReviews}
            </strong>
          </article>

          <article className="admin-stat-card">
            <span className="admin-stat-card__label">
              Pending
            </span>
            <strong className="admin-stat-card__value">
              {pendingCount}
            </strong>
          </article>

          <article className="admin-stat-card">
            <span className="admin-stat-card__label">
              Approved
            </span>
            <strong className="admin-stat-card__value">
              {approvedCount}
            </strong>
          </article>

          <article className="admin-stat-card">
            <span className="admin-stat-card__label">
              Average Rating
            </span>
            <strong className="admin-stat-card__value">
              {averageRating.toFixed(1)}
            </strong>
          </article>
        </div>
        <div className="admin-reviews__filters">
          <button
            className={
              filter === 'ALL'
                ? 'admin-reviews__filter admin-reviews__filter--active'
                : 'admin-reviews__filter'
            }
            type="button"
            onClick={() => setFilter('ALL')}
          >
            All ({reviews.length})
          </button>

          <button
            className={
              filter === 'PENDING'
                ? 'admin-reviews__filter admin-reviews__filter--active'
                : 'admin-reviews__filter'
            }
            type="button"
            onClick={() => setFilter('PENDING')}
          >
            Pending ({pendingCount})
          </button>

          <button
            className={
              filter === 'APPROVED'
                ? 'admin-reviews__filter admin-reviews__filter--active'
                : 'admin-reviews__filter'
            }
            type="button"
            onClick={() => setFilter('APPROVED')}
          >
            Approved ({approvedCount})
          </button>

          <button
            className={
              filter === 'REJECTED'
                ? 'admin-reviews__filter admin-reviews__filter--active'
                : 'admin-reviews__filter'
            }
            type="button"
            onClick={() => setFilter('REJECTED')}
          >
            Rejected ({rejectedCount})
          </button>
        </div>
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
          filteredReviews.length === 0 ? (
            <p className="admin-reviews__message">
              No reviews found.
            </p>
          ) : (
            <div className="admin-reviews__list">
              {filteredReviews.map((review) => {
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
                    <strong
                      className={`
                        admin-review-card__status 
                        admin-review-card__status--${review.status.toLowerCase()}`}>
                      Status: {review.status}
                    </strong>
                    <div className="admin-review-card__actions">
                      {review.status === 'PENDING' && (
                        <>
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
                        </>
                      )}
                      <button
                        className="admin-review-card__button admin-review-card__button--delete"
                        type="button"
                        onClick={() => handleDelete(review.id)}
                        disabled={isUpdating}
                      >
                        {isUpdating ? 'Deleting...' : 'Delete'}
                      </button>
                    </div>
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