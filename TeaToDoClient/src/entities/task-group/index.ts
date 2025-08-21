import { type TaskGroupResponce, type TaskGroupTasksResponce } from "./api/task-group-api";
import { useTaskGroups } from "./hooks/useTaskGroups";
import { useTaskGroupTasks } from "./hooks/useTaskGroupTasks";
import { useSelectedTaskGroup } from "./hooks/useSelectedTaskGroup";
import { useRemoveBackground } from "./hooks/useRemoveBackground";
import { useDeleteTaskGroup } from "./hooks/useDeleteTaskGroup";
import { useUpdateTaskGroupIcon } from "./hooks/useUpdateTaskGroupIcon";
import { useUpdateTaskGroupName } from "./hooks/useUpdateTaskGroupName";
import { useTaskGroupBackground } from "./hooks/useTaskGroupBackground";
import { useCreateTaskGroup } from "./hooks/useCreateTaskGroup";
import { useTaskGroupStore } from "./models/task-group-store";
import TaskGroup from "./ui/task-group-ui";

export { 
    TaskGroup, 
    useTaskGroups, 
    useTaskGroupStore, 
    useTaskGroupTasks, 
    type TaskGroupResponce, 
    useSelectedTaskGroup,
    useRemoveBackground,
    useTaskGroupBackground,
    useCreateTaskGroup,
    useDeleteTaskGroup,
    useUpdateTaskGroupIcon,
    useUpdateTaskGroupName,
    type TaskGroupTasksResponce
};