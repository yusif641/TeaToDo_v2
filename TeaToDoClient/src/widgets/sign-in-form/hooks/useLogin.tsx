import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';
import { authApi, useAuthStore } from '@/features/auth';
import { useMutation } from '@tanstack/react-query';
import type { ErrorResponse } from '@/shared/api/api';
import type { signInFields } from "../config/types";

export const useLogin = (checked: boolean) => {
    const navigate = useNavigate();

    const { setIsActivated, setIsAuth } = useAuthStore();

    const loginMutation = useMutation({
        mutationKey: [authApi.baseKey, "user"],
        mutationFn: authApi.login,
        onSuccess(data) {
            setIsAuth(true);
            setIsActivated(data.data.user.is_activated);

            localStorage.setItem("token", data.data.accessToken);

            navigate("/home");
        }
    });

    const onSubmit = (data: signInFields) => {
        try {
            if (!checked) {
                return toast.error("You must agree with our terms of use!");
            };

            loginMutation.mutate({
                email: data.email,
                password: data.password
            });

            if (loginMutation.isError) {
                const error = loginMutation.error as ErrorResponse;
                toast.error(error.response.data.message);
            }
        } catch (error) {
            toast.error("Something went wrong, try again later");
        };
    };

    const onErrorSubmit = () => {
        toast.error("Please, fill the form correct");
    }

    return {
        onSubmit,
        onErrorSubmit,
        isPending: loginMutation.isPending
    }
}