import { unlinkSync } from "fs";
import { prisma } from "../config/prismaClient";
import ApiError from "../utils/exceptions/ApiError";
import TaskGroupDto from "../utils/dtos/TaskGroupDto";
import QuotesService from "./QuotesService";
import TasksService from "./TasksService";
import FullTasksService from "./FullTasksService";
import ThoughtsService from "./ThoughtsService";
import type { full_tasks, quotes, tasks, thoughts } from "@prisma/client";
import { checkTaskGroup } from "../utils/helpers/checkTaskGroup";

class TaskGroupService {
    async getTaskGroups(userId: string) {
        const taskGroups = await prisma.task_groups.findMany({
            where: {
                user_id: userId
            },
            select: {
                task_group_id: true,
                name: true,
                icon: true,
                background_url: true
            }
        });

        return taskGroups;
    }

    async getTaskGroupTasks(taskGroupId: string) {
        await checkTaskGroup(taskGroupId);

        let result: (quotes | tasks | full_tasks | thoughts)[] = [];

        await Promise.all([
            QuotesService.getQuotes(taskGroupId),
            TasksService.getTasks(taskGroupId),
            FullTasksService.getFullTasks(taskGroupId),
            ThoughtsService.getToughts(taskGroupId)
        ]).then(([quotes, tasks, fullTasks, thoughts]) => {
            result = [...quotes, ...tasks, ...fullTasks, ...thoughts].sort((a, b) => {
                const dateA = a.created_at.getTime();
                const dateB = b.created_at.getTime();

                return dateA - dateB;
            });
        });

        return result;
    }

    async createTaskGroup(userId: string, name: string, icon: string) { 
        const taskGroup = await prisma.task_groups.create({
            data: {
                name: name,
                icon: icon,
                user_id: userId
            }
        });

        const data = new TaskGroupDto(taskGroup);

        return data;
    }

    async changeTaskGroupName(taskGroupId: string, name: string) {
        await checkTaskGroup(taskGroupId);

        const updatedTaskGroup = await prisma.task_groups.update({
            where: {
                task_group_id: taskGroupId
            },
            data: {
                name
            }
        });

        const data = new TaskGroupDto(updatedTaskGroup);

        return data;
    }

    async changeTaskGroupIcon(taskGroupId: string, icon: string) {
        await checkTaskGroup(taskGroupId);

        const updatedTaskGroup = await prisma.task_groups.update({
            where: {
                task_group_id: taskGroupId
            },
            data: {
                icon
            }
        });

        const data = new TaskGroupDto(updatedTaskGroup);

        return data;
    }

    async changeTaskGroupBackground(taskGroupId: string, taskGroupImage: string) {
        await checkTaskGroup(taskGroupId);

        const updatedTaskGroup = await prisma.task_groups.update({
            where: {
                task_group_id: taskGroupId
            },
            data: {
                background_url: taskGroupImage
            }
        });

        const data = new TaskGroupDto(updatedTaskGroup);

        return data;
    }

    async removeTaskGroupBackground(taskGroupId: string) {
        const taskGroup = await prisma.task_groups.findUnique({
            where: { task_group_id: taskGroupId }
        });

        if (!taskGroup) throw ApiError.NotFound("Couldn't find such taskgroup");
        if (!taskGroup.background_url) throw ApiError.BadRequest("Task group has no background");

        unlinkSync(taskGroup.background_url);

        await prisma.task_groups.delete({
            where: {
                task_group_id: taskGroupId
            }
        });
    }

    async removeTaskGroup(taskGroupId: string) {
        await checkTaskGroup(taskGroupId);

        const deletedTaskGroup = await prisma.task_groups.delete({
            where: {
                task_group_id: taskGroupId
            }
        });

        const data = new TaskGroupDto(deletedTaskGroup);

        return data;
    }
}

export default new TaskGroupService();