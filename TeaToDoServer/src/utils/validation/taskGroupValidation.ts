import { z } from "zod";

export const CreateTaskGroupSchema = z.object({
    icon: z.string().length(1, "icon should be only 1 symbol"),
    name: z.string()
        .nonempty("Name is required")
        .min(2, "Name should be at least 2 characters")
        .max(64, "Name can'r be longer than 64 characters")
});

export const TaskGroupNameSchema = z.object({
    name: z.string()
        .nonempty("Name is required")
        .min(2, "Name should be at least 2 characters")
        .max(64, "Name can'r be longer than 64 characters")
});

export const TaskGroupIconSchema = z.object({
    icon: z.string().length(1, "icon should be only 1 symbol")
});

export type CreateTaskGroup = z.infer<typeof CreateTaskGroupSchema>;
export type TaskGroupName = z.infer<typeof TaskGroupNameSchema>;
export type TaskGroupIcon = z.infer<typeof TaskGroupIconSchema>;