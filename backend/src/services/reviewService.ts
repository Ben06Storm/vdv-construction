import type {
  CreateReviewData,
  ReviewStatus,
} from '../types/review';
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
    where: {
      status: 'APPROVED',
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
};

export const deleteReview = (id: number) => {
  return prisma.review.delete({
    where: {
      id,
    },
  });
};

export const getAllReviews = () => {
  return prisma.review.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });
};

export const updateReviewStatus = (
  id: number,
  status: ReviewStatus,
) => {
  return prisma.review.update({
    where: {
      id,
    },
    data: {
      status,
    },
  });
};