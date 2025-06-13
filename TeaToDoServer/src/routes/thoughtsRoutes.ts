import { Router } from "express";
import thoughtControllers from "../controllers/thoughtsController";
import { authMiddleware } from "../utils/middlewares/authMiddleware";
import { validate } from "../utils/middlewares/validateMiddleware";
import { CreateThoughtSchema, ThoughtEmojiSchema, ThoughtTextSchema } from "../utils/validation/thoughtsValidation";

const thoughtsRouter = Router();

thoughtsRouter.post("/thoughts/:taskGroupId", authMiddleware, validate(CreateThoughtSchema), thoughtControllers.createThought);
thoughtsRouter.patch("/thoughts/emoji/:id", authMiddleware, validate(ThoughtEmojiSchema), thoughtControllers.updateThoughtEmoji);
thoughtsRouter.patch("/thoughts/text/:id", authMiddleware, validate(ThoughtTextSchema), thoughtControllers.updateThoughtText);
thoughtsRouter.delete("/thoughts/:id", authMiddleware, thoughtControllers.deleteThought);

export default thoughtsRouter;