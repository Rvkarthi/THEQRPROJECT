import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
import userRouter from './router/user.router.js';
import connectDb from './library/connection.js';

const app = express();

// CORS configuration
const corsOptions = {
  origin: process.env.FRONTEND_URL || '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};

// Middlewares
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check route
app.get('/', (req, res) => {
    res.json({ status: 'ok', message: 'Server is running' });
});

// API routes
app.use("/auth/user", userRouter);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    status: 'error',
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    status: 'error',
    message: 'Route not found'
  });
});

const PORT = process.env.PORT || 3000;

// Server
app.listen(PORT, async () => {
    try {
      await connectDb();
      console.log(`✅ Server running on http://localhost:${PORT}`);
    } catch (err) {
      console.error('❌ Database connection failed:', err.message);
      process.exit(1);
    }
});
