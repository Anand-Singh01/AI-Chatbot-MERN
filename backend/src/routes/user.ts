import { Router } from "express";
import { getAllUsers, userSignup } from "../controllers/user-controllers.js";
import { validateSignUp } from "../middlewares/index.js";

const userRoutes = Router();

// /user/
userRoutes.get('/', getAllUsers)
userRoutes.post('/signup', validateSignUp, userSignup);
export default userRoutes;