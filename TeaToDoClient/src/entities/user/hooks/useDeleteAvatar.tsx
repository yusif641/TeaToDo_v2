import { useMutation } from "@tanstack/react-query";
import { userApi, type UserResponse } from "../api/user-api";
import { queryClient } from "@/app/providers/queryClient";
import { toast } from "react-toastify";
import type { ErrorResponse } from "@/shared/api/api";

export const useDeleteAvatar = () => {
    const deleteUserAvatarMutation = useMutation({
        mutationFn: userApi.deleteAvatar,
        onSettled: async () => {
            queryClient.invalidateQueries({ queryKey: [userApi.baseKey] });
        },
        onError: (error) => {
            toast.error((error as ErrorResponse).response.data.message);
        },
        onSuccess: async () => {
            queryClient.setQueryData(
                [userApi.baseKey, "info"],
                (oldData: UserResponse) => ({
                    ...oldData,
                    avatar_url: null
                })
            );

            toast.success("Avatar removed");
        }
    });

    return {
        deleteAvatar: deleteUserAvatarMutation.mutate
    }
}