import $api from "@/shared/api/api";
import { QUOTE_ENDPOINT, QUOTE_TEXT_UPDATE_ENDPOINT } from "../config/constants";

export type QuoteReponce = {
    task_group_id: string;
    quote_id: string;
    text: string;
    created_at: Date;
}

export const quoteApi = {
    baseKey: "quote",
    createQuote: ({ taskGroupId, text }: { taskGroupId: string, text: string }) => {
        return $api.post(`${QUOTE_ENDPOINT}/${taskGroupId}`, { text });
    },
    deleteQuote: (quoteId: string) => {
        return $api.delete(`${QUOTE_ENDPOINT}/${quoteId}`);
    },
    updateQuoteText: ({ quoteId, text }: { quoteId: string, text: string }) => {
        return $api.patch(`${QUOTE_TEXT_UPDATE_ENDPOINT}/${quoteId}`, { text });
    }
}