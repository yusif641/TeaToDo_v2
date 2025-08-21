import { useMutation } from "@tanstack/react-query";
import { tasksApi } from "../api/tasks-api";
import type { ErrorResponse, ValidationErrorResponce } from "@/shared/api/api";
import { toast } from "react-toastify";
import { taskGroupApi } from "@/entities/task-group/api/task-group-api";
import { queryClient } from "@/app/providers/queryClient";

export const useCreateTask = (taskGroupId: string) => {
    const createTaskMutation = useMutation({
        mutationKey: [tasksApi.baseKey, "create"],
        mutationFn: tasksApi.createTask,
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
        createTask: createTaskMutation.mutate
    }
}