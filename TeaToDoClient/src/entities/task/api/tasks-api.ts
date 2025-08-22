import $api from "@/shared/api/api"
import { TASK_ENDPOINT, TASK_STATE_ENDPOINT, TASK_TEXT_ENDPOINT } from "../config/constants"

export type TaskState = "inProgress" | "completed" | "marked";

export type TaskResponce = {
    task_group_id: string;
    created_at: Date;
    text: string;
    task_id: string;
    state: TaskState;
}

export const tasksApi = {
    baseKey: "tasks",
    createTask: ({ taskGroupId, text }: { taskGroupId: string, text: string }) => {
        return $api.post<TaskResponce>(`${TASK_ENDPOINT}/${taskGroupId}`, { text })
    },
    deleteaTask: (taskId: string) => {
        return $api.delete<TaskResponce>(`${TASK_ENDPOINT}/${taskId}`);
    },
    changeTaskState: ({ taskId, state }: { taskId: string, state: TaskState }) => {
        return $api.patch<TaskResponce>(`${TASK_STATE_ENDPOINT}/${taskId}`, { state });
    },
    changeTaskText: ({ taskId, text }: { taskId: string, text: string }) => {
        return $api.patch<TaskResponce>(`${TASK_TEXT_ENDPOINT}/${taskId}`, { text });
    },
}