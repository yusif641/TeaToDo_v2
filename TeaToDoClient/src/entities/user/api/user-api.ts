import $api from "@/shared/api/api";
import { LOGOUT_ENDPOINT, UPDATE_USER_NICKNAME, USER_AVATAR, USER_INFO_ENDPOINT } from "../config/constants";

export type UserResponse = {
    user_id: string,
    email: string,
    nickname: string,
    is_activated: boolean,
    avatar_url: string | null
}

export const userApi = {
    baseKey: "user",
    getUserInfo: () => {
        return $api.get<UserResponse>(USER_INFO_ENDPOINT);
    },
    logout: () => {
        return $api.post(LOGOUT_ENDPOINT);
    },
    updateNickname: (data: { nickname: string }) => {
        return $api.patch<UserResponse>(UPDATE_USER_NICKNAME, data);
    },
    updateAvatar: (formData: FormData) => {
        return $api.patch<UserResponse>(USER_AVATAR, formData);
    },
    deleteAvatar: () => {
        return $api.delete(USER_AVATAR);
    }
}