import type { TokenPayload } from "../../services/TokenService";

class UserDto {
    public user_id: string;
    public email: string;
    public is_activated: boolean;

    constructor(model: TokenPayload) { 
        this.user_id = model.user_id;
        this.email = model.email;
        this.is_activated = model.is_activated;
    };
};

export default UserDto;