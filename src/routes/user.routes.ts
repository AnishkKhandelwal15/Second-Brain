import { Router } from 'express';
import {signin, signup, signout, checkAuth} from "../controllers/user.controller";
import AsyncHandler from "express-async-handler";
import { authMiddleware } from "../middleware/auth.middleware";

const router = Router();

router.post('/signup', signup)
router.post('/signup', signin)
router.get('/signout', authMiddleware, AsyncHandler(signout));
router.get('/checkAuth', authMiddleware, AsyncHandler(checkAuth));
export default router;
