import { useMutation } from "@tanstack/react-query";
import { fullTaskApi } from "../api/fullTasksApi";
import type { ErrorResponse, ValidationErrorResponce } from "@/shared/api/api";
import { toast } from "react-toastify";
import { queryClient } from "@/app/providers/queryClient";
import { taskGroupApi } from "@/entities/task-group/api/task-group-api";

export const useCreateFullTask = (taskGroupId: string) => {
    const createFullTaskMutation = useMutation({
        mutationKey: [fullTaskApi.baseKey, "create"],
        mutationFn: fullTaskApi.createFullTask,
        onError: (error) => {
            const data = (error as ErrorResponse).response.data;

            if ((data.errors as ValidationErrorResponce).details) {
                toast.error((data.errors as ValidationErrorResponce).details[0].message);
            } else {
                toast.error(data.message);
            }
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: [taskGroupApi.baseKey, "tasks", taskGroupId] });
        }
    });

    return {
        createFullTask: createFullTaskMutation.mutate
    }
}