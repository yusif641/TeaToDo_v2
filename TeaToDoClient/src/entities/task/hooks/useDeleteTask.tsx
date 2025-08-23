import { useMutation } from "@tanstack/react-query";
import { tasksApi, type TaskResponce } from "../api/tasks-api";
import { queryClient } from "@/app/providers/queryClient";
import { taskGroupApi, type TaskGroupTasksResponce } from "@/entities/task-group/api/task-group-api";
import type { AxiosResponse } from "axios";
import type { ErrorResponse } from "@/shared/api/api";
import { toast } from "react-toastify";

export const useDeleteTask = (selectedId: string) => {
    const deleteTaskMutation = useMutation({
        mutationFn: tasksApi.deleteaTask,
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: [taskGroupApi.baseKey, "tasks", selectedId] });
        },
        onMutate: async (taskId) => {
            await queryClient.cancelQueries({ queryKey: [tasksApi.baseKey] });

            const tasks: AxiosResponse<TaskGroupTasksResponce> = queryClient.getQueryData([taskGroupApi.baseKey, "tasks", selectedId])!;

            queryClient.setQueryData(
                [taskGroupApi.baseKey, "tasks", selectedId],
                () => {
                    const newData = tasks.data.filter(item => (item as TaskResponce).task_id !== taskId).reverse()

                    return { ...tasks, data: newData };
                }
            );

            return { tasks }
        },
        onError: (error) => {
            const data = (error as ErrorResponse).response.data;

            toast.error(data.message);
        }
    });

    return {
        deleteTask: deleteTaskMutation.mutate
    }
}