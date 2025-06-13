import { prisma } from "../config/prismaClient";

class QuotesService {
    async getQuotes(taskGroupId: string) {
        const quotes = await prisma.quotes.findMany({
            where: {
                task_group_id: taskGroupId
            }
        });

        return quotes;
    }
};

export default new QuotesService();