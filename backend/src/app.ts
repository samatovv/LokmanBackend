import express from 'express';
import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoutes';
import productRoutes from './routes/productRoutes';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import analyticsRoutes from './routes/analyticsRoutes';
import categoryRoutes from './routes/categoryRoutes';
import bannerRoutes from './routes/bannerRoutes';
import path from 'path';

const app = express();

app.use(cors({
    origin: (origin, callback) => {
      const allowedOrigins = [
        'http://localhost:3000',
        'http://192.168.77.7:3000',
        'https://sigmamedtrade.kg',
        'https://backend.sigmamedtrade.kg',
      ];
  
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
  }));
app.use(cookieParser());

app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

app.use('/categories', categoryRoutes);
app.use('/products', productRoutes);
app.use('/analytics', analyticsRoutes);
app.use('/users', userRoutes);
app.use('/banners', bannerRoutes);
app.use('/auth', authRoutes); 

export default app;
