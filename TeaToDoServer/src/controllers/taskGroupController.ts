import type { NextFunction, Request, Response } from "express";
import TaskGroupService from "../services/TaskGroupService";
import type { CreateTaskGroup, TaskGroupIcon, TaskGroupName } from "../utils/validation/taskGroupValidation";
import ApiError from "../utils/exceptions/ApiError";
import { PATHS } from "../config/constants";

const taskGroupController = {
    async getTaskGroups(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = req.user?.user_id!;
            const taskGroups = await TaskGroupService.getTaskGroups(userId);

            res.status(200).json(taskGroups);
        } catch (error) {
            next(error);
        }
    },

    async getTaskGroupTasks(req: Request<{ id: string }>, res: Response, next: NextFunction) {
        try {
            const taskGroupId = req.params.id;
            const data = await TaskGroupService.getTaskGroupTasks(taskGroupId);

            res.status(200).json(data);
        } catch (error) {
            next(error);
        }
    },

    async createTaskGroup(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = req.user?.user_id!;
            const data: CreateTaskGroup = req.body;
            const taskGroup = await TaskGroupService.createTaskGroup(userId, data.name, data.icon);

            res.status(201).json(taskGroup);
        } catch (error) {
            next(error);
        }
    },

    async updateTaskGroupName(req: Request<{ id: string }>, res: Response, next: NextFunction) {
        try {
            const taskGroupId = req.params.id;
            const data: TaskGroupName = req.body;
            const updatedTaskGroup = await TaskGroupService.changeTaskGroupName(taskGroupId, data.name);

            res.status(200).json(updatedTaskGroup);
        } catch (error) {
            next(error);
        }
    },

    async updateTaskGroupIcon(req: Request<{ id: string }>, res: Response, next: NextFunction) {
        try {
            const taskGroupId = req.params.id;
            const data: TaskGroupIcon = req.body;
            const updatedTaskGroup = await TaskGroupService.changeTaskGroupIcon(taskGroupId, data.icon);

            res.status(200).json(updatedTaskGroup);
        } catch (error) {
            next(error);
        }
    },

    async setTaskGroupBackground(req: Request<{ id: string }>, res: Response, next: NextFunction) {
        try {
            const file = req.file;

            if (!file) throw ApiError.BadRequest("File is required");

            const taskGroupId = req.params.id;
            const fileName = PATHS.IMAGE_PATHS + req.file?.filename;
            const taskGroup = await TaskGroupService.changeTaskGroupBackground(taskGroupId, fileName);

            res.status(200).json(taskGroup);
        } catch (error) {
            next(error);
        }
    },

    async removeTaskGroupBackground(req: Request<{ id: string }>, res: Response, next: NextFunction) {
        try {
            const taskGroupId = req.params.id;
            const taskGroup = await TaskGroupService.removeTaskGroupBackground(taskGroupId);

            res.status(200).json(taskGroup);
        } catch (error) {
            next(error);
        }
    },

    async deleteTaskGroup(req: Request<{ id: string }>, res: Response, next: NextFunction) {
        try {
            const taskGroupId = req.params.id;
            const deletedTaskGroup = await TaskGroupService.removeTaskGroup(taskGroupId);

            res.status(200).json(deletedTaskGroup);
        } catch (error) {
            next(error);
        }
    }
};

export default taskGroupController;