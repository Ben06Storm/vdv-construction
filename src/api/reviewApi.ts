import { apiClient } from './client';

import type { ReviewFormData } from '../types/forms';

export const submitReview = (
  data: ReviewFormData,
) => {
  return apiClient('/reviews', {
    method: 'POST',
    body: data,
  });
};