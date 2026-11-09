import 'dotenv/config';
import express from 'express';
import cors from 'cors';

import reviewsRouter from './routes/reviews';
import adminRouter from './routes/admin';

const app = express();
const PORT = process.env.PORT || 5000;

app.set('trust proxy', 1);

const allowedOrigins = [
  'https://vdvconstruction.com',
  'https://www.vdvconstruction.com',
  'https://vdv-construction.netlify.app',
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
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
