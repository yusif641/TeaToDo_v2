import axios, { AxiosError } from "axios";
import { API_URL, REFRESH_ENDPOINT } from "../utils/constants";

type RefreshResponce = {
    user: {
        user_id: string;
        email: string;
        is_activated: boolean;
    },
    accessToken: string
};

export interface ErrorResponse extends Error {
    response: {
        data: {
            message: string,
            status: number,
            errrors: null | string[]
        }
    }
}

const $api = axios.create({
    withCredentials: true,
    baseURL: API_URL
});


export const refresh = () => {
    return $api.get<RefreshResponce>(REFRESH_ENDPOINT);
}

$api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;

    return config;
});

$api.interceptors.response.use((config) => {
    return config;
}, async (error: AxiosError) => {
    const originalRequest = error.config;

    if (error.response?.status == 401 && error.config && !error.config.headers['X-Retry-Attempt']) {
        error.config.headers['X-Retry-Attempt'] = 'true'; 

        try {
            const responce = await refresh();
            localStorage.setItem("token", responce.data.accessToken);

            return $api.request(originalRequest!);
        } catch (error) {
            console.log("Unauthoarized");
        };
    };

    return Promise.reject(error);
});

export default $api;