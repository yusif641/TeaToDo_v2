import $api from "@/shared/api/api";
import { TASK_GROUP_BACKGROUND_ENDPOINT, TASK_GROUP_ENDPOINT, TASK_GROUP_ICON_UPDATE_ENDPOINT, TASK_GROUP_NAME_UPDATE_ENDPOINT, TASK_GROUP_TASKS_ENDPOINT } from "../config/constants";
import type { AxiosResponse } from "axios";

type TaskStateEnum = "inProgress" | "completed" | "marked";

export type TaskGroupResponce = {
    icon: string | null;
    name: string;
    task_group_id: string;
    background_url: string | null;
};

type TaskGroupTasksResponce = ({
    task_group_id: string;
    quote_id: string;
    text: string;
    created_at: Date;
} | {
    task_group_id: string;
    text: string;
    created_at: Date;
    task_id: string;
    state: TaskStateEnum;
} | {
    task_group_id: string;
    name: string;
    text: string;
    created_at: Date;
    full_task_id: string;
    state: TaskStateEnum;
} | {
    thought_id: string;
    emoji: string;
    text: string;
    created_at: Date;
    task_group_id: string;
})[]

export const taskGroupApi = {
    baseKey: "taskGroup",
    getTaskGroups: () => {
        return $api.get<TaskGroupResponce[]>(TASK_GROUP_ENDPOINT);
    },
    getTaskGroupById: (taskGroupId: string) => {
        return $api.get<TaskGroupResponce>(`${TASK_GROUP_ENDPOINT}/${taskGroupId}`);
    },
    getTaskGroupTasks: (taskGroupId: string) => {
        return $api.get<TaskGroupTasksResponce>(`${TASK_GROUP_TASKS_ENDPOINT}/${taskGroupId}`);
    },
    createTaskGroup: ({ icon, name }: { icon: string, name: string }) => {
        return $api.post<TaskGroupResponce>(TASK_GROUP_ENDPOINT, { icon, name });
    },
    updateTaskGroupName: ({ taskGroupId, name }: { taskGroupId: string, name: string }) => {
        return $api.patch(`${TASK_GROUP_NAME_UPDATE_ENDPOINT}/${taskGroupId}`, { name });
    },
    updateTaskGroupIcon: ({ taskGroupId, icon }: { taskGroupId: string, icon: string }) => {
        return $api.patch(`${TASK_GROUP_ICON_UPDATE_ENDPOINT}/${taskGroupId}`, { icon });
    },
    deleteTaskGroup: (taskGroupId: string) => {
        return $api.delete(`${TASK_GROUP_ENDPOINT}/${taskGroupId}`)
    },
    updateTaskGroupBackground: ({ formData, taskGroupId }: { formData: FormData, taskGroupId: string }): Promise<AxiosResponse<TaskGroupResponce>> => {
        return $api.patch(`${TASK_GROUP_BACKGROUND_ENDPOINT}/${taskGroupId}`, formData);
    },
    removeTaskGroupBackground: (taskGroupId: string) => {
        return $api.delete(`${TASK_GROUP_BACKGROUND_ENDPOINT}/${taskGroupId}`);
    }
}