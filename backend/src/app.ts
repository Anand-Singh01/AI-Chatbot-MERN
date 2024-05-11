import { config } from 'dotenv';
import express from 'express';
<<<<<<< HEAD
import chatRoutes from './routes/chat.js';
import userRoutes from './routes/user.js';
=======
>>>>>>> 446bd1ea8e82236eb3f6b3947e170bea360672f7
config();
const app = express();

//middlewares
app.use(express.json());
<<<<<<< HEAD
app.use("/user", userRoutes); 
app.use("/chats", chatRoutes);
=======
>>>>>>> 446bd1ea8e82236eb3f6b3947e170bea360672f7

export default app;