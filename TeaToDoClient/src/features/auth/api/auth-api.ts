import $api from "@/shared/api/api";
import { LOGIN_ENDPOINT, REGISTER_ENDPOINT } from "../config/constants";

export type AuthResponse = {
    user: {
        user_id: string;
        email: string;
        is_activated: boolean;
    },
    accessToken: string
};

export const authApi = {
    baseKey: "auth",
    login: async (data: { email: string, password: string }) => {
        return $api.post<AuthResponse>(LOGIN_ENDPOINT, data);
    },
    register: (data: { email: string, password: string }) => {
        return $api.post<AuthResponse>(REGISTER_ENDPOINT, data);
    },

};