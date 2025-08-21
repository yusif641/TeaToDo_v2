import { z } from "zod";

export const TaskTextSchema = z.object({
    text: z.string()
        .nonempty("Task text can't be empty")
        .min(1, "Task text must be at least 1 character long"),
});

export const TaskStateSchema = z.object({
    state: z.enum(["completed", "inProgress", "marked"])
});

export type TaskText = z.infer<typeof TaskTextSchema>;
export type TaskState = z.infer<typeof TaskStateSchema>;