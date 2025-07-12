import { prisma } from "../../config/prismaClient";
import ApiError from "../exceptions/ApiError";

export const checkTaskGroup = async (taskGroupId: string) => {
    const taskGroup = await prisma.task_groups.findUnique({
        where: { task_group_id: taskGroupId }
    });

    if (!taskGroup) throw ApiError.NotFound("Couldn't find such taskgroup");
}