export type Rating = 1 | 2 | 3 | 4 | 5;

export type CreateReviewData = {
  name: string;
  city: string;
  rating: Rating;
  review: string;
};