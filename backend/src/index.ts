import 'dotenv/config';
import express from 'express';
import cors from 'cors';

import { env } from './config/env';
import reviewsRouter from './routes/reviews';
import adminRouter from './routes/admin';

const app = express();
const PORT = process.env.PORT || 5000;

app.set('trust proxy', 1);
app.use(
  cors({
    origin: env.FRONTEND_URL,
  }),
);
app.use(express.json());
app.use('/reviews', reviewsRouter);
app.use('/admin', adminRouter);

app.get('/', (_req, res) => {
  res.json({
    message: 'VDV Construction API is running',
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
