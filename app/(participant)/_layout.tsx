import { colors } from '@/theme/colors';
import { Tabs } from 'expo-router';
import { Compass, Ticket, User } from 'lucide-react-native';
import React from 'react';

export default function ParticipantLayout() {
    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: colors.surface,
                    borderTopWidth: 0,
                    height: 70,
                    paddingBottom: 12,
                    paddingTop: 8,
                },
                tabBarActiveTintColor: colors.primary,
                tabBarInactiveTintColor: colors.textMuted,
                tabBarLabelStyle: {
                    fontSize: 12,
                    fontWeight: '500',
                },
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Explorar',
                    tabBarIcon: ({ color, size }) => <Compass size={size} color={color} />,
                }}
            />
            <Tabs.Screen
                name="my-events"
                options={{
                    title: 'Meus Ingressos',
                    tabBarIcon: ({ color, size }) => <Ticket size={size} color={color} />,
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: 'Perfil',
                    tabBarIcon: ({ color, size }) => <User size={size} color={color} />,
                }}
            />
        </Tabs>
    );
}