import type { task_state } from "@prisma/client";
import { prisma } from "../config/prismaClient";
import { checkTaskGroup } from "../utils/helpers/checkTaskGroup";
import { checkFullTask } from "../utils/helpers/checkFullTask";

class FullTasksService {
    async getFullTasks(taskGroupId: string) {
        const fullTasks = await prisma.full_tasks.findMany({
            where: {
                task_group_id: taskGroupId
            }
        });

        return fullTasks;
    }

    async createFullTask(taskGroupId: string, name: string, text: string) {
        await checkTaskGroup(taskGroupId);

        const createdFullTask = await prisma.full_tasks.create({
            data: {
                task_group_id: taskGroupId,
                name,
                text
            }
        });

        return createdFullTask;
    }

    async updateFullTaskText(fullTaskId: string, text: string) {
        await checkFullTask(fullTaskId);

        const updatedFullTask = await prisma.full_tasks.update({
            where: {
                full_task_id: fullTaskId
            },
            data: {
                text
            }
        });

        return updatedFullTask;
    }

    async updateFullTaskName(fullTaskId: string, name: string) {
        await checkFullTask(fullTaskId);

        const updatedFullTask = await prisma.full_tasks.update({
            where: {
                full_task_id: fullTaskId
            },
            data: {
                name
            }
        });
 
        return updatedFullTask;
    }

    async updateFullTaskState(fullTaskId: string, state: task_state) {
        await checkFullTask(fullTaskId);

        const updatedFullTask = await prisma.full_tasks.update({
            where: {
                full_task_id: fullTaskId
            },
            data: {
                state
            }
        });

        return updatedFullTask;
    }

    async deleteFullTask(fullTaskId: string) {
        await checkFullTask(fullTaskId);

        const deletedFullTask = await prisma.full_tasks.delete({
            where: {
                full_task_id: fullTaskId
            }
        });

        return deletedFullTask;
    }
};

export default new FullTasksService();