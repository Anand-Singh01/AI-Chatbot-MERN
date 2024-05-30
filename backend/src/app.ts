import cookieParser from 'cookie-parser';
import cors from 'cors';
import { config } from 'dotenv';
import express, { NextFunction, Request, Response } from 'express';
import chatRoutes from './routes/chat.js';
import userRoutes from './routes/user.js';
config();
const app = express();

//middleware
app.use(cors({
<<<<<<< HEAD
    origin:"http://localhost:5173/",
=======
    origin:'*',
>>>>>>> 5674991a1323373066913b6f6652eae6ac07ca3a
    credentials:true
}));
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));

app.use("/user", userRoutes); 
app.use("/chats", chatRoutes);

// global Catch
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    res.status(403).json({ msg: "Error" });
});
export default app;