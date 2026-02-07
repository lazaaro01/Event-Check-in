import { Calendar, MapPin, QrCode } from 'lucide-react-native';
import React from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, { FadeInLeft } from 'react-native-reanimated';
import { colors } from '../../theme/colors';

const MOCK_TICKETS = [
    {
        id: '1',
        title: 'Tech Conference 2026',
        date: '15 Mai 2026',
        location: 'São Paulo, SP',
        status: 'checked',
        checkedAt: '15 Mai, 09:12'
    },
    {
        id: '2',
        title: 'Design Masterclass',
        date: '10 Jun 2026',
        location: 'Rio de Janeiro, RJ',
        status: 'pending'
    },
];

export default function MyEventsScreen() {
    const renderItem = ({ item, index }: { item: typeof MOCK_TICKETS[0], index: number }) => (
        <Animated.View entering={FadeInLeft.delay(index * 100).duration(500)}>
            <TouchableOpacity style={styles.ticketCard}>
                <View style={styles.ticketInfo}>
                    <Text style={styles.eventTitle}>{item.title}</Text>

                    <View style={styles.detailRow}>
                        <Calendar size={14} color={colors.textMuted} />
                        <Text style={styles.detailText}>{item.date}</Text>
                    </View>

                    <View style={styles.detailRow}>
                        <MapPin size={14} color={colors.textMuted} />
                        <Text style={styles.detailText}>{item.location}</Text>
                    </View>

                    <View style={[styles.statusBadge, item.status === 'checked' ? styles.statusChecked : styles.statusPending]}>
                        <Text style={[styles.statusText, item.status === 'checked' ? styles.statusTextChecked : styles.statusTextPending]}>
                            {item.status === 'checked' ? `Checked-in: ${item.checkedAt}` : 'Ingresso Válido'}
                        </Text>
                    </View>
                </View>

                <View style={styles.qrSide}>
                    <View style={styles.qrContainer}>
                        <QrCode size={32} color={colors.primary} />
                    </View>
                    <Text style={styles.qrLabel}>Ver QR</Text>
                </View>
            </TouchableOpacity>
        </Animated.View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Meus Ingressos</Text>
                <Text style={styles.subtitle}>Você tem {MOCK_TICKETS.length} eventos confirmados</Text>
            </View>

            <FlatList
                data={MOCK_TICKETS}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
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
        marginBottom: 24,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: colors.text,
        marginBottom: 4,
    },
    subtitle: {
        fontSize: 14,
        color: colors.textMuted,
    },
    listContent: {
        padding: 24,
    },
    ticketCard: {
        backgroundColor: colors.surface,
        borderRadius: 24,
        flexDirection: 'row',
        marginBottom: 16,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: colors.surfaceLight,
    },
    ticketInfo: {
        flex: 1,
        padding: 20,
    },
    eventTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: colors.text,
        marginBottom: 12,
    },
    detailRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 6,
    },
    detailText: {
        fontSize: 13,
        color: colors.textMuted,
        marginLeft: 8,
    },
    statusBadge: {
        marginTop: 12,
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 8,
        alignSelf: 'flex-start',
    },
    statusPending: {
        backgroundColor: 'rgba(99, 102, 241, 0.1)',
    },
    statusChecked: {
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
    },
    statusText: {
        fontSize: 11,
        fontWeight: '700',
        textTransform: 'uppercase',
    },
    statusTextPending: {
        color: colors.primary,
    },
    statusTextChecked: {
        color: colors.success,
    },
    qrSide: {
        width: 100,
        backgroundColor: colors.surfaceLight,
        justifyContent: 'center',
        alignItems: 'center',
        borderLeftWidth: 1,
        borderLeftColor: 'rgba(255,255,255,0.05)',
        borderStyle: 'dashed',
    },
    qrContainer: {
        width: 60,
        height: 60,
        backgroundColor: colors.background,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
    },
    qrLabel: {
        fontSize: 12,
        color: colors.primaryLight,
        fontWeight: 'bold',
    },
});