import { unlinkSync } from "fs";
import { prisma } from "../config/prismaClient";
import UserResponseDto from "../utils/dtos/UserResponseDto";
import ApiError from "../utils/exceptions/ApiError";

class UserService {
    async findUser(userId: string) {
        const user = await prisma.users.findUnique({ where: { user_id: userId } });
        if (!user) throw ApiError.NotFound("User not found");

        const userData = new UserResponseDto(user);

        return userData;
    }

    async changeNickname(userId: string, nickname: string) {
        const user = await prisma.users.findUnique({ where: { user_id: userId } });
        if (!user) throw ApiError.NotFound("User not found");

        const updatedUser = await prisma.users.update({
            where: {
                user_id: userId
            },
            data: {
                nickname
            }
        });

        const userData = new UserResponseDto(updatedUser);

        return userData;
    }

    async addAvatar(userId: string, avatarPath: string) {
        const user = await prisma.users.findUnique({ where: { user_id: userId } });
        if (!user) throw ApiError.NotFound("User not found");

        const updatedUser = await prisma.users.update({
            where: {
                user_id: userId
            },
            data: {
                avatar_url: avatarPath
            }
        });

        const userData = new UserResponseDto(updatedUser);

        return userData;
    }

    async removeAvatar(userId: string) {
        const user = await prisma.users.findUnique({ where: { user_id: userId } });

        if (!user) throw ApiError.NotFound("User not found");
        if (!user.avatar_url) throw ApiError.BadRequest("User has not any avatar")

        unlinkSync(user.avatar_url);

        await prisma.users.update({
            where: {
                user_id: userId
            },
            data: {
                avatar_url: null
            }
        });
    }
};

export default new UserService();