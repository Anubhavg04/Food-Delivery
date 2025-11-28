import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db';
import authRoutes from './routes/auth';
import restaurantRoutes from './routes/restaurants';
import path from 'path';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
const MONGO = process.env.MONGO_URI || 'mongodb://localhost:27017/zomato_clone';

connectDB(MONGO);

app.use('/api/auth', authRoutes);
app.use('/api/restaurants', restaurantRoutes);

// optional: serve frontend in production (if you build it later)
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '..', '..', 'frontend', 'dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', '..', 'frontend', 'dist', 'index.html'));
  });
}

app.listen(PORT, () => console.log(`Server running on ${PORT}`));
