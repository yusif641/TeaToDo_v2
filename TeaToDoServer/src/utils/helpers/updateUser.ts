import TokenService, { type TokenPayload } from "../../services/TokenService";
import UserDto from "../dtos/UserDto";

export const updateUser = async (user: TokenPayload) => {
    const userDto = new UserDto(user);
    const tokens = TokenService.generateTokens(userDto);

    await TokenService.saveToken(tokens.refreshToken, userDto.user_id);

    return {
        user: UserDto,
        tokens
    };
}