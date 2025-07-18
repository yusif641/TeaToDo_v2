import { Router } from "express";
import authRouter from "./authRoutes";
import userRouter from "./userRoutes";
import taskGroupesRouter from "./taskGroupesRoutes";
import quotesRouter from "./quotesRouter";
import taskRouter from "./tasksRoutes";
import thoughtsRouter from "./thoughtsRoutes";
import fullTasksRouter from "./fullTasksRoutes";

const router = Router();

router.use("/auth", authRouter);
router.use(userRouter);
router.use(taskGroupesRouter);
router.use(quotesRouter);
router.use(taskRouter);
router.use(thoughtsRouter);
router.use(fullTasksRouter);

export default router;