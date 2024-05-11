import { Router } from "express";
import { getAllUsers, userLogin, userSignup } from "../controllers/user-controllers.js";
import { validateLogin, validateSignUp } from "../middlewares/index.js";

const userRoutes = Router();

// /user/
userRoutes.get('/', getAllUsers)

// /user/signup
userRoutes.post('/signup', validateSignUp, userSignup);

// /user/login
userRoutes.post('/login', validateLogin, userLogin);
export default userRoutes;