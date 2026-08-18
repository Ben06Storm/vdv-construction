import type { CreateReviewData } from '../types/review';

export const validateReview = (
  data: CreateReviewData,
): string | null => {
  if (
    typeof data.name !== 'string' ||
    !data.name.trim()
  ) {
    return 'Name is required.';
  }

  if (
    typeof data.city !== 'string' ||
    !data.city.trim()
  ) {
    return 'City is required.';
  }

  if (
    typeof data.rating !== 'number' ||
    !Number.isInteger(data.rating) ||
    data.rating < 1 ||
    data.rating > 5
  ) {
    return 'Rating must be between 1 and 5.';
  }

  if (
    typeof data.review !== 'string' ||
    !data.review.trim()
  ) {
    return 'Review is required.';
  }

  return null;
};