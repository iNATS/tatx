import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, borderRadius, shadows, typography } from '../constants/theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useApp } from '../context/AppContext';

/**
 * NativeBottomSheet - A bottom sheet component with native-like appearance
 * Properly handles safe area insets for notched devices
 */
const NativeBottomSheet = ({
  visible,
  onClose,
  title,
  children,
  height = 'auto',
}) => {
  const insets = useSafeAreaInsets();
  const { rowDirection, textAlignStart } = useApp();

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <TouchableOpacity style={styles.overlay} activeOpacity={1} onPress={onClose}>
        <View style={styles.overlay} />
      </TouchableOpacity>
      
      <View
        style={[
          styles.sheet,
          { paddingBottom: Math.max(insets.bottom, spacing.md) },
          height !== 'auto' && { height },
        ]}
      >
        <View style={styles.handleContainer}>
          <View style={styles.handle} />
        </View>
        
        {title && (
          <View style={[styles.titleContainer, { flexDirection: rowDirection }]}>
            <Text style={[styles.title, { textAlign: textAlignStart }]}>{title}</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Ionicons name="close" size={24} color={colors.textSecondary} />
            </TouchableOpacity>
          </View>
        )}
        
        <View style={styles.content}>
          {children}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  sheet: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.white,
    borderTopLeftRadius: borderRadius.xl,
    borderTopRightRadius: borderRadius.xl,
    ...shadows.lg,
  },
  handleContainer: {
    alignItems: 'center',
    paddingVertical: spacing.md,
  },
  handle: {
    width: 40,
    height: 4,
    backgroundColor: colors.gray,
    borderRadius: 2,
  },
  titleContainer: {
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.md,
  },
  title: {
    flex: 1,
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
  },
  closeButton: {
    padding: spacing.xs,
  },
  content: {
    paddingHorizontal: spacing.lg,
  },
});

export default NativeBottomSheet;
