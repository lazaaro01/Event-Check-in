import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useAuthStore } from '@/store/useAuthStore';
import { colors } from '@/theme/colors';
import { useRouter } from 'expo-router';
import { CheckCircle2, Lock, Mail } from 'lucide-react-native';
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

export default function LoginScreen() {
    const router = useRouter();
    const login = useAuthStore((state) => state.login);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState<'organizer' | 'participant'>('participant');
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        if (!email || !password) return;
        setLoading(true);
        await login(email, role);
        setLoading(false);
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
                    <View style={styles.logoContainer}>
                        <CheckCircle2 size={40} color={colors.primary} />
                    </View>
                    <Text style={styles.title}>Bem-vindo de volta</Text>
                    <Text style={styles.subtitle}>Gerencie seus eventos com facilidade</Text>
                </Animated.View>

                <Animated.View
                    entering={FadeInUp.delay(200).duration(1000).springify()}
                    style={styles.form}
                >
                    <View style={styles.roleSelector}>
                        <TouchableOpacity
                            style={[styles.roleButton, role === 'participant' && styles.roleButtonActive]}
                            onPress={() => setRole('participant')}
                        >
                            <Text style={[styles.roleText, role === 'participant' && styles.roleTextActive]}>Participante</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.roleButton, role === 'organizer' && styles.roleButtonActive]}
                            onPress={() => setRole('organizer')}
                        >
                            <Text style={[styles.roleText, role === 'organizer' && styles.roleTextActive]}>Organizador</Text>
                        </TouchableOpacity>
                    </View>

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

                    <TouchableOpacity style={styles.forgotPassword}>
                        <Text style={styles.forgotPasswordText}>Esqueceu a senha?</Text>
                    </TouchableOpacity>

                    <Button
                        title="Entrar"
                        onPress={handleLogin}
                        isLoading={loading}
                        style={styles.loginButton}
                    />

                    <View style={styles.footer}>
                        <Text style={styles.footerText}>Não tem uma conta? </Text>
                        <TouchableOpacity onPress={() => router.push('/(auth)/register')}>
                            <Text style={styles.registerText}>Cadastre-se</Text>
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
        justifyContent: 'center',
    },
    header: {
        alignItems: 'center',
        marginBottom: 40,
    },
    logoContainer: {
        width: 80,
        height: 80,
        backgroundColor: colors.surface,
        borderRadius: 24,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 24,
        borderWidth: 1,
        borderColor: colors.surfaceLight,
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
        textAlign: 'center',
    },
    form: {
        width: '100%',
    },
    roleSelector: {
        flexDirection: 'row',
        backgroundColor: colors.surface,
        borderRadius: 16,
        padding: 6,
        marginBottom: 24,
    },
    roleButton: {
        flex: 1,
        height: 44,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 12,
    },
    roleButtonActive: {
        backgroundColor: colors.primary,
    },
    roleText: {
        fontSize: 14,
        fontWeight: '600',
        color: colors.textMuted,
    },
    roleTextActive: {
        color: colors.text,
    },
    forgotPassword: {
        alignSelf: 'flex-end',
        marginBottom: 24,
    },
    forgotPasswordText: {
        color: colors.primary,
        fontSize: 14,
        fontWeight: '500',
    },
    loginButton: {
        marginTop: 8,
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
    registerText: {
        color: colors.primary,
        fontSize: 14,
        fontWeight: 'bold',
    },
});