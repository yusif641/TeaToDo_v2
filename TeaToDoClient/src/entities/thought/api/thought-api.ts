import $api from "@/shared/api/api";
import { THOUGHT_EMOJI_ENDPOINT, THOUGHT_ENDPOINT, THOUGHT_TEXT_ENDPOINT } from "../config/constants";

export type ThoughtResponce = {
    thought_id: string;
    emoji: string;
    text: string;
    created_at: Date;
    task_group_id: string;
}

export const thoughtApi = {
    baseKey: "thoughts",
    createThought: ({ taskGroupId, text, emoji }: { taskGroupId: string, text: string, emoji: string }) => {
        return $api.post<ThoughtResponce>(`${THOUGHT_ENDPOINT}/${taskGroupId}`, { text, emoji });
    },
    deleteThought: (thoughtId: string) => {
        return $api.delete(`${THOUGHT_ENDPOINT}/${thoughtId}`);
    },
    updateThoughtText: ({ thoughtId, text }: { thoughtId: string, text: string }) => {
        return $api.patch(`${THOUGHT_TEXT_ENDPOINT}/${thoughtId}`, { text });
    },
    updateThoughtIcon: ({ thoughtId, emoji }: { thoughtId: string, emoji: string }) => {
        return $api.patch(`${THOUGHT_EMOJI_ENDPOINT}/${thoughtId}`, { emoji });
    }
}