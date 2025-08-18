import { useMutation } from "@tanstack/react-query";
import { taskGroupApi } from "../api/task-group-api";
import { toast } from "react-toastify";
import type { ErrorResponse } from "@/shared/api/api";
import { queryClient } from "@/app/providers/queryClient";

export const useTaskGroupBackground = () => {
    const updateTaskGroupBackgroundMutation = useMutation({
        mutationKey: [taskGroupApi.baseKey, "background"],
        mutationFn: taskGroupApi.updateTaskGroupBackground,
        onError: (error) => {
            toast.error((error as ErrorResponse).response.data.message);
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: [taskGroupApi.baseKey] });
        },
        onSuccess: () => {
            toast.success("Background changed");
        }
    });

    return {
        updateTaskGroupBackground: updateTaskGroupBackgroundMutation.mutate
    }
}