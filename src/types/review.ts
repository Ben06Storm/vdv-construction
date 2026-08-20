export type Rating = 1 | 2 | 3 | 4 | 5;

export type ReviewStatus =
  | 'PENDING'
  | 'APPROVED'
  | 'REJECTED';

export type Review = {
  id: number;
  name: string;
  city: string;
  rating: Rating;
  review: string;
  status: ReviewStatus;
  createdAt: string;
};

export type ReviewFormData = {
  name: string;
  city: string;
  rating: Rating | 0;
  review: string;
};

