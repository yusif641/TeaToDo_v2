import $api from "@/shared/api/api";
import { FULL_TASK_ENDPOINT, FULL_TASK_NAME_ENDPOINT, FULL_TASK_STATE_ENDPOINT, FULL_TASK_TEXT_ENDPOINT } from "../config/constants";

export type FullTaskState = "inProgress" | "completed" | "marked";

export type FullTaskResponce = {
    task_group_id: string;
    name: string;
    text: string;
    created_at: Date;
    full_task_id: string;
    state: FullTaskState;
}

export const fullTaskApi = {
    baseKey: "fulLTask",
    createFullTask: ({ taskGroupId, name, text }: { taskGroupId: string, name: string, text: string }) => {
        return $api.post<FullTaskResponce>(`${FULL_TASK_ENDPOINT}/${taskGroupId}`, { name, text });
    },
    deleteFullTask: (fullTaskId: string) => {
        return $api.delete<FullTaskResponce>(`${FULL_TASK_ENDPOINT}/${fullTaskId}`);
    },
    changeFullTaskState: ({ fullTaskId, state }: { fullTaskId: string, state: FullTaskState }) => {
        return $api.patch<FullTaskResponce>(`${FULL_TASK_STATE_ENDPOINT}/${fullTaskId}`, { state });
    },
    updateFullTaskName: ({ fullTaskId, name }: { fullTaskId: string, name: string }) => {
        return $api.patch<FullTaskResponce>(`${FULL_TASK_NAME_ENDPOINT}/${fullTaskId}`, { name });
    },
    updateFullTaskText: ({ fullTaskId, text }: { fullTaskId: string, text: string }) => {
        return $api.patch<FullTaskResponce>(`${FULL_TASK_TEXT_ENDPOINT}/${fullTaskId}`, { text });
    }
}