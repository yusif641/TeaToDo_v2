import { useMutation } from "@tanstack/react-query";
import { quoteApi } from "../api/quote-api";
import type { ErrorResponse, ValidationErrorResponce } from "@/shared/api/api";
import { toast } from "react-toastify";
import { queryClient } from "@/app/providers/queryClient";
import { taskGroupApi } from "@/entities/task-group/api/task-group-api";

export const useCreateQuote = (taskGroupId: string) => {
    const createQuoteMutation = useMutation({
        mutationKey: [quoteApi.baseKey, "create"],
        mutationFn: quoteApi.createQuote,
        onError: (error) => {
            const data = (error as ErrorResponse).response.data;

            if ((data.errors as ValidationErrorResponce).details) {
                toast.error((data.errors as ValidationErrorResponce).details[0].message);
            } else {
                toast.error(data.message);
            }
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: [taskGroupApi.baseKey, "tasks", taskGroupId] });
        }
    });

    return {
        createQuote: createQuoteMutation.mutate
    }
}