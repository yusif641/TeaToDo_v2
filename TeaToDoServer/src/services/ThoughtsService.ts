import { prisma } from "../config/prismaClient";

class ThoughtsService {
    async getToughts(taskGroupId: string) {
        const thoughts = await prisma.thoughts.findMany({
            where: {
                task_group_id: taskGroupId
            }
        });

        return thoughts;
    }
};

export default new ThoughtsService();