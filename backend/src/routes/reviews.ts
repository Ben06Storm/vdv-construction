import { Router } from 'express';

const router = Router();

router.post('/', (req, res) => {
  console.log('New review:', req.body);

  res.status(201).json({
    message: 'Review received successfully',
    review: req.body,
  });
});

export default router;