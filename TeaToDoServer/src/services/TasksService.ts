import { prisma } from "../config/prismaClient";

class TasksService {
    async getTasks(taskGroupId: string) {
        const tasks = await prisma.tasks.findMany({
            where: {
                task_group_id: taskGroupId
            }
        });

        return tasks;
    }
};

export default new TasksService();