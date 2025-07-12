import { SERVER_URL } from "../config/constants";
import { prisma } from "../config/prismaClient";
import ApiError from "../utils/exceptions/ApiError";
import { hashPassword } from "../utils/helpers/hashPassword";
import { v4 } from "uuid";
import MailService from "./MailService";
import TokenService from "./TokenService";
import bcrypt from "bcrypt";
import type { JwtPayload } from "jsonwebtoken";
import { updateUser } from "../utils/helpers/updateUser";

class AuthService {
    async register(email: string, password: string) {
        const candidate = await prisma.users.findUnique({
            where: {
                email
            }
        });

        if (candidate) {
            throw ApiError.BadRequest("User with that email already exists!");
        }

        const hashedPassword = await hashPassword(password);
        const activationLink = v4();

        const user = await prisma.users.create({
            data: {
                email,
                password: hashedPassword,
                nickname: email,
                activation_link: activationLink
            }
        });

        await MailService.sendActivationLink(`${SERVER_URL}/api/v1/auth/activate/${activationLink}`, email);
        
        const data = await updateUser(user);

        return data;
    }

    async loging(email: string, password: string) {
        const user = await prisma.users.findUnique({
            where: {
                email
            }
        });

        if (!user) throw ApiError.UnAuthorized();

        const isMatchedPassword = await bcrypt.compare(password, user.password);
        if (!isMatchedPassword) throw ApiError.BadRequest("Password is incorrect");

        const data = await updateUser(user);

        return data;
    }

    async logout(refreshToken: string) { 
        const deletedToken = await TokenService.deleteToken(refreshToken);

        return deletedToken;
    }

    async refresh(refreshToken: string) { 
        if (!refreshToken) throw ApiError.UnAuthorized();

        const tokenFromDb = await TokenService.findToken(refreshToken);
        const userData = TokenService.validateRefreshToken(refreshToken) as JwtPayload;

        if (!userData || !tokenFromDb) throw ApiError.UnAuthorized();

        const user = await prisma.users.findUnique({
            where: {
                user_id: userData.payload.user_id
            }
        });

        const data = await updateUser(user!);

        return data;
    }

    async activatte(link: string) { 
        const user = await prisma.users.findFirst({
            where: {
                activation_link: link
            }
        });

        if (!user) throw ApiError.BadRequest("Link is incorrect");

        await prisma.users.update({
            where: {
                user_id: user.user_id
            },
            data: {
                is_activated: true
            }
        });
    }
};

export default new AuthService();