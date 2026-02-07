import { Stack, useRouter, useSegments } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useAuthStore } from '../store/useAuthStore';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    const { isAuthenticated, user, isLoading, checkSession } = useAuthStore();
    const segments = useSegments();
    const router = useRouter();

    useEffect(() => {
        checkSession();
    }, []);

    useEffect(() => {
        if (isLoading) return;

        const inAuthGroup = segments[0] === '(auth)';

        if (!isAuthenticated && !inAuthGroup) {
            router.replace('/(auth)/login');
        } else if (isAuthenticated && inAuthGroup) {
            if (user?.role === 'organizer') {
                router.replace('/(organizer)');
            } else {
                router.replace('/(participant)');
            }
        }

        SplashScreen.hideAsync();
    }, [isAuthenticated, isLoading, segments, user]);

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <StatusBar style="light" />
            <Stack
                screenOptions={{
                    headerShown: false,
                    contentStyle: { backgroundColor: '#0F172A' },
                    animation: 'fade',
                }}
            >
                <Stack.Screen name="(auth)" options={{ headerShown: false }} />
                <Stack.Screen name="(organizer)" options={{ headerShown: false }} />
                <Stack.Screen name="(participant)" options={{ headerShown: false }} />
            </Stack>
        </GestureHandlerRootView>
    );
}