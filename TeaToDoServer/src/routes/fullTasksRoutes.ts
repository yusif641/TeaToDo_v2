import { Router } from "express";
import { authMiddleware } from "../utils/middlewares/authMiddleware";
import fullTasksController from "../controllers/fullTasksController";
import { validate } from "../utils/middlewares/validateMiddleware";
import { CreateFullTaskSchema, FullTaskNameSchema, FullTaskStateSchema, FullTaskTextSchema } from "../utils/validation/fullTaskValidation";

const fullTasksRouter = Router();

fullTasksRouter.post("/fullTask/:taskGroupId", authMiddleware, validate(CreateFullTaskSchema), fullTasksController.createFullTask);
fullTasksRouter.patch("/fullTask/text/:id", authMiddleware, validate(FullTaskTextSchema), fullTasksController.updateFullTaskText);
fullTasksRouter.patch("/fullTask/name/:id", authMiddleware, validate(FullTaskNameSchema), fullTasksController.updateFullTaskName);
fullTasksRouter.patch("/fullTask/state/:id", authMiddleware, validate(FullTaskStateSchema), fullTasksController.updateFullTaskState);
fullTasksRouter.delete("/fullTask/:id", authMiddleware, fullTasksController.deleteFullTask);

export default fullTasksRouter;