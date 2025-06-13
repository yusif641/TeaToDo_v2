import { Router } from "express";
import taskGroupController from "../controllers/taskGroupController";
import { authMiddleware } from "../utils/middlewares/authMiddleware";
import fileMiddleware from "../utils/middlewares/multerMiddleware";
import { validate } from "../utils/middlewares/validateMiddleware";
import { CreateTaskGroupSchema, TaskGroupIconSchema, TaskGroupNameSchema } from "../utils/validation/taskGroupValidation";

const taskGroupesRouter = Router();

taskGroupesRouter.get("/taskGroups", authMiddleware, taskGroupController.getTaskGroups);
taskGroupesRouter.get("/taskGroups/tasks/:id", authMiddleware, taskGroupController.getTaskGroupTasks);
taskGroupesRouter.post("/taskGroups", authMiddleware, validate(CreateTaskGroupSchema), taskGroupController.createTaskGroup);
taskGroupesRouter.patch("/taskGroups/name/:id", authMiddleware, validate(TaskGroupNameSchema), taskGroupController.updateTaskGroupName);
taskGroupesRouter.patch("/taskGroups/icon/:id", authMiddleware, validate(TaskGroupIconSchema), taskGroupController.updateTaskGroupIcon);
taskGroupesRouter.patch("/taskGroups/background/:id", authMiddleware, fileMiddleware.single("background"), taskGroupController.setTaskGroupBackground);
taskGroupesRouter.delete("/taskGroups/background/:id", authMiddleware, taskGroupController.removeTaskGroupBackground);
taskGroupesRouter.delete("/taskGroups/:id", authMiddleware, taskGroupController.deleteTaskGroup)

export default taskGroupesRouter;