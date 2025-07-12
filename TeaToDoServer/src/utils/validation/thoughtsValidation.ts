import { z } from "zod";

export const CreateThoughtSchema = z.object({
    emoji: z.string().length(1, "icon should be only 1 symbol"),
    text: z.string()
        .nonempty("Thought text can't be empty")
        .min(2, "Thought text must be at least 2 characters long")
});

export const ThoughtTextSchema = z.object({
    text: z.string()
        .nonempty("Thought text can't be empty")
        .min(2, "Thought text must be at least 2 characters long"),
});

export const ThoughtEmojiSchema = z.object({
    emoji: z.string().length(1, "icon should be only 1 symbol")
});

export type ThoughtText = z.infer<typeof ThoughtTextSchema>;
export type ThoughtEmoji = z.infer<typeof ThoughtEmojiSchema>;
export type CreateThought = z.infer<typeof CreateThoughtSchema>;