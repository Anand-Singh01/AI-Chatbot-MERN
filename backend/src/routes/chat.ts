import { Router } from "express";
import { generateChat } from "../controllers/chat-controllers.js";
import { validateMessage } from "../middlewares/index.js";
import { verifyToken } from "../utils/token.js";
const chatRoutes = Router();

// /chats/new
chatRoutes.post("/new", verifyToken, validateMessage, generateChat)

export default chatRoutes;