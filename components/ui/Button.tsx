import React from 'react';
import {
    ActivityIndicator,
    StyleSheet,
    Text,
    TextStyle,
    TouchableOpacity,
    View,
    ViewStyle
} from 'react-native';
import { colors } from '../../theme/colors';

interface ButtonProps {
    onPress: () => void;
    title: string;
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
    isLoading?: boolean;
    style?: ViewStyle;
    textStyle?: TextStyle;
    disabled?: boolean;
    icon?: React.ReactNode;
}

export const Button = ({
    onPress,
    title,
    variant = 'primary',
    isLoading,
    style,
    textStyle,
    disabled,
    icon
}: ButtonProps) => {
    const getVariantStyle = () => {
        switch (variant) {
            case 'secondary': return styles.secondary;
            case 'outline': return styles.outline;
            case 'ghost': return styles.ghost;
            default: return styles.primary;
        }
    };

    const getTextStyle = () => {
        switch (variant) {
            case 'outline': return { color: colors.primary };
            case 'ghost': return { color: colors.textMuted };
            default: return { color: colors.text };
        }
    };

    return (
        <TouchableOpacity
            onPress={onPress}
            style={[styles.base, getVariantStyle(), style, (disabled || isLoading) && styles.disabled]}
            disabled={disabled || isLoading}
            activeOpacity={0.7}
        >
            {isLoading ? (
                <ActivityIndicator color={variant === 'outline' ? colors.primary : colors.text} />
            ) : (
                <>
                    {icon && <View style={styles.iconContainer}>{icon}</View>}
                    <Text style={[styles.text, getTextStyle(), textStyle]}>{title}</Text>
                </>
            )}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    base: {
        height: 56,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 24,
        flexDirection: 'row',
    },
    primary: {
        backgroundColor: colors.primary,
        shadowColor: colors.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 4,
    },
    secondary: {
        backgroundColor: colors.surface,
    },
    outline: {
        backgroundColor: 'transparent',
        borderWidth: 1.5,
        borderColor: colors.primary,
    },
    ghost: {
        backgroundColor: 'transparent',
    },
    text: {
        fontSize: 16,
        fontWeight: '600',
        letterSpacing: 0.5,
    },
    iconContainer: {
        marginRight: 8,
    },
    disabled: {
        opacity: 0.5,
    },
});