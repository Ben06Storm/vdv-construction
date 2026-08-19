import { Router } from 'express';

import type { CreateReviewData } from '../types/review';
import { validateReview } from '../utils/validation';
import {
  createReview,
  getReviews,
} from '../services/reviewService';

const router = Router();

router.get('/', async (_req, res) => {
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