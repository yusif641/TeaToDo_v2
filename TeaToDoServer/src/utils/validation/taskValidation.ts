import { z } from "zod";

export const TaskTextSchema = z.object({
    text: z.string()
        .nonempty("Task text can't be empty")
        .min(2, "Task text must be at least 2 characters long"),
});

export const TaskStateSchema = z.object({
    state: z.enum(["completed", "inProgress", "marked"])
});

export type TaskText = z.infer<typeof TaskTextSchema>;
export type TaskState = z.infer<typeof TaskStateSchema>;