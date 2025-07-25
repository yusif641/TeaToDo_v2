import { create } from "zustand";

interface IAuthStore {
    isAuth: boolean,
    isActivated: boolean,
    setIsAuth: (bool: boolean) => void,
    setIsActivated: (bool: boolean) => void,
};

export const useAuthStore = create<IAuthStore>((set) => ({
    isAuth: false,
    isActivated: false,
    setIsAuth: (bool: boolean) => set(() => ({ isAuth: bool })),
    setIsActivated: (bool: boolean) => set(() => ({ isActivated: bool }))
}));