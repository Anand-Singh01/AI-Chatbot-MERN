import { config } from 'dotenv';
import express from 'express';
config();
const app = express();
//middlewares
app.use(express.json());
export default app;
