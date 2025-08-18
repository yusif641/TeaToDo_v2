import { useMutation } from "@tanstack/react-query";
import { taskGroupApi, type TaskGroupResponce } from "../api/task-group-api";
import { queryClient } from "@/app/providers/queryClient";
import type { AxiosResponse } from "axios";
import { toast } from "react-toastify";
import type { ErrorResponse, ValidationErrorResponce } from "@/shared/api/api";

export const useDeleteTaskGroup = () => {
    const deleteTaskGroupMutation = useMutation({
        mutationFn: taskGroupApi.deleteTaskGroup,
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: [taskGroupApi.baseKey] });
        },
        onSuccess: (_, taskGroupId) => {
            const taskGroups: AxiosResponse<TaskGroupResponce[]> = queryClient.getQueryData([taskGroupApi.baseKey])!;

            if (taskGroups) {
                queryClient.setQueryData(
                    [taskGroupApi.baseKey],
                    taskGroups.data.filter(item => item.task_group_id !== taskGroupId).reverse()
                );

                toast.success("Task Group Deleted");
            }
        },
        onError: (error) => {
            const data = (error as ErrorResponse).response.data;

            if ((data.errors as ValidationErrorResponce).details) {
                toast.error((data.errors as ValidationErrorResponce).details[0].message);
            } else {
                toast.error(data.message);
            }
        }
    });

    return {
        deleteTaskGroup: deleteTaskGroupMutation.mutate
    }
}