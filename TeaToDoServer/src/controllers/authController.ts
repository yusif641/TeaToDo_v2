import type { NextFunction, Request, Response } from "express";
import type { UserAuth } from "../utils/validation/authValidation";
import AuthService from "../services/AuthService";
import { CLIENT_URL, TOKENS } from "../config/constants";

const authController = {
    async register(req: Request, res: Response, next: NextFunction) {
        try {
            const data: UserAuth = req.body;
            const userData = await AuthService.register(data.email, data.password);

            res.cookie(TOKENS.REFRESH_TOKEN_COOKIE, userData.tokens.refreshToken, {
                maxAge: TOKENS.REFRESH_TOKEN_MAX_AGE,
                httpOnly: true,
            });

            res.status(201).json({
                user: userData.user,
                accessToken: userData.tokens.accessToken
            });
        } catch (error) {
            next(error);
        }
    },

    async login(req: Request, res: Response, next: NextFunction) {
        try {
            const data: UserAuth = req.body;
            const userData = await AuthService.loging(data.email, data.password);

            res.cookie(TOKENS.REFRESH_TOKEN_COOKIE, userData.tokens.refreshToken, {
                maxAge: TOKENS.REFRESH_TOKEN_MAX_AGE,
                httpOnly: true,
            });

            res.status(201).json({
                user: userData.user,
                accessToken: userData.tokens.accessToken
            });
        } catch (error) {
            next(error);
        }
    },

    async logout(req: Request, res: Response, next: NextFunction) {
        try {
            const { refreshToken } = req.cookies;
            const token = await AuthService.logout(refreshToken);

            res.clearCookie(TOKENS.REFRESH_TOKEN_COOKIE);
            res.status(200).json(token);
        } catch (error) {
            next(error);
        }
    },

    async refresh(req: Request, res: Response, next: NextFunction) {
        try {
            const { refreshToken }  = req.cookies;
            const userData = await AuthService.refresh(refreshToken);

            res.cookie(TOKENS.REFRESH_TOKEN_COOKIE, userData.tokens.refreshToken, {
                maxAge: TOKENS.REFRESH_TOKEN_MAX_AGE,
                httpOnly: true,
            });

            res.status(201).json({
                user: userData.user,
                accessToken: userData.tokens.accessToken
            });
        } catch (error) {
            next(error);
        }
    },

    async activate(req: Request<{ link: string }>, res: Response, next: NextFunction) {
        try {
            const link = req.params.link;
            await AuthService.activatte(link);

            res.status(200).redirect(CLIENT_URL as string);
        } catch (error) {
            next(error);
        }
    }
};

export default authController;