import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { AuthUser } from "interfaces/auth";
import { TemplateTypes } from "@/constants/templates";
import { signOut } from "@/services/auth";
import { UserPreferences } from "@/interfaces/user";

interface UserStore extends AuthUser {
    login(user: any): void;
    logout(): void;
    updateUser(user: any): void;
}

export const defaultPreferences: UserPreferences = {
    portfolio_theme: TemplateTypes.default,
    dashboard_theme: "system",
};

const initialValues: UserStore = {
    isLoggedIn: false,
    isNewUser: true,
    user_id: null,
    email: null,
    access_token: null,
    expires_at: null,
    avatar: null,
    preferences: defaultPreferences,
    subscription: null,
    login: () => { },
    logout: () => { },
    updateUser: () => { },
};

const STORE_KEY = "auth";

export const useAuthStore = create<UserStore>()(
    devtools(
        persist(
            (set) => ({
                ...initialValues,
                login: (user: AuthUser) => {
                    set((state) => ({ ...state, ...user }));
                },
                logout: () => {
                    set(initialValues);
                    localStorage.removeItem(STORE_KEY);
                    signOut();
                    window.location.href = "/auth/sign-in";
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