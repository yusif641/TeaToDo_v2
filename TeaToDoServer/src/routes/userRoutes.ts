import { Router } from "express";
import { authMiddleware } from "../utils/middlewares/authMiddleware";
import fileMiddleware from "../utils/middlewares/multerMiddleware";
import userController from "../controllers/userController";
import { validate } from "../utils/middlewares/validateMiddleware";
import { NicknameSchema } from "../utils/validation/userValidation";

const userRouter = Router();

userRouter.get("/user", authMiddleware, userController.getUser);
userRouter.patch("/user/nickname", authMiddleware, validate(NicknameSchema), userController.changeNickname);
userRouter.patch("/user/avatar", authMiddleware, fileMiddleware.single("avatar"), userController.changeAvatar);
userRouter.delete("/user/avatar", authMiddleware, userController.getUser, userController.deleteAvatar);

export default userRouter;