import { prisma } from "../config/prismaClient";
import ApiError from "../utils/exceptions/ApiError";
import { checkTaskGroup } from "../utils/helpers/checkTaskGroup";

class QuotesService {
    async getQuotes(taskGroupId: string) {
        const quotes = await prisma.quotes.findMany({
            where: {
                task_group_id: taskGroupId
            }
        });

        return quotes;
    }

    async createQuote(taskGroupId: string, text: string) {
        await checkTaskGroup(taskGroupId);

        const createdTaskGroup = await prisma.quotes.create({
            data: {
                text,
                task_group_id: taskGroupId
            }
        });

        return createdTaskGroup;
    }

    async updateQuoteText(quoteId: string, text: string) {
        const quote = await prisma.quotes.findUnique({ where: { quote_id: quoteId } });
        if (!quote) throw ApiError.NotFound("Couldn't find quote with that id");

        const updatedQuote = await prisma.quotes.update({
            where: {
                quote_id: quoteId
            },
            data: {
                text
            }
        });

        return updatedQuote;
    }

    async deleteQuote(quoteId: string) {
        const quote = await prisma.quotes.findUnique({ where: { quote_id: quoteId } });
        if (!quote) throw ApiError.NotFound("Couldn't find quote with that id");

        const deletedQuote = await prisma.quotes.delete({
            where: {
                quote_id: quoteId
            }
        });

        return deletedQuote;
    }
};

export default new QuotesService();