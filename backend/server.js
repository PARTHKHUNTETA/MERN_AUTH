import express from "express";
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes.js'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";

dotenv.config()
const PORT = process.env.PORT || 5000;
connectDB()
const app = express();
app.use(express.json())
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }))

app.use('/api/users', userRoutes)

app.get('/', (req, res) => { res.send('SERVER IS READY') })
app.use(notFound);
app.use(errorHandler);
app.listen(PORT, () => {
    console.log(`SERVER IS UP AND RUNNING ON ${PORT}`)
})
