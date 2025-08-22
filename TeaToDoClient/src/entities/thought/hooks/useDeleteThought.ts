import { useMutation } from "@tanstack/react-query";
import { thoughtApi, type ThoughtResponce } from "../api/thought-api";
import { queryClient } from "@/app/providers/queryClient";
import { taskGroupApi, type TaskGroupTasksResponce } from "@/entities/task-group/api/task-group-api";
import type { AxiosResponse } from "axios";
import type { ErrorResponse } from "@/shared/api/api";
import { toast } from "react-toastify";

export const useDeleteThought = (selectedId: string) => {
    const deleteThoughtMutation = useMutation({
        mutationFn: thoughtApi.deleteThought,
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: [taskGroupApi.baseKey, "tasks", selectedId] });
        },
        onSuccess: (_, thoughtId) => {
            const notes: AxiosResponse<TaskGroupTasksResponce> = queryClient.getQueryData([taskGroupApi.baseKey, "tasks", selectedId])!;

            if (notes) {
                queryClient.setQueryData(
                    [taskGroupApi.baseKey, "tasks", selectedId],
                    () => {
                        const newData = notes.data.filter(item => (item as ThoughtResponce).thought_id !== thoughtId).reverse()
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
        deleteThought: deleteThoughtMutation.mutate
    }
}