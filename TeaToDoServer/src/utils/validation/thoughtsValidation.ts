import { z } from "zod";

export const CreateThoughtSchema = z.object({
    emoji: z.string(),
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
    emoji: z.string()
});

export type ThoughtText = z.infer<typeof ThoughtTextSchema>;
export type ThoughtEmoji = z.infer<typeof ThoughtEmojiSchema>;
export type CreateThought = z.infer<typeof CreateThoughtSchema>;