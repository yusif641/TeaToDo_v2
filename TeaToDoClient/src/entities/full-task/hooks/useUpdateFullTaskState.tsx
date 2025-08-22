import { useMutation } from "@tanstack/react-query";
import { fullTaskApi, type FullTaskResponce } from "../api/fullTasksApi";
import { queryClient } from "@/app/providers/queryClient";
import type { AxiosResponse } from "axios";
import type { TaskGroupTasksResponce } from "@/entities/task-group";
import { taskGroupApi } from "@/entities/task-group/api/task-group-api";
import type { ErrorResponse, ValidationErrorResponce } from "@/shared/api/api";
import { toast } from "react-toastify";

export const useUpdateFullTaskState = (selectedId: string) => {
    const updateFullTaskStateMutations = useMutation({
        mutationKey: [fullTaskApi.baseKey, "state"],
        mutationFn: fullTaskApi.changeFullTaskState,
        onMutate: async (params) => {
            await queryClient.cancelQueries({ queryKey: [fullTaskApi.baseKey] });

            const previousNotes: AxiosResponse<TaskGroupTasksResponce> = queryClient.getQueryData([taskGroupApi.baseKey, "tasks", selectedId])!;

            queryClient.setQueryData(
                [taskGroupApi.baseKey, "tasks", selectedId],
                () => {
                    const newData = previousNotes.data?.map(note => {
                        return (note as FullTaskResponce).full_task_id === params.fullTaskId ? { ...note, state: params.state } : note;
                    });

                    return { ...previousNotes, data: newData };
                }
            );

            return { previousNotes }
        },
        onError: (error, _, context) => {
            queryClient.setQueryData([taskGroupApi.baseKey, "tasks", selectedId], context?.previousNotes);

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
        updateFullTaskState: updateFullTaskStateMutations.mutate
    }
}