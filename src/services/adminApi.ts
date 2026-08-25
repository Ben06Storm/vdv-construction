import type {
  AdminLoginData,
  AdminLoginResponse,
} from '../types/admin';

import type { 
  Review,
  ReviewStatus,
} from '../types/review';

const API_URL = import.meta.env.VITE_API_URL;

export const loginAdmin = async (
  data: AdminLoginData,
): Promise<AdminLoginResponse> => {
  const response = await fetch(
    `${API_URL}/admin/login`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    },
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(
      result.message || 'Login failed.',
    );
  }

  return result;
};

export const getAdminReviews = async (): Promise<
  Review[]
> => {
  const token = localStorage.getItem('adminToken');

  if (!token) {
    throw new Error('Admin token is missing.');
  }

  const response = await fetch(
    `${API_URL}/reviews/admin`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(
      result.message || 'Failed to get reviews.',
    );
  }

  return result;
};

export const updateReviewStatus = async (
  id: number,
  status: ReviewStatus,
): Promise<Review> => {
  const token = localStorage.getItem('adminToken');

  if (!token) {
    throw new Error('Admin token is missing.');
  }

  const response = await fetch(
    `${API_URL}/reviews/admin/${id}`,
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status }),
    },
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(
      result.message || 'Failed to update review status.',
    );
  }

  return result.review;
};

