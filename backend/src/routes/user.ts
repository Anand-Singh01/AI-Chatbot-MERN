import { Router } from "express";
import { getAllUsers, updateCredentials, userLogin, userLogout, userSignup, verifyUser } from "../controllers/user-controllers.js";
import { validateLogin, validateSignUp, validateUpdateCredentialsRequest } from "../middlewares/index.js";
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

// /user/update-credentials
userRoutes.post('/update-credentials', validateUpdateCredentialsRequest, verifyToken, updateCredentials);

// /user/logout
userRoutes.get('/logout', verifyToken, userLogout);

export default userRoutes;