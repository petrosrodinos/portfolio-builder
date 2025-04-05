import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import Cookies from 'js-cookie'
import { AuthUser } from "interfaces/auth";


interface UserStore {
    isLoggedIn: boolean;
    user: AuthUser;
    login(user: any): void;
    logout(): void;
}

const initialValues: UserStore = {
    isLoggedIn: false,
    user: null,
    login: () => { },
    logout: () => { },
};


const STORE_KEY = "auth";

const ACCESS_TOKEN = 'thisisjustarandomstring'


export const useAuthStore = create<UserStore>()(
    devtools(
        persist(
            (set) => ({
                ...initialValues,
                login: (user: AuthUser) => {
                    Cookies.set(ACCESS_TOKEN, JSON.stringify(user), { expires: 1 })

                    set((state) => ({ ...state, ...user, isLoggedIn: true }));
                },
                logout: () => {
                    set(initialValues);
                    Cookies.remove(ACCESS_TOKEN)
                },
            }),
            {
                name: STORE_KEY,
            }
        )
    )
);

export const getAuthStoreState = () => useAuthStore.getState();