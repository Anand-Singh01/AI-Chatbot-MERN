import { config } from 'dotenv';
import express, { NextFunction, Request, Response } from 'express';
import chatRoutes from './routes/chat.js';
import userRoutes from './routes/user.js';

config();
const app = express();

//middleware
app.use(express.json());

app.use("/user", userRoutes); 
app.use("/chats", chatRoutes);

// global Catch
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    res.status(403).json({ msg: "Error" });
});
export default app;