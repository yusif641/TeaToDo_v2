import type { NextFunction, Request, Response } from "express"
import type { Nickname } from "../utils/validation/userValidation";
import UserService from "../services/UserService";
import ApiError from "../utils/exceptions/ApiError";
import { PATHS } from "../config/constants";

const userController = {
    async changeNickname(req: Request, res: Response, next: NextFunction) {
        try {
            const data: Nickname = req.body;
            const userId = req.user?.user_id!;

            const userData = await UserService.changeNickname(userId, data.nickname)

            res.status(200).json(userData);
        } catch (error) {
            next(error);
        }
    },

    async changeAvatar(req: Request, res: Response, next: NextFunction) {
        try {
            const file = req.file;

            if (!file) throw ApiError.BadRequest("File is required");

            const userId = req.user?.user_id!;
            const fileName = PATHS.AVATAR_PATH + req.file?.filename;
            const userData = await UserService.addAvatar(userId, fileName);

            res.status(200).json(userData);
        } catch (error) {
            next(error);
        }
    },

    async getUser(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = req.user?.user_id!;
            const userData = await UserService.findUser(userId);

            res.status(200).json(userData);
        } catch (error) {
            next(error);
        }
    },

    async deleteAvatar(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = req.user?.user_id!;
            await UserService.removeAvatar(userId);

            res.status(200);
        } catch (error) {
            next(error);
        }
    }
}

export default userController