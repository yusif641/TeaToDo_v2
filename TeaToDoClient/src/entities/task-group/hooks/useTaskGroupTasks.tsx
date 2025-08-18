import { useQuery } from "@tanstack/react-query";
import { taskGroupApi } from "../api/task-group-api";

export const useTaskGroupTasks = (enabled: boolean, taskGroupId: string) => {
    const { data, isSuccess, refetch } = useQuery({
        queryKey: [taskGroupApi.baseKey, "tasks", taskGroupId],
        queryFn: () => taskGroupApi.getTaskGroupTasks(taskGroupId),
        select: data => data.data,
        enabled
    });

    return {
        tasksData: data,
        tasksIsSuccess: isSuccess,
        refetchTasks: refetch
    }
}