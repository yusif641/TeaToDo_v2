import type { NextFunction, Request, Response } from "express";
import ApiError from "../exceptions/ApiError";
import TokenService, { type Token } from "../../services/TokenService";

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    try {
        const authorizationHeader = req.headers.authorization;
        if (!authorizationHeader) next(ApiError.UnAuthorized());
        
        const accessToken = authorizationHeader?.split(" ")[1];
        if (!accessToken) next(ApiError.UnAuthorized());

        const userData = TokenService.validateAccessToken(accessToken!) as Token;
        if (!userData) next(ApiError.UnAuthorized());

        req.user = userData.payload;

        next();
    } catch (error) {
        next(ApiError.UnAuthorized());
    }
}