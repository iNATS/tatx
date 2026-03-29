import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Animated,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, borderRadius, shadows } from '../constants/theme';

/**
 * Apple HIG Compliant Alert Component
 * 
 * Features:
 * - Centered presentation
 * - Scale animation
 * - Blur backdrop
 * - Default & cancel button styles
 * - Icon/image support
 * - Destructive action styling
 */
const Alert = ({
  visible,
  onClose,
  icon,
  iconColor,
  title,
  message,
  actions,
  cancelButtonIndex,
}) => {
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const backdropAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.spring(scaleAnim, {
          toValue: 1,
          tension: 250,
          friction: 20,
          useNativeDriver: true,
        }),
        Animated.timing(backdropAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      closeModal();
    }
  }, [visible]);

  const closeModal = () => {
    Animated.parallel([
      Animated.timing(scaleAnim, {
        toValue: 0.8,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(backdropAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => onClose());
  };

  const handleAction = (action, index) => {
    if (action.onPress) {
      action.onPress();
    }
    closeModal();
  };

  const isSingleButton = actions.length === 1;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={closeModal}
      statusBarTranslucent
    >
      {/* Backdrop */}
      <Animated.View
        style={[
          styles.backdrop,
          {
            opacity: backdropAnim,
          },
        ]}
      >
        <TouchableOpacity
          style={styles.backdropTouchable}
          activeOpacity={1}
          onPress={closeModal}
        />
      </Animated.View>

      {/* Alert */}
      <Animated.View
        style={[
          styles.container,
          {
            transform: [{ scale: scaleAnim }],
            opacity: scaleAnim,
          },
        ]}
      >
        {/* Icon */}
        {icon && (
          <View style={styles.iconContainer}>
            {typeof icon === 'string' ? (
              <Ionicons name={icon} size={48} color={iconColor || colors.primary} />
            ) : (
              icon
            )}
          </View>
        )}

        {/* Title */}
        {title && (
          <Text style={styles.title} numberOfLines={2}>
            {title}
          </Text>
        )}

        {/* Message */}
        {message && (
          <Text style={styles.message} numberOfLines={10}>
            {message}
          </Text>
        )}

        {/* Actions */}
        <View style={[
          styles.actionsContainer,
          isSingleButton && styles.singleButtonContainer,
        ]}>
          {actions.map((action, index) => {
            const isDestructive = action.style === 'destructive';
            const isDefault = action.style === 'default';
            const isLast = index === actions.length - 1;

            return (
              <TouchableOpacity
                key={index}
                style={[
                  styles.actionButton,
                  isSingleButton && styles.singleButton,
                  !isSingleButton && !isLast && styles.actionSeparator,
                ]}
                onPress={() => handleAction(action, index)}
                activeOpacity={0.7}
              >
                <Text
                  style={[
                    styles.actionText,
                    isDestructive && styles.destructiveText,
                    isDefault && styles.defaultText,
                  ]}
                >
                  {action.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </Animated.View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.overlay,
  },
  backdropTouchable: {
    flex: 1,
  },
  container: {
    position: 'absolute',
    left: spacing.xl,
    right: spacing.xl,
    top: SCREEN_HEIGHT / 2 - 100,
    backgroundColor: colors.card,
    borderRadius: borderRadius.xl,
    padding: spacing.md,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.2,
        shadowRadius: 24,
      },
      android: {
        elevation: 10,
      },
    }),
  },
  iconContainer: {
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  title: {
    fontSize: 17,
    fontWeight: '700',
    color: colors.text,
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  message: {
    fontSize: 13,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: spacing.md,
  },
  actionsContainer: {
    flexDirection: 'row-reverse',
  },
  singleButtonContainer: {
    justifyContent: 'center',
  },
  actionButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: spacing.sm,
  },
  singleButton: {
    paddingVertical: spacing.md,
  },
  actionSeparator: {
    borderLeftWidth: 1,
    borderLeftColor: colors.borderLight,
  },
  actionText: {
    fontSize: 17,
    fontWeight: '600',
    color: colors.primary,
  },
  defaultText: {
    fontWeight: '700',
  },
  destructiveText: {
    color: colors.error,
  },
});

// Get screen dimensions for positioning
const SCREEN_HEIGHT = Platform.OS === 'ios' ? 
  (typeof window !== 'undefined' ? window.innerHeight : 667) : 
  (typeof window !== 'undefined' ? window.innerHeight : 667);

export default Alert;
