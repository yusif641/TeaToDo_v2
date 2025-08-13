import { useMutation } from "@tanstack/react-query";
import { userApi } from "../api/user-api";
import { queryClient } from "@/app/providers/queryClient";
import type { ErrorResponse } from "@/shared/api/api";
import { toast } from "react-toastify";

export const useUpdateAvatar = () => {
    const updateUserAvatarMutation = useMutation({
        mutationKey: [userApi.baseKey, "avatar"],
        mutationFn: userApi.updateAvatar,
        onMutate: async () => {
            await queryClient.cancelQueries({ queryKey: [userApi.baseKey] });

            const previousUser = queryClient.getQueryData([userApi.baseKey, "info"]);

            return { previousUser }
        },
        onError: (error, _, context) => {
            queryClient.setQueryData([userApi.baseKey, "info"], context?.previousUser);
            toast.error((error as ErrorResponse).response.data.message);
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: [userApi.baseKey] });
        },
        onSuccess: () => {
            toast.success("Avatar updated");
        }
    });

    return {
        updateAvatar: updateUserAvatarMutation.mutate
    }
}