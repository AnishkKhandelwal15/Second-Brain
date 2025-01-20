import {Router} from "express";
import userRouter from "./user.routes"
import brainRouter from "./brain.routes"
import contentRouter from "./content.routes"
const router= Router();

router.use('/user', userRouter);
router.use('/brain', brainRouter);
router.use('/content',contentRouter);

export default router;