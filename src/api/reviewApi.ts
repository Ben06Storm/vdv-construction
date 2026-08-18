import { apiClient } from './client';

import type { 
  Review,
  ReviewFormData,
} from '../types/review';

export const submitReview = (
  data: ReviewFormData,
) => {
  return apiClient('/reviews', {
    method: 'POST',
    body: data,
  });
};

export const getReviews = () => {
  return apiClient<Review[]>('/reviews', {
    method: 'GET',
  });
};