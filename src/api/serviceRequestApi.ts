import { apiClient } from './client';
import type { ServiceRequestPayload } from '../types/forms';

type ContactResponse = {
  success: boolean;
  message: string;
};

export const submitServiceRequest = (
  data: ServiceRequestPayload,
) => {
  return apiClient<ContactResponse>('/contact', {
    method: 'POST',
    body: {
      name: data.name,
      phone: data.phone,
      email: data.email,
      message: data.message,
      project: data.service,
      service: data.service,
    },
  });
};