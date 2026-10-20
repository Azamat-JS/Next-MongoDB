
import { create } from "zustand";

type User = {
    id: string;
    name: string;
    email: string;
};

type AuthState = {
    user: User | null;
    token: string | null;
    isLoading: boolean;
    error: string | null;

    clearError: () => void;

    register: (
        name: string,
        email: string,
        password: string
    ) => Promise<boolean>;

    login: (
        email: string,
        password: string
    ) => Promise<boolean>;

    fetchUser: () => Promise<void>;
    logout: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    token: null,
    isLoading: false,
    error: null,

    clearError: () => set({ error: null }),

    register: async (name, email, password) => {
        set({ isLoading: true, error: null });

        try {
            const response = await fetch("/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                set({
                    error: data.message || "Registration failed",
                });
                return false;
            }

            localStorage.setItem("token", data.token);

            set({
                user: data.user,
                token: data.token,
                error: null,
            });

            return true;
        } catch {
            set({ error: "Unable to connect. Please try again." });
            return false;
        } finally {
            set({ isLoading: false });
        }
    },

    login: async (email, password) => {
        set({ isLoading: true, error: null });

        try {
            const response = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                set({
                    error: data.message || "Login failed",
                });
                return false;
            }

            localStorage.setItem("token", data.token);

            set({
                user: data.user,
                token: data.token,
                error: null,
            });

            return true;
        } catch {
            set({ error: "Unable to connect. Please try again." });
            return false;
        } finally {
            set({ isLoading: false });
        }
    },

    fetchUser: async () => {
        const token = localStorage.getItem("token");

        if (!token) {
            set({ user: null, token: null });
            return;
        }

        set({ isLoading: true, token, error: null });

        try {
            const response = await fetch("/api/auth/me", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                if (response.status === 401) {
                    localStorage.removeItem("token");
                    set({ user: null, token: null });
                }

                return;
            }

            const data = await response.json();

            set({
                user: data.user,
                token,
            });
        } catch {

            set({ user: null, token });
        } finally {
            set({ isLoading: false });
        }
    },

    logout: () => {
        localStorage.removeItem("token");
        set({
            user: null,
            token: null,
            error: null,
        });
    },
}));
