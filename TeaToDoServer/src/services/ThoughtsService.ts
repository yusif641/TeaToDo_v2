import { prisma } from "../config/prismaClient";
import { checkTaskGroup } from "../utils/helpers/checkTaskGroup";
import { checkThought } from "../utils/helpers/checkThought";

class ThoughtsService {
    async getToughts(taskGroupId: string) {
        const thoughts = await prisma.thoughts.findMany({
            where: {
                task_group_id: taskGroupId
            }
        });

        return thoughts;
    }

    async createThought(taskGroupId: string, emoji: string, text: string) {
        await checkTaskGroup(taskGroupId);

        const createdThought = await prisma.thoughts.create({
            data: {
                task_group_id: taskGroupId,
                emoji,
                text
            }
        });

        return createdThought;
    }

    async updateThoughtText(thoughtId: string, text: string) {
        await checkThought(thoughtId);

        const updatedThought = await prisma.thoughts.update({
            where: {
                thought_id: thoughtId
            },
            data: {
                text
            }
        });

        return updatedThought;
    }

    async updateThoughtEmoji(thoughtId: string, emoji: string) {
        await checkThought(thoughtId);

        const updatedThought = await prisma.thoughts.update({
            where: {
                thought_id: thoughtId
            },
            data: {
                emoji
            }
        });

        return updatedThought;
    }

    async deleteThought(thoughtId: string) {
        await checkThought(thoughtId);

        const deletedThought = await prisma.thoughts.delete({
            where: {
                thought_id: thoughtId
            }
        });

        return deletedThought;
    }
};

export default new ThoughtsService();