import { Router } from "express";
import { getAllChats, getSingleChat } from "../controllers/chat-controllers.js";
import { validateMessage } from "../middlewares/index.js";
import { verifyToken } from "../utils/token.js";
const chatRoutes = Router();

// /chats/getAll
chatRoutes.get("/getAll", verifyToken, getAllChats)

// /chats/getOne
chatRoutes.post("/getOne", verifyToken, validateMessage, getSingleChat)

export default chatRoutes;