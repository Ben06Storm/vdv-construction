import { apiClient } from './client';

import type {
  ServiceRequestPayload,
} from '../types/forms';

export const submitServiceRequest = async (
  data: ServiceRequestPayload,
) => {
  return apiClient('/service-requests', {
    method: 'POST',
    body: data,
  });
};