import { apiClient } from './client';
import type { ContactFormData } from '../types/forms';

type ContactResponse = {
  success: boolean;
  message: string;
};

export const submitContactForm = (
  data: ContactFormData,
) => {
  return apiClient<ContactResponse>('/contact', {
    method: 'POST',
    body: data,
  });
};