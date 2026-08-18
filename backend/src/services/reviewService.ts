import type { CreateReviewData } from '../types/review';
import { prisma } from '../lib/prisma';

export const createReview = (
  data: CreateReviewData,
) => {
  return prisma.review.create({
    data: {
      name: data.name,
      city: data.city,
      rating: data.rating,
      review: data.review,
    },
  });
};

export const getReviews = () => {
  return prisma.review.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });
};