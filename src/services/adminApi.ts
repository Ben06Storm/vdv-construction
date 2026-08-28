import type {
  AdminLoginData,
  AdminLoginResponse,
} from '../types/admin';

import type {
  Review,
  ReviewStatus,
} from '../types/review';

import {
  handleAdminAuthExpired,
} from './adminAuth';

const API_URL = import.meta.env.VITE_API_URL;

type ApiRequestOptions = RequestInit & {
  requireAuth?: boolean;
};

const apiRequest = async <T>(
  endpoint: string,
  options: ApiRequestOptions = {},
): Promise<T> => {
  const {
    requireAuth = true,
    ...requestOptions
  } = options;

  const headers = new Headers(
    requestOptions.headers,
  );

  headers.set(
    'Content-Type',
    'application/json',
  );

  if (requireAuth) {
    const token =
      localStorage.getItem('adminToken');

    if (!token) {
      throw new Error(
        'Admin token is missing.',
      );
    }

    headers.set(
      'Authorization',
      `Bearer ${token}`,
    );
  }

  const response = await fetch(
    `${API_URL}${endpoint}`,
    {
      ...requestOptions,
      headers,
    },
  );

  const result = await response.json();

  if (response.status === 401) {
    handleAdminAuthExpired();

    throw new Error(
      result.message || 'Session expired.',
    );
  }

  if (!response.ok) {
    throw new Error(
      result.message || 'Request failed.',
    );
  }

  return result;
};

export const loginAdmin = async (
  data: AdminLoginData,
): Promise<AdminLoginResponse> => {
  return apiRequest<AdminLoginResponse>(
    '/admin/login',
    {
      method: 'POST',
      requireAuth: false,
      body: JSON.stringify(data),
    },
  );
};

export const getAdminReviews =
  async (): Promise<Review[]> => {
    return apiRequest<Review[]>(
      '/reviews/admin',
    );
  };

export const updateReviewStatus =
  async (
    id: number,
    status: ReviewStatus,
  ): Promise<Review> => {
    const result = await apiRequest<{
      review: Review;
    }>(
      `/reviews/admin/${id}`,
      {
        method: 'PATCH',
        body: JSON.stringify({ status }),
      },
    );

    return result.review;
  };

export const deleteReview =
  async (
    id: number,
  ): Promise<Review> => {
    const result = await apiRequest<{
      review: Review;
    }>(
      `/reviews/admin/${id}`,
      {
        method: 'DELETE',
      },
    );

    return result.review;
  };