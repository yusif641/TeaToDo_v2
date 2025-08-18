import { create } from "zustand"

type TaskGroup = {
    name: string,
    icon: string,
    banner: string | null
}

interface ITaskGroupStore {
    selectedTaskGroupId: string | null,
    selectedTaskGrop: TaskGroup | null,
    setSelectedTaskGroupId: (taskGroupId: string | null) => void,
    setTaskGroup: (taskGroup: TaskGroup) => void,
    setSelectedToNull: () => void
};

export const useTaskGroupStore = create<ITaskGroupStore>((set) => ({
    selectedTaskGroupId: null,
    selectedTaskGrop: null,
    setTaskGroup: (taskGroup: TaskGroup) => set(() => ({selectedTaskGrop: taskGroup})),
    setSelectedTaskGroupId: (taskGroupId) => set(() => ({ selectedTaskGroupId: taskGroupId })),
    setSelectedToNull: () => set(() => ({ selectedTaskGroupId: null }))
}));