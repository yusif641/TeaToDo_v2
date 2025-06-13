import { prisma } from "../config/prismaClient";

class FullTasksService {
    async getFullTasks(taskGroupId: string) {
        const fullTasks = await prisma.full_tasks.findMany({
            where: {
                task_group_id: taskGroupId
            }
        });

        return fullTasks;
    }
};

export default new FullTasksService();