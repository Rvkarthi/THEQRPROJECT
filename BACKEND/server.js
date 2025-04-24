import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
import userRouter from './router/user.router.js';
import connectDb from './library/connection.js';

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/auth/user", userRouter)

// Routes
app.get('/', (req, res) => {
    res.send("working");
});

// Server
app.listen(process.env.PORT, async () => {
    try {
      await connectDb();
      console.log(`✅ Server running on http://localhost:${PORT}`);
    } catch (err) {
      console.error('❌ Database connection failed:', err.message);
    }
  });
