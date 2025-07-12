import type { NextFunction, Request, Response } from "express";
import type { ZodSchema } from "zod";
import ApiError from "../exceptions/ApiError";
import { fromZodError } from "zod-validation-error";

export const validate = <T>(schema: ZodSchema<T>) => (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
        throw ApiError.BadRequest("Incorrect data", fromZodError(result.error))
    }

    next();
}