import { useMutation } from "@tanstack/react-query";
import { quoteApi, type QuoteReponce } from "../api/quote-api";
import { queryClient } from "@/app/providers/queryClient";
import type { AxiosResponse } from "axios";
import type { TaskGroupTasksResponce } from "@/entities/task-group";
import { taskGroupApi } from "@/entities/task-group/api/task-group-api";
import type { ErrorResponse, ValidationErrorResponce } from "@/shared/api/api";
import { toast } from "react-toastify";

export const useUpdateQuoteText = (selectedId: string) => {
    const updateQuoteTextMutation = useMutation({
        mutationKey: [quoteApi.baseKey, "text"],
        mutationFn: quoteApi.updateQuoteText,
        onMutate: async (params) => {
            await queryClient.cancelQueries({ queryKey: [quoteApi.baseKey] });

            const previousNotes: AxiosResponse<TaskGroupTasksResponce> = queryClient.getQueryData([taskGroupApi.baseKey, "tasks", selectedId])!;

            queryClient.setQueryData(
                [taskGroupApi.baseKey, "tasks", selectedId],
                () => {
                    const newData = previousNotes.data?.map(quote => (quote as QuoteReponce).quote_id === params.quoteId ? { ...quote, text: params.text } : quote);

                    return { ...previousNotes, data: newData };
                }
            );

            return { previousNotes }
        },
        onError: (error, _, context) => {
            queryClient.setQueryData([taskGroupApi.baseKey, "tasks", selectedId], context?.previousNotes);

            const data = (error as ErrorResponse).response.data;

            if ((data.errors as ValidationErrorResponce).details) {
                toast.error((data.errors as ValidationErrorResponce).details[0].message);
            } else {
                toast.error(data.message);
            }
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: [taskGroupApi.baseKey, "tasks", selectedId] });
        }
    });

    return {
        updateQuoteText: updateQuoteTextMutation.mutate,
        isQuotePending: updateQuoteTextMutation.isPending
    }
}