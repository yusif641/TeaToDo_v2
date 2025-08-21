import { tasksApi, type TaskResponce, type TaskState } from "./api/tasks-api";
import { useCreateTask } from "./hooks/useCreateTask";
import { useDeleteTask } from "./hooks/useDeleteTask";
import { useUpdateTaskState } from "./hooks/useUpdateTaskState";
import { useUpdateTaskText } from "./hooks/useUpdateTaskText";
import Task from "./ui/task-ui";

export { Task, tasksApi, type TaskResponce, type TaskState, useDeleteTask, useUpdateTaskState, useUpdateTaskText, useCreateTask };