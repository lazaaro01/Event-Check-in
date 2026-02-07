import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface OfflineCheckin {
    participantId: string;
    eventId: string;
    timestamp: string;
}

interface OfflineState {
    pendingCheckins: OfflineCheckin[];
    addCheckin: (checkin: OfflineCheckin) => void;
    syncCheckins: () => Promise<void>;
    clearCheckins: () => void;
}

export const useOfflineStore = create<OfflineState>()(
    persist(
        (set, get) => ({
            pendingCheckins: [],

            addCheckin: (checkin) => {
                set((state) => ({
                    pendingCheckins: [...state.pendingCheckins, checkin],
                }));
            },
            syncCheckins: async () => {
                const { pendingCheckins } = get();
                if (pendingCheckins.length === 0) return;
                console.log('Synchronizing check-ins...', pendingCheckins);
                await new Promise(resolve => setTimeout(resolve, 2000));

                set({ pendingCheckins: [] });
            },

            clearCheckins: () => set({ pendingCheckins: [] }),
        }),
        {
            name: 'offline-checkins',
            storage: createJSONStorage(() => AsyncStorage),
        }
    )
);