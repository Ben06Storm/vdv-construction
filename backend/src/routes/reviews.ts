import { Router } from 'express';

import type {
  CreateReviewData,
  ReviewStatus,
} from '../types/review';

import { validateReview } from '../utils/validation';
import {
  createReview,
  getReviews,
  getAllReviews,
  updateReviewStatus,
  deleteReview,
} from '../services/reviewService';
import { authMiddleware } from '../middleware/auth';
import { reviewCreationLimiter } from '../middleware/rateLimit';

const router = Router();

router.get('/',
  reviewCreationLimiter,
  async (_req, res) => {
  try {
    const reviews = await getReviews();
    res.status(200).json(reviews);
  } catch (error) {
    console.error('Failed to get reviews:', error);

    res.status(500).json({
      message: 'Failed to get reviews.',
    });
  }
});

router.get('/admin', authMiddleware, async (_req, res) => {
  try {
    const reviews = await getAllReviews();

    res.status(200).json(reviews);
  } catch (error) {
    console.error('Failed to get all reviews:', error);

    res.status(500).json({
      message: 'Failed to get all reviews.',
    });
  }
});

router.patch('/admin/:id', authMiddleware, async (req, res) => {
  const id = Number(req.params.id);
  const { status } = req.body as { status: ReviewStatus };

  if (!Number.isInteger(id)) {
    res.status(400).json({
      message: 'Invalid review id.',
    });

    return;
  }

  if (!['PENDING', 'APPROVED', 'REJECTED'].includes(status)) {
    res.status(400).json({
      message: 'Invalid review status.',
    });

    return;
  }

  try {
    const review = await updateReviewStatus(id, status);

    res.status(200).json({
      message: 'Review status updated successfully.',
      review,
    });
  } catch (error) {
    console.error('Failed to update review status:', error);

    res.status(500).json({
      message: 'Failed to update review status.',
    });
  }
});

router.delete('/admin/:id', authMiddleware, async (req, res) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id)) {
    res.status(400).json({
      message: 'Invalid review id.',
    });

    return;
  }

  try {
    const review = await deleteReview(id);

    res.status(200).json({
      message: 'Review deleted successfully.',
      review,
    });
  } catch (error) {
    console.error('Failed to delete review:', error);

    res.status(500).json({
      message: 'Failed to delete review.',
    });
  }
});

router.post('/', async (req, res) => {
  const data = req.body as CreateReviewData;

  const validationError = validateReview(data);

  if (validationError) {
    res.status(400).json({
      message: validationError,
    });

    return;
  }
  try {
    const review = await createReview(data);

    res.status(201).json({
      message: 'Review received successfully',
      review,
    });
  } catch (error) {
    console.error('Failed to create review:', error);

    res.status(500).json({
      message: 'Failed to create review.',
    });
  }
});

export default router;