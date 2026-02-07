import { Bell, Calendar, MapPin, Search } from 'lucide-react-native';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Input } from '../../components/ui/Input';
import { colors } from '../../theme/colors';

const CATEGORIES = ['Tudo', 'Tecnologia', 'Design', 'Negócios', 'Música'];

const FEATURED_EVENTS = [
    { id: '1', title: 'World Design Summit', date: '12 Ago', location: 'Virtual', image: 'https://images.unsplash.com/photo-1540575861501-7ad05823c28b?w=800' },
    { id: '2', title: 'AI Startup Night', date: '25 Set', location: 'São Paulo', image: 'https://images.unsplash.com/photo-1591115765373-520b7a424754?w=800' },
];

export default function ExplorerScreen() {
    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            <View style={styles.header}>
                <View style={styles.headerTop}>
                    <View>
                        <Text style={styles.greeting}>Descubra eventos</Text>
                        <Text style={styles.title}>Explore o Novo</Text>
                    </View>
                    <TouchableOpacity style={styles.iconButton}>
                        <Bell size={24} color={colors.text} />
                    </TouchableOpacity>
                </View>

                <Input
                    placeholder="Pesquisar eventos..."
                    icon={<Search size={20} color={colors.textMuted} />}
                    containerStyle={styles.searchBar}
                />
            </View>

            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categories}>
                {CATEGORIES.map((cat, i) => (
                    <TouchableOpacity key={cat} style={[styles.categoryBtn, i === 0 && styles.categoryBtnActive]}>
                        <Text style={[styles.categoryText, i === 0 && styles.categoryTextActive]}>{cat}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Em Destaque</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.featuredList}>
                    {FEATURED_EVENTS.map(event => (
                        <TouchableOpacity key={event.id} style={styles.featuredCard}>
                            <View style={styles.imagePlaceholder}>
                                <Calendar size={32} color={colors.surfaceLight} />
                            </View>
                            <View style={styles.cardInfo}>
                                <Text style={styles.cardTitle}>{event.title}</Text>
                                <View style={styles.cardDetail}>
                                    <MapPin size={12} color={colors.textMuted} />
                                    <Text style={styles.cardDetailText}>{event.location} • {event.date}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>
        </ScrollView>
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
    },
    headerTop: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 24,
    },
    greeting: {
        fontSize: 14,
        color: colors.textMuted,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: colors.text,
    },
    iconButton: {
        width: 48,
        height: 48,
        backgroundColor: colors.surface,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: colors.surfaceLight,
    },
    searchBar: {
        marginBottom: 8,
    },
    categories: {
        paddingLeft: 24,
        marginVertical: 16,
    },
    categoryBtn: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 12,
        backgroundColor: colors.surface,
        marginRight: 10,
        borderWidth: 1,
        borderColor: colors.surfaceLight,
    },
    categoryBtnActive: {
        backgroundColor: colors.primary,
        borderColor: colors.primary,
    },
    categoryText: {
        color: colors.textMuted,
        fontWeight: '600',
    },
    categoryTextActive: {
        color: colors.text,
    },
    section: {
        marginTop: 24,
        paddingLeft: 24,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: colors.text,
        marginBottom: 16,
    },
    featuredList: {
        marginBottom: 40,
    },
    featuredCard: {
        width: 280,
        backgroundColor: colors.surface,
        borderRadius: 24,
        marginRight: 16,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: colors.surfaceLight,
    },
    imagePlaceholder: {
        height: 150,
        backgroundColor: colors.surfaceLight,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cardInfo: {
        padding: 16,
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: colors.text,
        marginBottom: 8,
    },
    cardDetail: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    cardDetailText: {
        fontSize: 12,
        color: colors.textMuted,
        marginLeft: 4,
    },
});