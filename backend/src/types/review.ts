export type Rating = 1 | 2 | 3 | 4 | 5;

export type ReviewStatus =
  | 'PENDING'
  | 'APPROVED'
  | 'REJECTED';

export type CreateReviewData = {
  name: string;
  city: string;
  rating: Rating;
  review: string;
};