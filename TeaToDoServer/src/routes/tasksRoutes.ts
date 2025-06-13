import { Router } from "express";
import tasksController from "../controllers/tasksController";
import { authMiddleware } from "../utils/middlewares/authMiddleware";
import { validate } from "../utils/middlewares/validateMiddleware";
import { TaskStateSchema, TaskTextSchema } from "../utils/validation/taskValidation";

const taskRouter = Router();

taskRouter.post("/tasks/:taskGroupId", authMiddleware, validate(TaskTextSchema), tasksController.createTask);
taskRouter.patch("/tasks/text/:id", authMiddleware, validate(TaskTextSchema), tasksController.updateTaskText);
taskRouter.patch("/tasks/state/:id", authMiddleware, validate(TaskStateSchema), tasksController.updateTaskState);
taskRouter.delete("/tasks/:id", authMiddleware, tasksController.deleteTask);

export default taskRouter;