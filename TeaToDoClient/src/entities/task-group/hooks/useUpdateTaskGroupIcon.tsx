import { useMutation } from "@tanstack/react-query";
import { taskGroupApi, type TaskGroupResponce } from "../api/task-group-api";
import { queryClient } from "@/app/providers/queryClient";
import type { AxiosResponse } from "axios";
import type { ErrorResponse, ValidationErrorResponce } from "@/shared/api/api";
import { toast } from "react-toastify";

export const useUpdateTaskGroupIcon = () => {
    const updateTaskGroupIconMutations = useMutation({
        mutationKey: [taskGroupApi.baseKey, "icon"],
        mutationFn: taskGroupApi.updateTaskGroupIcon,
        onMutate: async (params) => {
            await queryClient.cancelQueries({ queryKey: [taskGroupApi.baseKey] });

            const previosTaskGroups: AxiosResponse<TaskGroupResponce[]> = queryClient.getQueryData([taskGroupApi.baseKey])!;

            queryClient.setQueryData(
                [taskGroupApi.baseKey],
                () => previosTaskGroups.data?.map(taskGroup => taskGroup.task_group_id === params.taskGroupId ? { ...taskGroup, icon: params.icon } : taskGroup)
            );

            return { previosTaskGroups }
        },
        onError: (error, _, context) => {
            queryClient.setQueryData([taskGroupApi.baseKey], context?.previosTaskGroups);

            const data = (error as ErrorResponse).response.data;

            if ((data.errors as ValidationErrorResponce).details) {
                toast.error((data.errors as ValidationErrorResponce).details[0].message);
            } else {
                toast.error(data.message);
            }
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: [taskGroupApi.baseKey] });
        },
        onSuccess: () => {
            toast.success("Task Group Icon Updated");
        }
    });

    return {
        updateTaskGroupIcon: updateTaskGroupIconMutations.mutate
    }
}