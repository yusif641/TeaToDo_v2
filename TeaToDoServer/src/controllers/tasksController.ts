import type { NextFunction, Request, Response } from "express";
import type { TaskState, TaskText } from "../utils/validation/taskValidation";
import TasksService from "../services/TasksService";

const tasksController = {
    async createTask(req: Request<{ taskGroupId: string }>, res: Response, next: NextFunction) {
        try {
            const taskGroupId = req.params.taskGroupId;
            const data: TaskText = req.body;
            const createdTask = await TasksService.createTask(taskGroupId, data.text);

            res.status(201).json(createdTask);
        } catch (error) {
            next(error);
        }
    },

    async deleteTask(req: Request<{ id: string }>, res: Response, next: NextFunction) {
        try {
            const taskId = req.params.id;
            const deletedTask = await TasksService.deleteTask(taskId);

            res.status(200).json(deletedTask);
        } catch (error) {
            next(error);
        }
    },

    async updateTaskText(req: Request<{ id: string }>, res: Response, next: NextFunction) {
        try {
            const taskId = req.params.id;
            const data: TaskText = req.body;
            const updatedTask = await TasksService.updateTaskText(taskId, data.text);

            res.status(200).json(updatedTask);
        } catch (error) {
            next(error);
        }
    },

    async updateTaskState(req: Request<{ id: string }>, res: Response, next: NextFunction) {
        try {
            const taskId = req.params.id;
            const data: TaskState = req.body;
            const updatedTask = await TasksService.updateTaskState(taskId, data.state);

            res.status(200).json(updatedTask);
        } catch (error) {
            next(error);
        }
    } 
};

export default tasksController;