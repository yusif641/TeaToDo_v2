import { Router } from "express";
import authRouter from "./authRoutes";
import userRouter from "./userRoutes";
import taskGroupesRouter from "./taskGroupesRoutes";
import quotesRouter from "./quotesRouter";

const router = Router();

router.use("/auth", authRouter);
router.use(userRouter);
router.use(taskGroupesRouter);
router.use(quotesRouter);

export default router;