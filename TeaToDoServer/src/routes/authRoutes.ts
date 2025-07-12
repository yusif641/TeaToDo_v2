import { Router } from "express";
import authController from "../controllers/authController";
import { validate } from "../utils/middlewares/validateMiddleware";
import { UserAuthSchema } from "../utils/validation/authValidation";

const authRouter = Router();

authRouter.post("/login", validate(UserAuthSchema), authController.login);
authRouter.post("/register", validate(UserAuthSchema), authController.register);
authRouter.post("/logout", authController.logout);
authRouter.get("/refreshToken", authController.refresh);
authRouter.get("/activate/:link", authController.activate);

export default authRouter;