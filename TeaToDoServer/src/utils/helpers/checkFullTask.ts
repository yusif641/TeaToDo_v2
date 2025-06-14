import { prisma } from "../../config/prismaClient";
import ApiError from "../exceptions/ApiError";

export const checkFullTask = async (fullTaskId: string) => {
    const fullTask = await prisma.full_tasks.findUnique({ where: { full_task_id: fullTaskId } });
    if (!fullTask) throw ApiError.NotFound("Couldn't find full task with that id");
}