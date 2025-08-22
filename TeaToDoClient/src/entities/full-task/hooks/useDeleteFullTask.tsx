import { useMutation } from "@tanstack/react-query";
import { fullTaskApi, type FullTaskResponce } from "../api/fullTasksApi";
import { queryClient } from "@/app/providers/queryClient";
import { taskGroupApi, type TaskGroupTasksResponce } from "@/entities/task-group/api/task-group-api";
import type { AxiosResponse } from "axios";
import type { ErrorResponse } from "@/shared/api/api";
import { toast } from "react-toastify";

export const useDeleteFullTask = (selectedId: string) => {
    const deleteFullTaskMutation = useMutation({
        mutationFn: fullTaskApi.deleteFullTask,
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: [taskGroupApi.baseKey, "tasks", selectedId] });
        },
        onSuccess: (_, fullTaskId) => {
            const notes: AxiosResponse<TaskGroupTasksResponce> = queryClient.getQueryData([taskGroupApi.baseKey, "tasks", selectedId])!;

            if (notes) {
                queryClient.setQueryData(
                    [taskGroupApi.baseKey, "tasks", selectedId],
                    () => {
                        const newData = notes.data.filter(item => (item as FullTaskResponce).full_task_id !== fullTaskId).reverse()
                        notes.data = newData;

                        return notes;
                    }
                );
            }
        },
        onError: (error) => {
            const data = (error as ErrorResponse).response.data;

            toast.error(data.message);
        }
    });

    return {
        deleteFullTask: deleteFullTaskMutation.mutate
    }
};