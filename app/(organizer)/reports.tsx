import { colors } from '@/theme/colors';
import { BarChart3, CheckCircle2, Users } from 'lucide-react-native';
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

export default function ReportsScreen() {
    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.content}>
            <Text style={styles.title}>Relatórios</Text>

            <View style={styles.grid}>
                <View style={styles.statCard}>
                    <Users size={24} color={colors.primary} />
                    <Text style={styles.statValue}>245</Text>
                    <Text style={styles.statLabel}>Total Inscritos</Text>
                </View>

                <View style={styles.statCard}>
                    <CheckCircle2 size={24} color={colors.success} />
                    <Text style={styles.statValue}>182</Text>
                    <Text style={styles.statLabel}>Check-ins</Text>
                </View>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Performance</Text>
                <View style={styles.chartPlaceholder}>
                    <BarChart3 size={48} color={colors.surfaceLight} />
                    <Text style={styles.placeholderText}>Gráficos serão exibidos aqui</Text>
                </View>
            </View>
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
        paddingTop: 60,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: colors.text,
        marginBottom: 24,
    },
    grid: {
        flexDirection: 'row',
        gap: 16,
        marginBottom: 24,
    },
    statCard: {
        flex: 1,
        backgroundColor: colors.surface,
        padding: 20,
        borderRadius: 24,
        borderWidth: 1,
        borderColor: colors.surfaceLight,
    },
    statValue: {
        fontSize: 24,
        fontWeight: 'bold',
        color: colors.text,
        marginVertical: 8,
    },
    statLabel: {
        fontSize: 12,
        color: colors.textMuted,
        fontWeight: '500',
    },
    section: {
        marginTop: 12,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: colors.text,
        marginBottom: 16,
    },
    chartPlaceholder: {
        height: 200,
        backgroundColor: colors.surface,
        borderRadius: 24,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: colors.surfaceLight,
        borderStyle: 'dashed',
    },
    placeholderText: {
        color: colors.textMuted,
        marginTop: 12,
        fontSize: 14,
    },
});