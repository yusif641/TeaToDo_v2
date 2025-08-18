import { useQuery } from "@tanstack/react-query";
import { taskGroupApi } from "../api/task-group-api";

export const useTaskGroups = () => {
    const { data, isPending } = useQuery({
        queryKey: [taskGroupApi.baseKey],
        queryFn: taskGroupApi.getTaskGroups,
        select: data => data.data
    });

    return {
        taskGroupsData: data,
        taskGroupsPending: isPending
    }
}