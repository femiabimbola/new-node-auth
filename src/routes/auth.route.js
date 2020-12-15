import { Router } from "express";
import authController from "../controllers/auth.controller";
import catchAsync from "../middlewares/catchAsync";
import authentication from '../middlewares/authenticate';

const { signup, login, protectedRoute } = authController;
const { authenticate } = authentication;

const authRouter = Router();

authRouter.post('/signup', catchAsync(signup));
authRouter.post('/login', catchAsync(login));
authRouter.get('/verify', authenticate, catchAsync(protectedRoute));

export default authRouter;