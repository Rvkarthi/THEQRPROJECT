import express from 'express';
import cors from 'cors';
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
app.listen(5000, () => {
    if(connectDb())
    {
        console.log("Server is running at http://localhost:5000");
    }    
});
