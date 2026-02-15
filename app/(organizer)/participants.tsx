import { Input } from '@/components/ui/Input';
import { colors } from '@/theme/colors';
import { FlashList } from '@shopify/flash-list';
import { Search, UserX } from 'lucide-react-native';
import React, { useMemo, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';

const MOCK_PARTICIPANTS = [
    { id: '1', name: 'João Silva', email: 'joao@example.com', status: 'checked' },
    { id: '2', name: 'Maria Santos', email: 'maria@example.com', status: 'pending' },
    { id: '3', name: 'Pedro Costa', email: 'pedro@example.com', status: 'pending' },
    { id: '4', name: 'Ana Oliveira', email: 'ana@example.com', status: 'checked' },
    { id: '5', name: 'Carlos Souza', email: 'carlos@example.com', status: 'pending' },
    { id: '6', name: 'Beatriz Lima', email: 'beatriz@example.com', status: 'checked' },
];

export default function ParticipantsScreen() {
    const [searchQuery, setSearchQuery] = useState('');

    const filteredParticipants = useMemo(() => {
        return MOCK_PARTICIPANTS.filter(p =>
            p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.email.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [searchQuery]);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Participantes</Text>
                <Input
                    placeholder="Buscar participante..."
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                    icon={<Search size={20} color={colors.textMuted} />}
                />
                <Text style={styles.stats}>
                    {filteredParticipants.length} de {MOCK_PARTICIPANTS.length} participantes
                </Text>
            </View>

            <FlashList
                data={filteredParticipants}
                keyExtractor={item => item.id}
                estimatedItemSize={80}
                contentContainerStyle={styles.listContent}
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <UserX size={48} color={colors.textMuted} />
                        <Text style={styles.emptyText}>Nenhum participante encontrado</Text>
                    </View>
                }
                renderItem={({ item, index }) => (
                    <Animated.View
                        entering={FadeInDown.delay(index * 50).duration(500).springify()}
                        style={styles.card}
                    >
                        <View style={styles.info}>
                            <View style={styles.avatar}>
                                <Text style={styles.avatarText}>
                                    {item.name.charAt(0).toUpperCase()}
                                </Text>
                            </View>
                            <View>
                                <Text style={styles.name}>{item.name}</Text>
                                <Text style={styles.email}>{item.email}</Text>
                            </View>
                        </View>
                        <View style={[styles.badge, item.status === 'checked' ? styles.badgeChecked : styles.badgePending]}>
                            <Text style={[styles.badgeText, item.status === 'checked' ? styles.badgeTextChecked : styles.badgeTextPending]}>
                                {item.status === 'checked' ? 'Presente' : 'Pendente'}
                            </Text>
                        </View>
                    </Animated.View>
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
    stats: {
        fontSize: 14,
        color: colors.textMuted,
        marginBottom: 16,
        marginLeft: 4,
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
    info: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: colors.surfaceLight,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    avatarText: {
        color: colors.primary,
        fontWeight: 'bold',
        fontSize: 16,
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
    emptyContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 60,
    },
    emptyText: {
        color: colors.textMuted,
        marginTop: 16,
        fontSize: 16,
    },
});