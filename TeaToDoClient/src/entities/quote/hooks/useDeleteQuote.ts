import { useMutation } from "@tanstack/react-query";
import { quoteApi, type QuoteReponce } from "../api/quote-api";
import { queryClient } from "@/app/providers/queryClient";
import { taskGroupApi, type TaskGroupTasksResponce } from "@/entities/task-group/api/task-group-api";
import type { AxiosResponse } from "axios";
import type { ErrorResponse } from "@/shared/api/api";
import { toast } from "react-toastify";

export const useDeleteQuote = (selectedId: string) => {
    const deleeteQuoteMutation = useMutation({
        mutationFn: quoteApi.deleteQuote,
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: [taskGroupApi.baseKey, "tasks", selectedId] });
        },
        onSuccess: (_, quoteId) => {
            const notes: AxiosResponse<TaskGroupTasksResponce> = queryClient.getQueryData([taskGroupApi.baseKey, "tasks", selectedId])!;

            if (notes) {
                queryClient.setQueryData(
                    [taskGroupApi.baseKey, "tasks", selectedId],
                    () => {
                        const newData = notes.data.filter(item => (item as QuoteReponce).quote_id !== quoteId).reverse()

                        return { ...notes, data: newData };
                    }
                );
            }
        },
        onError: (error) => {
            const data = (error as ErrorResponse).response.data;

            toast.error(data.message);
        }
    });

    return {
        deleteQuote: deleeteQuoteMutation.mutate
    }
}