import { prisma } from "../../config/prismaClient";
import ApiError from "../exceptions/ApiError";

export const checkTask = async (taskId: string) => {
    const task = await prisma.tasks.findUnique({ where: { task_id: taskId } });
    if (!task) throw ApiError.NotFound("Couldn't find task with that id");
};