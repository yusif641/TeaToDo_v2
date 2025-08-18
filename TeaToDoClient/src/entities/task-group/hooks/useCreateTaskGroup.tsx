import { useMutation } from "@tanstack/react-query";
import { taskGroupApi } from "../api/task-group-api";
import type { ErrorResponse, ValidationErrorResponce } from "@/shared/api/api";
import { toast } from "react-toastify";
import { queryClient } from "@/app/providers/queryClient";

export const useCreateTaskGroup = () => {
    const createTaskGroupMutation = useMutation({
        mutationKey: [taskGroupApi.baseKey, "create"],
        mutationFn: taskGroupApi.createTaskGroup,
        onError: (error) => {
            const data = (error as ErrorResponse).response.data;

            if ((data.errors as ValidationErrorResponce).details) {
                toast.error((data.errors as ValidationErrorResponce).details[0].message);
            } else {
                toast.error(data.message);
            }
        },
        onSuccess: () => {
            toast.success("Task Group Created");
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: [taskGroupApi.baseKey] });
        }
    });

    return {
        createTaskGroup: createTaskGroupMutation
    }
}