import { Router } from "express";
import authRouter from "./authRoutes";
import userRouter from "./userRoutes";
import taskGroupesRouter from "./taskGroupesRoutes";

const router = Router();

router.use("/auth", authRouter);
router.use(userRouter);
router.use(taskGroupesRouter);

export default router;