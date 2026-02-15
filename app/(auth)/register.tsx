import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { colors } from '@/theme/colors';
import { useRouter } from 'expo-router';
import { ArrowLeft, Lock, Mail, User } from 'lucide-react-native';
import React, { useState } from 'react';
import {
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';

export default function RegisterScreen() {
    const router = useRouter();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleRegister = async () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            router.back();
        }, 1500);
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <Animated.View
                    entering={FadeInDown.duration(1000).springify()}
                    style={styles.header}
                >
                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={() => router.back()}
                    >
                        <ArrowLeft size={24} color={colors.text} />
                    </TouchableOpacity>
                    <Text style={styles.title}>Criar conta</Text>
                    <Text style={styles.subtitle}>Junte-se à nossa comunidade de eventos</Text>
                </Animated.View>

                <Animated.View
                    entering={FadeInUp.delay(200).duration(1000).springify()}
                    style={styles.form}
                >
                    <Input
                        label="Nome completo"
                        placeholder="Ex: João Silva"
                        value={name}
                        onChangeText={setName}
                        icon={<User size={20} color={colors.textMuted} />}
                    />

                    <Input
                        label="E-mail"
                        placeholder="seu@email.com"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        icon={<Mail size={20} color={colors.textMuted} />}
                    />

                    <Input
                        label="Senha"
                        placeholder="••••••••"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                        icon={<Lock size={20} color={colors.textMuted} />}
                    />

                    <Button
                        title="Criar conta"
                        onPress={handleRegister}
                        isLoading={loading}
                        style={styles.registerButton}
                    />

                    <View style={styles.footer}>
                        <Text style={styles.footerText}>Já tem uma conta? </Text>
                        <TouchableOpacity onPress={() => router.back()}>
                            <Text style={styles.loginText}>Entrar</Text>
                        </TouchableOpacity>
                    </View>
                </Animated.View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    scrollContent: {
        flexGrow: 1,
        padding: 24,
        paddingTop: 60,
    },
    header: {
        marginBottom: 40,
    },
    backButton: {
        width: 48,
        height: 48,
        backgroundColor: colors.surface,
        borderRadius: 14,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 32,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: colors.text,
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        color: colors.textMuted,
    },
    form: {
        width: '100%',
    },
    registerButton: {
        marginTop: 16,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 32,
    },
    footerText: {
        color: colors.textMuted,
        fontSize: 14,
    },
    loginText: {
        color: colors.primary,
        fontSize: 14,
        fontWeight: 'bold',
    },
});