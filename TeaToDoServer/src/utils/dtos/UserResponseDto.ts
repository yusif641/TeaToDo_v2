import type { users } from "@prisma/client";

class UserResponseDto {
    public user_id: string;
    public email: string;
    public nickname: string;
    public is_activated: boolean;
    public avatar_url: string | null;

    constructor(model: users) { 
        this.user_id = model.user_id;
        this.email = model.email;
        this.nickname = model.nickname;
        this.is_activated = model.is_activated;
        this.avatar_url = model.avatar_url;
    };
};

export default UserResponseDto;