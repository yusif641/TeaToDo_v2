import type { task_state } from "@prisma/client";
import { prisma } from "../config/prismaClient";
import { checkTaskGroup } from "../utils/helpers/checkTaskGroup";
import { checkTask } from "../utils/helpers/checkTask";

class TasksService {
    async getTasks(taskGroupId: string) {
        const tasks = await prisma.tasks.findMany({
            where: {
                task_group_id: taskGroupId
            }
        });

        return tasks;
    }

    async createTask(taskGroupId: string, text: string) {
        await checkTaskGroup(taskGroupId);

        const createdTask = await prisma.tasks.create({
            data: {
                task_group_id: taskGroupId,
                text
            }
        });

        return createdTask;
    }

    async deleteTask(taskId: string) {
        await checkTask(taskId);

        const deletedTask = await prisma.tasks.delete({
            where: {
                task_id: taskId
            }
        });

        return deletedTask;
    }

    async updateTaskText(taskId: string, text: string) {
        await checkTask(taskId);

        const updatedTask = await prisma.tasks.update({
            where: {
                task_id: taskId
            },
            data: {
                text
            }
        });

        return updatedTask;
    }

    async updateTaskState(taskId: string, state: task_state) {
        await checkTask(taskId);

        const updatedTask = await prisma.tasks.update({
            where: {
                task_id: taskId
            },
            data: {
                state
            }
        });

        return updatedTask;
    }
};

export default new TasksService();