import { Button } from '@/components/ui/Button';
import { colors } from '@/theme/colors';
import { CameraView, useCameraPermissions } from 'expo-camera';
import * as Haptics from 'expo-haptics';
import { RefreshCw, Zap } from 'lucide-react-native';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, {
    Easing,
    useAnimatedStyle,
    useSharedValue,
    withRepeat,
    withTiming
} from 'react-native-reanimated';

export default function ScannerScreen() {
    const [permission, requestPermission] = useCameraPermissions();
    const [scanned, setScanned] = useState(false);
    const [torch, setTorch] = useState(false);

    const scanLinePosition = useSharedValue(0);

    useEffect(() => {
        requestPermission();
        scanLinePosition.value = withRepeat(
            withTiming(250, {
                duration: 2000,
                easing: Easing.inOut(Easing.ease)
            }),
            -1,
            true
        );
    }, []);

    const animatedLineStyle = useAnimatedStyle(() => ({
        transform: [{ translateY: scanLinePosition.value }],
    }));

    if (!permission) {
        return <View style={styles.container} />;
    }

    if (!permission.granted) {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>Precisamos de permissão para usar a câmera</Text>
                <Button title="Conceder Permissão" onPress={requestPermission} />
            </View>
        );
    }

    const handleBarcodeScanned = ({ type, data }: { type: string, data: string }) => {
        if (scanned) return;

        setScanned(true);
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        import('react-native').then(({ Alert }) => {
            Alert.alert(
                'Check-in Validado!',
                `Participante: João Silva\nID: ${data}`,
                [{ text: 'OK', onPress: () => setScanned(false) }]
            );
        });
    };

    return (
        <View style={styles.container}>
            <CameraView
                style={StyleSheet.absoluteFillObject}
                onBarcodeScanned={scanned ? undefined : handleBarcodeScanned}
                barcodeScannerSettings={{
                    barcodeTypes: ['qr'],
                }}
                enableTorch={torch}
            />

            <View style={styles.overlay}>
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>Validar Ingresso</Text>
                    <TouchableOpacity
                        style={[styles.iconButton, torch && styles.iconButtonActive]}
                        onPress={() => setTorch(!torch)}
                    >
                        <Zap size={24} color={torch ? colors.primary : colors.text} />
                    </TouchableOpacity>
                </View>

                <View style={styles.scannerContainer}>
                    <View style={styles.scannerFrame}>
                        <View style={[styles.corner, styles.topLeft]} />
                        <View style={[styles.corner, styles.topRight]} />
                        <View style={[styles.corner, styles.bottomLeft]} />
                        <View style={[styles.corner, styles.bottomRight]} />

                        {!scanned && (
                            <Animated.View style={[styles.scanLine, animatedLineStyle]} />
                        )}
                    </View>
                    <Text style={styles.hint}>Aponte para o QR Code do ingresso</Text>
                </View>

                <View style={styles.footer}>
                    {scanned && (
                        <Button
                            title="Escanear Próximo"
                            onPress={() => setScanned(false)}
                            icon={<RefreshCw size={20} color={colors.text} />}
                        />
                    )}
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
    text: {
        color: '#fff',
        marginBottom: 20,
        fontSize: 16,
        textAlign: 'center',
        paddingHorizontal: 40,
        alignSelf: 'center',
        marginTop: '50%',
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.6)',
        justifyContent: 'space-between',
        padding: 40,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 40,
    },
    headerTitle: {
        color: '#fff',
        fontSize: 22,
        fontWeight: 'bold',
    },
    iconButton: {
        width: 48,
        height: 48,
        backgroundColor: 'rgba(255,255,255,0.1)',
        borderRadius: 24,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
    },
    iconButtonActive: {
        backgroundColor: 'rgba(99, 102, 241, 0.2)',
        borderColor: colors.primary,
    },
    scannerContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    scannerFrame: {
        width: 250,
        height: 250,
        position: 'relative',
    },
    scanLine: {
        position: 'absolute',
        width: '100%',
        height: 2,
        backgroundColor: colors.primary,
        shadowColor: colors.primary,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.8,
        shadowRadius: 10,
        elevation: 5,
    },
    corner: {
        position: 'absolute',
        width: 40,
        height: 40,
        borderColor: colors.primary,
        borderWidth: 4,
    },
    topLeft: {
        top: 0,
        left: 0,
        borderRightWidth: 0,
        borderBottomWidth: 0,
        borderTopLeftRadius: 20,
    },
    topRight: {
        top: 0,
        right: 0,
        borderLeftWidth: 0,
        borderBottomWidth: 0,
        borderTopRightRadius: 20,
    },
    bottomLeft: {
        bottom: 0,
        left: 0,
        borderRightWidth: 0,
        borderTopWidth: 0,
        borderBottomLeftRadius: 20,
    },
    bottomRight: {
        bottom: 0,
        right: 0,
        borderLeftWidth: 0,
        borderTopWidth: 0,
        borderBottomRightRadius: 20,
    },
    hint: {
        color: '#fff',
        marginTop: 30,
        fontSize: 15,
        fontWeight: '500',
        backgroundColor: 'rgba(0,0,0,0.4)',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        overflow: 'hidden',
    },
    footer: {
        marginBottom: 40,
    },
});