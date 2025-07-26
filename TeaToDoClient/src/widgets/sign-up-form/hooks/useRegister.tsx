import { toast, } from "react-toastify";
import { useNavigate } from 'react-router-dom';
import { authApi, useAuthStore } from '@/features/auth';
import { useMutation } from '@tanstack/react-query';
import type { ErrorResponse } from '@/shared/api/api';
import type { signUpFields } from "../config/types";

export const useRegister = (checked: boolean) => {
    const { setIsActivated, setIsAuth } = useAuthStore();
    const navigate = useNavigate();

    const registerMutation = useMutation({
        mutationKey: [authApi.baseKey, "user"],
        mutationFn: authApi.register,
        onSuccess(data) {
            navigate("/verify");
            setIsAuth(true);
            setIsActivated(data.data.user.is_activated);

            localStorage.setItem("token", data.data.accessToken);
        },
        onError(error) {
            toast.error((error as ErrorResponse).response.data.message);
        },
    });

    const onSubmit = (data: signUpFields) => {
        try {
            if (!checked) {
                return toast.error("You must agree with our terms of use!");
            };

            if (data.password !== data.repeatPassword) {
                return toast.error("Password and repeat password should match");
            };

            registerMutation.mutate({
                email: data.email,
                password: data.password
            });
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
        isPending: registerMutation.isPending
    }
}