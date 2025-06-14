import { z } from "zod";

export const CreateFullTaskSchema = z.object({
    text: z.string()
        .nonempty("Full task text can't be empty")
        .min(2, "Full task text must be at least 2 characters long"),
    name: z.string()
        .nonempty("Name is required")
        .min(2, "Name should be at least 2 characters")
        .max(64, "Name can'r be longer than 64 characters")
});

export const FullTaskNameSchema = z.object({
    name: z.string()
        .nonempty("Name is required")
        .min(2, "Name should be at least 2 characters")
        .max(64, "Name can'r be longer than 64 characters")
});

export const FullTaskTextSchema = z.object({
    text: z.string()
        .nonempty("Full task text can't be empty")
        .min(2, "Full task text must be at least 2 characters long"),
});

export const FullTaskStateSchema = z.object({
    state: z.enum(["completed", "inProgress", "marked"])
});

export type FullTaskText = z.infer<typeof FullTaskTextSchema>;
export type FullTaskState = z.infer<typeof FullTaskStateSchema>;
export type CreateFullTask = z.infer<typeof CreateFullTaskSchema>;
export type FullTaskName = z.infer<typeof FullTaskNameSchema>;