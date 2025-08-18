import { useQuery } from "@tanstack/react-query"
import { taskGroupApi } from "../api/task-group-api";

export const useSelectedTaskGroup = (selectedTaskGroupId: string) => {
    const { data } = useQuery({
        queryKey: [taskGroupApi.baseKey, "selected", selectedTaskGroupId],
        queryFn: () => taskGroupApi.getTaskGroupById(selectedTaskGroupId),
        select: data => data.data,
    });

    return {
        selectedTaskGroup: data
    }
}