import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import Cookies from 'js-cookie'
import { AuthUser } from "interfaces/auth";


interface UserStore extends AuthUser {
    isLoggedIn: boolean;
    isNewUser: boolean;
    login(user: any): void;
    logout(): void;
    updateUser(user: any): void;
}

const initialValues: UserStore = {
    isLoggedIn: false,
    isNewUser: false,
    user_id: null,
    email: null,
    access_token: null,
    expires_at: null,
    avatar: null,
    login: () => { },
    logout: () => { },
    updateUser: () => { },
};


const STORE_KEY = "auth";

const ACCESS_TOKEN = 'thisisjustarandomstring'

export const useAuthStore = create<UserStore>()(
    devtools(
        persist(
            (set) => ({
                ...initialValues,
                login: (user: AuthUser) => {
                    // Cookies.set(ACCESS_TOKEN, JSON.stringify(user), { expires: 1 })
                    set((state) => ({ ...state, ...user }));
                },
                logout: () => {
                    set(initialValues);
                    // Cookies.remove(ACCESS_TOKEN)
                },
                updateUser: async (user: Partial<AuthUser>) => {
                    set((state) => ({ ...state, ...user }));
                },
            }),
            {
                name: STORE_KEY,
            }
        )
    )
);

export const getAuthStoreState = () => useAuthStore.getState();