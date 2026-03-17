import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Animated,
  Dimensions,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, spacing, borderRadius, shadows } from '../constants/theme';

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get('window');

/**
 * Apple HIG Compliant ActionSheet Component
 * 
 * Features:
 * - Bottom sheet presentation
 * - Destructive action styling
 * - Cancel button separation
 * - Icon support
 * - Blur backdrop
 */
const ActionSheet = ({
  visible,
  onClose,
  title,
  message,
  actions,
  cancelButtonIndex,
}) => {
  const insets = useSafeAreaInsets();
  const slideAnim = useRef(new Animated.Value(SCREEN_HEIGHT)).current;
  const backdropAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(backdropAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      closeModal();
    }
  }, [visible]);

  const closeModal = () => {
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: SCREEN_HEIGHT,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.timing(backdropAnim, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }),
    ]).start(() => onClose());
  };

  const handleAction = (action, index) => {
    if (action.onPress) {
      action.onPress();
    }
    if (index !== cancelButtonIndex) {
      closeModal();
    }
  };

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

      {/* Action Sheet */}
      <Animated.View
        style={[
          styles.container,
          {
            transform: [{ translateY: slideAnim }],
            paddingBottom: Math.max(insets.bottom, spacing.md),
          },
        ]}
      >
        {/* Title & Message */}
        {(title || message) && (
          <View style={styles.header}>
            {title && <Text style={styles.title}>{title}</Text>}
            {message && <Text style={styles.message}>{message}</Text>}
          </View>
        )}

        {/* Actions */}
        <View style={styles.actionsContainer}>
          {actions.map((action, index) => {
            const isDestructive = action.style === 'destructive';
            const isCancel = index === cancelButtonIndex;
            const isLast = index === actions.length - 1;

            return (
              <TouchableOpacity
                key={index}
                style={[
                  styles.actionButton,
                  isDestructive && styles.destructiveButton,
                  isCancel && styles.cancelButton,
                  !isLast && styles.actionSeparator,
                ]}
                onPress={() => handleAction(action, index)}
                activeOpacity={0.7}
              >
                {action.icon && (
                  <Ionicons
                    name={action.icon}
                    size={22}
                    color={isDestructive ? colors.error : action.iconColor || colors.text}
                    style={styles.actionIcon}
                  />
                )}
                <Text
                  style={[
                    styles.actionText,
                    isDestructive && styles.destructiveText,
                    isCancel && styles.cancelText,
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
    left: spacing.md,
    right: spacing.md,
    bottom: 0,
    backgroundColor: colors.card,
    borderRadius: borderRadius.xl,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.15,
        shadowRadius: 20,
      },
      android: {
        elevation: 8,
      },
    }),
    overflow: 'hidden',
  },
  header: {
    padding: spacing.md,
    paddingBottom: spacing.sm,
    alignItems: 'center',
  },
  title: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.text,
    textAlign: 'center',
    marginBottom: 2,
  },
  message: {
    fontSize: 12,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  actionsContainer: {
    paddingVertical: spacing.sm,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
  },
  actionSeparator: {
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },
  destructiveButton: {
    backgroundColor: 'transparent',
  },
  cancelButton: {
    marginTop: spacing.xs,
    paddingTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.borderLight,
  },
  actionIcon: {
    marginRight: spacing.sm,
  },
  actionText: {
    fontSize: 17,
    fontWeight: '600',
    color: colors.text,
  },
  destructiveText: {
    color: colors.error,
  },
  cancelText: {
    fontWeight: '700',
    color: colors.primary,
  },
});

export default ActionSheet;
