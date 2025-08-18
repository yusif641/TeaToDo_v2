import { useMutation } from "@tanstack/react-query";
import { taskGroupApi } from "../api/task-group-api";
import { toast } from "react-toastify";
import { queryClient } from "@/app/providers/queryClient";
import type { ErrorResponse } from "@/shared/api/api";

export const useRemoveBackground = () => {
    const removeTaskGroupBackgroundMutation = useMutation({
        mutationFn: taskGroupApi.removeTaskGroupBackground,
        onError: (error) => {
            toast.error((error as ErrorResponse).response.data.message);
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: [taskGroupApi.baseKey] });
        },
        onSuccess: () => {
            toast.success("Background deleted");
        }
    });

    return {
        removeTaskGroupBackground: removeTaskGroupBackgroundMutation.mutate
    }
}