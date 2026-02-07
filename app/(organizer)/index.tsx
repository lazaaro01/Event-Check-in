import { MapPin, Plus, Users } from 'lucide-react-native';
import React from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, { FadeInRight } from 'react-native-reanimated';
import { colors } from '../../theme/colors';

const MOCK_EVENTS = [
    { id: '1', title: 'Tech Conference 2026', date: '15 Mai', location: 'São Paulo, SP', participants: 120, checkins: 45 },
    { id: '2', title: 'Workshop React Native', date: '22 Mai', location: 'Remoto', participants: 40, checkins: 0 },
    { id: '3', title: 'Developer Meetup', date: '01 Jun', location: 'Curitiba, PR', participants: 85, checkins: 0 },
];

export default function OrganizerEvents() {
    const renderItem = ({ item, index }: { item: typeof MOCK_EVENTS[0], index: number }) => (
        <Animated.View entering={FadeInRight.delay(index * 100).duration(500)}>
            <TouchableOpacity style={styles.eventCard}>
                <View style={styles.eventHeader}>
                    <Text style={styles.eventTitle}>{item.title}</Text>
                    <View style={styles.dateBadge}>
                        <Text style={styles.dateText}>{item.date}</Text>
                    </View>
                </View>

                <View style={styles.infoRow}>
                    <MapPin size={16} color={colors.textMuted} />
                    <Text style={styles.infoText}>{item.location}</Text>
                </View>

                <View style={styles.statsContainer}>
                    <View style={styles.statItem}>
                        <Users size={16} color={colors.primary} />
                        <Text style={styles.statText}>{item.participants} Inscritos</Text>
                    </View>
                    <View style={styles.progressBar}>
                        <View style={[styles.progressFill, { width: `${(item.checkins / item.participants) * 100}%` }]} />
                    </View>
                    <Text style={styles.checkinText}>{item.checkins} check-ins</Text>
                </View>
            </TouchableOpacity>
        </Animated.View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View>
                    <Text style={styles.greeting}>Olá, Organizador</Text>
                    <Text style={styles.title}>Seus Eventos</Text>
                </View>
                <TouchableOpacity style={styles.addButton}>
                    <Plus size={24} color={colors.text} />
                </TouchableOpacity>
            </View>

            <FlatList
                data={MOCK_EVENTS}
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
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 24,
        marginBottom: 24,
    },
    greeting: {
        fontSize: 14,
        color: colors.textMuted,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: colors.text,
    },
    addButton: {
        width: 48,
        height: 48,
        backgroundColor: colors.primary,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
    listContent: {
        padding: 24,
    },
    eventCard: {
        backgroundColor: colors.surface,
        borderRadius: 20,
        padding: 20,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: colors.surfaceLight,
    },
    eventHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 12,
    },
    eventTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: colors.text,
        flex: 1,
        marginRight: 12,
    },
    dateBadge: {
        backgroundColor: colors.surfaceLight,
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 10,
    },
    dateText: {
        fontSize: 12,
        fontWeight: '600',
        color: colors.primaryLight,
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    infoText: {
        fontSize: 14,
        color: colors.textMuted,
        marginLeft: 8,
    },
    statsContainer: {
        marginTop: 8,
    },
    statItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    statText: {
        fontSize: 14,
        color: colors.text,
        marginLeft: 8,
        fontWeight: '500',
    },
    progressBar: {
        height: 6,
        backgroundColor: colors.surfaceLight,
        borderRadius: 3,
        width: '100%',
        marginBottom: 8,
    },
    progressFill: {
        height: '100%',
        backgroundColor: colors.primary,
        borderRadius: 3,
    },
    checkinText: {
        fontSize: 12,
        color: colors.textMuted,
        textAlign: 'right',
    },
});