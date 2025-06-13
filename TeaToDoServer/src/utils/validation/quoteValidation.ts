import { z } from "zod";

export const QuoteTextSchema = z.object({
    text: z.string()
        .nonempty("Quote text can't be empty")
        .min(2, "Quote text must be at least 2 characters long"),
});

export type QuoteText = z.infer<typeof QuoteTextSchema>;