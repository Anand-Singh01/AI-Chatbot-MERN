import { Router } from "express";
import {
    deleteSection,
    getAllChats,
    getCategories,
    getSingleChat,
    updateSectionName
} from "../controllers/chat-controllers.js";
import { validateMessage } from "../middlewares/index.js";
import { verifyToken } from "../utils/token.js";
const chatRoutes = Router();

// /chats/getAll/:sectionId
chatRoutes.post("/getAll/:sectionId", verifyToken, getAllChats);

// /chats/getOne
chatRoutes.post("/getOne", verifyToken, validateMessage, getSingleChat);

// /chats/getCategories
chatRoutes.post("/getCategories", verifyToken, getCategories);

// /chats/updateSectionName
chatRoutes.post("/updateSectionName", verifyToken, updateSectionName);

// /chats/deleteSection
chatRoutes.post("/deleteSection", verifyToken, deleteSection);

export default chatRoutes;
