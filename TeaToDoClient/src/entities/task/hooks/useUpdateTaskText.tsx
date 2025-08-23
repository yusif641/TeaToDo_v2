import { useMutation } from "@tanstack/react-query";
import { tasksApi, type TaskResponce } from "../api/tasks-api";
import { queryClient } from "@/app/providers/queryClient";
import { taskGroupApi, type TaskGroupTasksResponce } from "@/entities/task-group/api/task-group-api";
import type { AxiosResponse } from "axios";
import type { ErrorResponse, ValidationErrorResponce } from "@/shared/api/api";
import { toast } from "react-toastify";

export const useUpdateTaskText = (selectedId: string) => {
    const updateTaskTextMutations = useMutation({
        mutationKey: [tasksApi.baseKey, "text"],
        mutationFn: tasksApi.changeTaskText,
        onMutate: async (params) => {
            await queryClient.cancelQueries({ queryKey: [tasksApi.baseKey] });

            const previousTasks: AxiosResponse<TaskGroupTasksResponce> = queryClient.getQueryData([taskGroupApi.baseKey, "tasks", selectedId])!;

            queryClient.setQueryData(
                [taskGroupApi.baseKey, "tasks", selectedId],
                () => {
                    const newData = previousTasks.data?.map(task => (task as TaskResponce).task_id === params.taskId ? { ...task, text: params.text } : task);

                    return { ...previousTasks, data: newData };
                }
            );

            return { previousTasks }
        },
        onError: (error, _, context) => {
            queryClient.setQueryData([taskGroupApi.baseKey, "tasks", selectedId], context?.previousTasks);

            const data = (error as ErrorResponse).response.data;

            if ((data.errors as ValidationErrorResponce).details) {
                toast.error((data.errors as ValidationErrorResponce).details[0].message);
            } else {
                toast.error(data.message);
            }
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: [taskGroupApi.baseKey, "tasks", selectedId] });
        }
    });

    return {
        updateTaskText: updateTaskTextMutations.mutate
    }
}