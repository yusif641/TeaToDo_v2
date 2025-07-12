import type { NextFunction, Request, Response } from "express";
import type { CreateFullTask, FullTaskName, FullTaskState, FullTaskText } from "../utils/validation/fullTaskValidation";
import FullTasksService from "../services/FullTasksService";

const fullTasksController = {
    async createFullTask(req: Request<{ taskGroupId: string }>, res: Response, next: NextFunction) {
        try {
            const taskGroupId = req.params.taskGroupId;
            const data: CreateFullTask = req.body;
            const createdFullTask = await FullTasksService.createFullTask(taskGroupId, data.name, data.text);

            res.status(201).json(createdFullTask);
        } catch (error) {
            next(error);
        }
    },

    async updateFullTaskName(req: Request<{ id: string }>, res: Response, next: NextFunction) {
        try {
            const fullTaskId = req.params.id;
            const data: FullTaskName = req.body;
            const updatedFullTask = await FullTasksService.updateFullTaskName(fullTaskId, data.name);

            res.status(200).json(updatedFullTask);
        } catch (error) {
            next(error);
        }
    },

    async updateFullTaskText(req: Request<{ id: string }>, res: Response, next: NextFunction) {
        try {
            const fullTaskId = req.params.id;
            const data: FullTaskText = req.body;
            const updatedFullTask = await FullTasksService.updateFullTaskText(fullTaskId, data.text);

            res.status(200).json(updatedFullTask);
        } catch (error) {
            next(error);
        }
    },

    async updateFullTaskState(req: Request<{ id: string }>, res: Response, next: NextFunction) {
        try {
            const fullTaskId = req.params.id;
            const data: FullTaskState = req.body;
            const updatedFullTask = await FullTasksService.updateFullTaskState(fullTaskId, data.state);

            res.status(200).json(updatedFullTask);
        } catch (error) {
            next(error);
        }
    },

    async deleteFullTask(req: Request<{ id: string }>, res: Response, next: NextFunction) {
        try {
            const fullTaskId = req.params.id;
            const deletedFullTask = await FullTasksService.deleteFullTask(fullTaskId);

            res.status(200).json(deletedFullTask);
        } catch (error) {
            next(error);
        }
    }
};

export default fullTasksController;