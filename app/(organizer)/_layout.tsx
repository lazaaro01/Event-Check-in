import { Tabs } from 'expo-router';
import { BarChart3, Calendar, Scan, Users } from 'lucide-react-native';
import React from 'react';
import { colors } from '../../theme/colors';

export default function OrganizerLayout() {
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
                    title: 'Eventos',
                    tabBarIcon: ({ color, size }) => <Calendar size={size} color={color} />,
                }}
            />
            <Tabs.Screen
                name="scanner"
                options={{
                    title: 'Scanner',
                    tabBarIcon: ({ color, size }) => <Scan size={size} color={color} />,
                }}
            />
            <Tabs.Screen
                name="participants"
                options={{
                    title: 'Participantes',
                    tabBarIcon: ({ color, size }) => <Users size={size} color={color} />,
                }}
            />
            <Tabs.Screen
                name="reports"
                options={{
                    title: 'Relatórios',
                    tabBarIcon: ({ color, size }) => <BarChart3 size={size} color={color} />,
                }}
            />
        </Tabs>
    );
}