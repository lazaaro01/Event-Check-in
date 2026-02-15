import { useAuthStore } from '@/store/useAuthStore';
import { colors } from '@/theme/colors';
import { Bell, ChevronRight, HelpCircle, LogOut, Settings, Shield, User } from 'lucide-react-native';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function ProfileScreen() {
    const logout = useAuthStore(state => state.logout);
    const user = useAuthStore(state => state.user);

    const MENU_ITEMS = [
        { icon: <Bell size={20} color={colors.textMuted} />, label: 'Notificações' },
        { icon: <Shield size={20} color={colors.textMuted} />, label: 'Privacidade' },
        { icon: <Settings size={20} color={colors.textMuted} />, label: 'Configurações' },
        { icon: <HelpCircle size={20} color={colors.textMuted} />, label: 'Ajuda' },
    ];

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.content}>
            <View style={styles.header}>
                <View style={styles.avatarContainer}>
                    <User size={40} color={colors.primary} />
                </View>
                <Text style={styles.userName}>{user?.name || 'Usuário'}</Text>
                <Text style={styles.userEmail}>{user?.email || 'email@exemplo.com'}</Text>

                <TouchableOpacity style={styles.editBtn}>
                    <Text style={styles.editBtnText}>Editar Perfil</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.menuContainer}>
                {MENU_ITEMS.map((item, index) => (
                    <TouchableOpacity key={index} style={styles.menuItem}>
                        <View style={styles.menuLeft}>
                            <View style={styles.iconWrapper}>{item.icon}</View>
                            <Text style={styles.menuLabel}>{item.label}</Text>
                        </View>
                        <ChevronRight size={20} color={colors.textMuted} />
                    </TouchableOpacity>
                ))}

                <TouchableOpacity style={[styles.menuItem, styles.logoutItem]} onPress={logout}>
                    <View style={styles.menuLeft}>
                        <View style={[styles.iconWrapper, styles.logoutIconWrapper]}>
                            <LogOut size={20} color={colors.error} />
                        </View>
                        <Text style={[styles.menuLabel, styles.logoutLabel]}>Sair</Text>
                    </View>
                </TouchableOpacity>
            </View>

            <Text style={styles.version}>Versão 1.0.0</Text>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    content: {
        padding: 24,
        paddingTop: 80,
    },
    header: {
        alignItems: 'center',
        marginBottom: 40,
    },
    avatarContainer: {
        width: 100,
        height: 100,
        backgroundColor: colors.surface,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
        borderWidth: 2,
        borderColor: colors.primary,
    },
    userName: {
        fontSize: 24,
        fontWeight: 'bold',
        color: colors.text,
        marginBottom: 4,
    },
    userEmail: {
        fontSize: 14,
        color: colors.textMuted,
        marginBottom: 20,
    },
    editBtn: {
        backgroundColor: colors.surface,
        paddingHorizontal: 24,
        paddingVertical: 10,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: colors.surfaceLight,
    },
    editBtnText: {
        color: colors.text,
        fontWeight: '600',
        fontSize: 14,
    },
    menuContainer: {
        backgroundColor: colors.surface,
        borderRadius: 24,
        padding: 8,
        borderWidth: 1,
        borderColor: colors.surfaceLight,
    },
    menuItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        borderRadius: 16,
    },
    menuLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconWrapper: {
        width: 40,
        height: 40,
        backgroundColor: colors.surfaceLight,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    menuLabel: {
        fontSize: 16,
        color: colors.text,
        fontWeight: '500',
    },
    logoutItem: {
        marginTop: 8,
    },
    logoutIconWrapper: {
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
    },
    logoutLabel: {
        color: colors.error,
    },
    version: {
        textAlign: 'center',
        color: colors.textMuted,
        marginTop: 40,
        fontSize: 12,
    },
});