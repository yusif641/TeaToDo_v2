import { TOKENS } from "../config/constants";
import { prisma } from "../config/prismaClient";
import jwt from "jsonwebtoken";

export type TokenPayload = {
    user_id: string,
    email: string,
    is_activated: boolean
}

export type Token = {
    payload: TokenPayload,
    iat: number,
    exp: number
}

class TokenSerivce {
    async saveToken(refreshToken: string, userId: string) {
        const token = await prisma.refresh_tokens.upsert({
            where: {
                user_id: userId
            },
            update: {
                refresh_token: refreshToken
            },
            create: {
                user_id: userId,
                refresh_token: refreshToken
            }
        });

        return token;
    }

    async findToken(refreshToken: string) {
        const token = await prisma.refresh_tokens.findFirst({
            where: {
                refresh_token: refreshToken
            }
        });

        return token;
    }

    async deleteToken(refreshToken: string) {
        const deletedToken = await prisma.refresh_tokens.delete({
            where: {
                refresh_token: refreshToken
            }
        });

        return deletedToken;
    }

    generateTokens(payload: TokenPayload) {
        const accessToken = jwt.sign({ payload }, TOKENS.ACCESS_TOKEN, { expiresIn: "10m" });
        const refreshToken = jwt.sign({ payload }, TOKENS.REFRESH_TOKEN, { expiresIn: "30d" });

        return {
            accessToken,
            refreshToken
        };
    }

    validateAccessToken(accessToken: string) {
        try {
            const userData = jwt.verify(accessToken, TOKENS.ACCESS_TOKEN);

            return userData;
        } catch (error) {
            return null;
        }
    }

    validateRefreshToken(refreshToken: string) {
        try {
            const userData = jwt.verify(refreshToken, TOKENS.REFRESH_TOKEN);

            return userData;
        } catch (error) {
            return null;
        }
    }
}

export default new TokenSerivce();