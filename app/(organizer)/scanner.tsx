import { CameraView, useCameraPermissions } from 'expo-camera';
import { RefreshCw, Zap } from 'lucide-react-native';
import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Button } from '../../components/ui/Button';
import { colors } from '../../theme/colors';

export default function ScannerScreen() {
    const [permission, requestPermission] = useCameraPermissions();
    const [scanned, setScanned] = useState(false);
    const [torch, setTorch] = useState(false);

    useEffect(() => {
        requestPermission();
    }, []);

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
        setScanned(true);
        Alert.alert(
            'Check-in Validado!',
            `Participante: João Silva\nID: ${data}`,
            [{ text: 'OK', onPress: () => setScanned(false) }]
        );
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
                    <Text style={styles.headerTitle}>Scan QR Code</Text>
                    <TouchableOpacity
                        style={styles.iconButton}
                        onPress={() => setTorch(!torch)}
                    >
                        <Zap size={24} color={torch ? colors.warning : colors.text} />
                    </TouchableOpacity>
                </View>

                <View style={styles.scannerContainer}>
                    <View style={styles.scannerFrame}>
                        <View style={[styles.corner, styles.topLeft]} />
                        <View style={[styles.corner, styles.topRight]} />
                        <View style={[styles.corner, styles.bottomLeft]} />
                        <View style={[styles.corner, styles.bottomRight]} />
                    </View>
                    <Text style={styles.hint}>Aponte para o QR Code do ingresso</Text>
                </View>

                <View style={styles.footer}>
                    {scanned && (
                        <Button
                            title="Escanear Novamente"
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
        backgroundColor: 'rgba(0,0,0,0.5)',
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
        fontSize: 20,
        fontWeight: 'bold',
    },
    iconButton: {
        width: 48,
        height: 48,
        backgroundColor: 'rgba(255,255,255,0.1)',
        borderRadius: 24,
        justifyContent: 'center',
        alignItems: 'center',
    },
    scannerContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    scannerFrame: {
        width: 250,
        height: 250,
        borderWidth: 0,
        position: 'relative',
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
        fontSize: 14,
        fontWeight: '500',
    },
    footer: {
        marginBottom: 40,
    },
});