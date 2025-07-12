import type { TokenPayload } from "../src/services/TokenService";
import { ITokenPayload } from "../src/types/tokenPayload";
import express from "express";

declare global {
    namespace Express {
        interface Request {
            user?: TokenPayload;
        };
    };
};