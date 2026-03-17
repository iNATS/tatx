import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, typography, shadows } from '../constants/theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

/**
 * NativeHeader - A consistent header component for all screens
 * Provides proper safe area handling and native-like appearance
 */
const NativeHeader = ({
  title,
  onBack,
  rightAction,
  rightIcon,
  showBack = true,
  backgroundColor = colors.white,
  titleColor = colors.text,
  translucent = false,
}) => {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.header,
        { backgroundColor, paddingTop: Math.max(insets.top, spacing.md) },
        translucent && styles.translucent,
      ]}
    >
      <View style={styles.headerContent}>
        {showBack ? (
          <TouchableOpacity onPress={onBack} style={styles.backButton} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
            <Ionicons name="arrow-back" size={24} color={titleColor} />
          </TouchableOpacity>
        ) : (
          <View style={styles.placeholder} />
        )}
        
        {title && (
          <Text style={[styles.title, { color: titleColor }]} numberOfLines={1}>
            {title}
          </Text>
        )}
        
        {rightAction ? (
          <TouchableOpacity onPress={rightAction} style={styles.rightButton} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
            {rightIcon ? (
              <Ionicons name={rightIcon} size={24} color={titleColor} />
            ) : (
              <Ionicons name="ellipsis-vertical" size={24} color={titleColor} />
            )}
          </TouchableOpacity>
        ) : (
          <View style={styles.placeholder} />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: colors.white,
    borderBottomWidth: 0,
    ...shadows.sm,
  },
  translucent: {
    backgroundColor: 'transparent',
    borderBottomWidth: 0,
    shadowColor: 'transparent',
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    minHeight: 50,
  },
  backButton: {
    padding: spacing.xs,
    marginLeft: -spacing.xs,
  },
  rightButton: {
    padding: spacing.xs,
    marginRight: -spacing.xs,
  },
  placeholder: {
    width: 40,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    textAlign: 'center',
    flex: 1,
  },
});

export default NativeHeader;
