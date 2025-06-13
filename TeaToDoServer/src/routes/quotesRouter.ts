import { Router } from "express";
import quotesController from "../controllers/quotesController";
import { authMiddleware } from "../utils/middlewares/authMiddleware";
import { validate } from "../utils/middlewares/validateMiddleware";
import { QuoteTextSchema } from "../utils/validation/quoteValidation";

const quotesRouter = Router();

quotesRouter.post("/quotes/:taskGroupId", authMiddleware, validate(QuoteTextSchema), quotesController.createQuote);
quotesRouter.patch("/quotes/text/:id", authMiddleware, validate(QuoteTextSchema), quotesController.updateQuoteText);
quotesRouter.delete("/quotes/:id", authMiddleware, quotesController.deleteQuote);

export default quotesRouter;