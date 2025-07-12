import type { NextFunction, Request, Response } from "express";
import ApiError from "../exceptions/ApiError";

export const errorMiddleware = (err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err);

    if (err instanceof ApiError) {
        const apiErrorMessage = err as ApiError;

        res.status(apiErrorMessage.status).json({
            message: apiErrorMessage.message,
            status: apiErrorMessage.status,
            errors: apiErrorMessage.errors
        });
    } else {
        res.status(500).send("Internal server error!");
    };

    next();
};