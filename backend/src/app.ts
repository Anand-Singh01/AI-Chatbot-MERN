import { config } from 'dotenv';
import express from 'express';
import chatRoutes from './routes/chat.js';
import userRoutes from './routes/user.js';
config();
const app = express();

//middlewares
app.use(express.json());
app.use("/user", userRoutes); 
app.use("/chats", chatRoutes);

export default app;