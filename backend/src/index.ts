import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import reviewsRouter from './routes/reviews';
import adminRouter from './routes/admin';
import contactRouter from './routes/contact';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/reviews', reviewsRouter);
app.use('/admin', adminRouter);
app.use('/contact', contactRouter);

app.get('/', (_req, res) => {
  res.json({
    message: 'VDV Construction API is running',
  });
});

app.get('/health', (_req, res) => {
  res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});