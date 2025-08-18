import { create } from "zustand"

interface ITaskGroupStore {
    selectedTaskGroupId: string | null,
    setSelectedTaskGroupId: (taskGroupId: string) => void,
    setSelectedToNull: () => void
};

export const useTaskGroupStore = create<ITaskGroupStore>((set) => ({
    selectedTaskGroupId: null,
    setSelectedTaskGroupId: (taskGroupId) => set(() => ({ selectedTaskGroupId: taskGroupId })),
    setSelectedToNull: () => set(() => ({ selectedTaskGroupId: null }))
}));