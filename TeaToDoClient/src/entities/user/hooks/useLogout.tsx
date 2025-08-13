import { useMutation } from "@tanstack/react-query";
import { userApi } from "../api/user-api";
import { queryClient } from "@/app/providers/queryClient";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/features/auth";
import { useShallow } from "zustand/react/shallow";

export const useLogout = () => {
    const navigate = useNavigate();
    const setIsAuth = useAuthStore(useShallow(state => state.setIsAuth));
    const setIsActivated = useAuthStore(useShallow(state => state.setIsActivated));

    const logoutMutation = useMutation({
        mutationFn: userApi.logout,
        onSuccess() {
            localStorage.clear();
            queryClient.clear();

            setIsAuth(false);
            setIsActivated(false);

            navigate("/sign-in");
        }
    });

    return logoutMutation.mutate;
}