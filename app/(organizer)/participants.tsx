import { Search } from 'lucide-react-native';
import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { Input } from '../../components/ui/Input';
import { colors } from '../../theme/colors';

const MOCK_PARTICIPANTS = [
    { id: '1', name: 'João Silva', email: 'joao@example.com', status: 'checked' },
    { id: '2', name: 'Maria Santos', email: 'maria@example.com', status: 'pending' },
    { id: '3', name: 'Pedro Costa', email: 'pedro@example.com', status: 'pending' },
];

export default function ParticipantsScreen() {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Participantes</Text>
                <Input
                    placeholder="Buscar participante..."
                    icon={<Search size={20} color={colors.textMuted} />}
                />
            </View>

            <FlatList
                data={MOCK_PARTICIPANTS}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.listContent}
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <View>
                            <Text style={styles.name}>{item.name}</Text>
                            <Text style={styles.email}>{item.email}</Text>
                        </View>
                        <View style={[styles.badge, item.status === 'checked' ? styles.badgeChecked : styles.badgePending]}>
                            <Text style={[styles.badgeText, item.status === 'checked' ? styles.badgeTextChecked : styles.badgeTextPending]}>
                                {item.status === 'checked' ? 'Presente' : 'Pendente'}
                            </Text>
                        </View>
                    </View>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
        paddingTop: 60,
    },
    header: {
        paddingHorizontal: 24,
        marginBottom: 8,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: colors.text,
        marginBottom: 16,
    },
    listContent: {
        padding: 24,
    },
    card: {
        backgroundColor: colors.surface,
        padding: 16,
        borderRadius: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
        borderWidth: 1,
        borderColor: colors.surfaceLight,
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
        color: colors.text,
    },
    email: {
        fontSize: 14,
        color: colors.textMuted,
    },
    badge: {
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 8,
    },
    badgeChecked: {
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
    },
    badgePending: {
        backgroundColor: 'rgba(245, 158, 11, 0.1)',
    },
    badgeText: {
        fontSize: 12,
        fontWeight: 'bold',
    },
    badgeTextChecked: {
        color: colors.success,
    },
    badgeTextPending: {
        color: colors.warning,
    },
});