import TokenService, { type TokenPayload } from "../../services/TokenService";
import UserDto from "../dtos/UserDto";

export const updateUser = async (user: TokenPayload) => {
    const userData = new UserDto(user);
    const tokens = TokenService.generateTokens(userData);

    await TokenService.saveToken(tokens.refreshToken, userData.user_id);

    return {
        user: userData,
        tokens
    };
}