import * as SecureStore from 'expo-secure-store';
import { create } from 'zustand';

interface User {
    id: string;
    name: string;
    email: string;
    role: 'organizer' | 'participant';
}

interface AuthState {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (email: string, role: 'organizer' | 'participant') => Promise<void>;
    logout: () => Promise<void>;
    checkSession: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    token: null,
    isAuthenticated: false,
    isLoading: true,

    login: async (email, role) => {
        set({ isLoading: true });
        setTimeout(async () => {
            const mockUser: User = {
                id: Math.random().toString(36).substr(2, 9),
                name: email.split('@')[0],
                email,
                role,
            };
            const mockToken = 'mock-jwt-token';

            await SecureStore.setItemAsync('user_session', JSON.stringify({ user: mockUser, token: mockToken }));

            set({
                user: mockUser,
                token: mockToken,
                isAuthenticated: true,
                isLoading: false
            });
        }, 1500);
    },

    logout: async () => {
        await SecureStore.deleteItemAsync('user_session');
        set({ user: null, token: null, isAuthenticated: false });
    },

    checkSession: async () => {
        try {
            const session = await SecureStore.getItemAsync('user_session');
            if (session) {
                const { user, token } = JSON.parse(session);
                set({ user, token, isAuthenticated: true, isLoading: false });
            } else {
                set({ isLoading: false });
            }
        } catch (error) {
            set({ isLoading: false });
        }
    },
}));