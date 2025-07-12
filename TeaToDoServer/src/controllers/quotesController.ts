import type { NextFunction, Request, Response } from "express";
import type { QuoteText } from "../utils/validation/quoteValidation";
import QuotesService from "../services/QuotesService";

const quotesController = {
    async createQuote(req: Request<{ taskGroupId: string }>, res: Response, next: NextFunction) {
        try {
            const taskGroupId = req.params.taskGroupId;
            const data: QuoteText = req.body;
            const quote = await QuotesService.createQuote(taskGroupId, data.text);

            res.status(201).json(quote);
        } catch (error) {
            next(error);
        }
    },

    async deleteQuote(req: Request<{ id: string }>, res: Response, next: NextFunction) {
        try {
            const quoteId = req.params.id;
            const deletedQuote = await QuotesService.deleteQuote(quoteId);

            res.status(200).json(deletedQuote);
        } catch (error) {
            next(error);
        }
    },

    async updateQuoteText(req: Request<{ id: string }>, res: Response, next: NextFunction) {
        try {
            const quoteId = req.params.id;
            const data: QuoteText = req.body;
            const updatedQuote = await QuotesService.updateQuoteText(quoteId, data.text);

            res.status(200).json(updatedQuote);
        } catch (error) {
            next(error);
        }
    }
};

export default quotesController;