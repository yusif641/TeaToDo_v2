import { Router } from "express";
import authRouter from "./authRoutes";
import userRouter from "./userRoutes";

const router = Router();

router.use("/auth", authRouter);
router.use(userRouter);

export default router;