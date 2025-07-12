import type { NextFunction, Request, Response } from "express";
import type { CreateThought, ThoughtEmoji, ThoughtText } from "../utils/validation/thoughtsValidation";
import ThoughtsService from "../services/ThoughtsService";

const thoughtControllers = {
    async createThought(req: Request<{ taskGroupId: string }>, res: Response, next: NextFunction) {
        try {
            const taskGroupId = req.params.taskGroupId;
            const data: CreateThought = req.body;
            const createdThought = await ThoughtsService.createThought(taskGroupId, data.emoji, data.text);

            res.status(201).json(createdThought);
        } catch (error) {
            next(error);
        }
    },

    async updateThoughtText(req: Request<{ id: string }>, res: Response, next: NextFunction) {
        try {
            const thoughtId = req.params.id;
            const data: ThoughtText = req.body;
            const updatedThought = await ThoughtsService.updateThoughtText(thoughtId, data.text);

            res.status(200).json(updatedThought);
        } catch (error) {
            next(error);
        }
    },

    async updateThoughtEmoji(req: Request<{ id: string }>, res: Response, next: NextFunction) {
        try {
            const thoughtId = req.params.id;
            const data: ThoughtEmoji = req.body;
            const updatedThought = await ThoughtsService.updateThoughtEmoji(thoughtId, data.emoji);

            res.status(200).json(updatedThought);
        } catch (error) {
            next(error);
        }
    },

    async deleteThought(req: Request<{ id: string }>, res: Response, next: NextFunction) {
        try {
            const thoughtId = req.params.id;
            const deletedThought = await ThoughtsService.deleteThought(thoughtId);

            res.status(200).json(deletedThought);
        } catch (error) {
            next(error);
        }
    }
};

export default thoughtControllers;