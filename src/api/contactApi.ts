import { apiClient } from './client';

import type { ContactFormData } from '../types/forms';

export const submitContactForm = (
  data: ContactFormData,
) => {
  return apiClient('/contact', {
    method: 'POST',
    body: data,
  });
};