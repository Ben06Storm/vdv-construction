import type { CreateReviewData } from '../types/review';

export const createReview = (
  data: CreateReviewData,
) => {
  console.log('Saving review:', data);

  return data;
};