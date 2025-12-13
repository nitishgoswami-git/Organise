import express from 'express';
import indexRouter from './routes/index.js';
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from 'dotenv';
dotenv.config();
//

const app = express();
console.log("CORS_ORIGIN:", process.env.CORS_ORIGIN);
// Middleware
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
}));


app.use(cookieParser());
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));


app.use('/api/v1', indexRouter);

export default app;
