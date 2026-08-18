import { Router } from 'express';

import type { CreateReviewData } from '../types/review';
import { validateReview } from '../utils/validation';
import { 
  createReview,
  getReviews,
} from '../services/reviewService';

const router = Router();

router.get('/', async (_req, res) => {
  const reviews = await getReviews();

  res.status(200).json(reviews);
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
  const review = await createReview(data);

  res.status(201).json({
    message: 'Review received successfully',
    review,
  });
});

export default router;