import { Router } from "express";
import { getAllUsers, userLogin, userSignup, verifyUser } from "../controllers/user-controllers.js";
import { validateLogin, validateSignUp } from "../middlewares/index.js";
import { verifyToken } from "../utils/token.js";

const userRoutes = Router();

// /user/
userRoutes.get('/', getAllUsers)

// /user/signup
userRoutes.post('/signup', validateSignUp, userSignup);

// /user/login
userRoutes.post('/login', validateLogin, userLogin);

// /user/auth-status
userRoutes.get('/auth-status', verifyToken, verifyUser);




export default userRoutes;