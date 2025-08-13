import { useMutation } from "@tanstack/react-query";
import { userApi, type UserResponse } from "../api/user-api";
import { queryClient } from "@/app/providers/queryClient";
import type { ErrorResponse, ValidationErrorResponce } from "@/shared/api/api";
import { toast } from "react-toastify";

export const useNickname = () => {
    const updateUserNicknameMutation = useMutation({
        mutationKey: [userApi.baseKey, "nickname"],
        mutationFn: userApi.updateNickname,
        onMutate: async (nickname) => {
            await queryClient.cancelQueries({ queryKey: [userApi.baseKey] });

            const previousUser = queryClient.getQueryData([userApi.baseKey, "info"]);

            queryClient.setQueryData(
                [userApi.baseKey, "info"],
                (oldData: UserResponse) => ({
                    ...oldData,
                    nickname
                })
            );

            return { previousUser }
        },
        onError: (error, _, context) => {
            queryClient.setQueryData([userApi.baseKey, "info"], context?.previousUser);
            const data = (error as ErrorResponse).response.data;

            if ((data.errors as ValidationErrorResponce).details) {
                console.log("er");

                toast.error((data.errors as ValidationErrorResponce).details[0].message);
            } else {
                toast.error(data.message);
            }
        },
        onSuccess: () => {
            toast.success("Nickname updated");
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: [userApi.baseKey] });
        }
    });

    return {
        mutateNickname: updateUserNicknameMutation.mutate,
        isNicknamePending: updateUserNicknameMutation.isPending
    }
}