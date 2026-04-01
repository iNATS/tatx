import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, spacing, fonts } from '../constants/theme';
import { useApp } from '../context/AppContext';

/**
 * Standard iOS Header - Apple HIG RTL Compliant
 * 
 * Used as the default header for all navigation screens.
 * 
 * RTL Layout (Arabic):
 * - Back button on RIGHT (→) - This is the START in RTL
 * - Title CENTERED
 * - Actions on LEFT - This is the END in RTL
 * 
 * Features:
 * - No shadows (iOS 26+ flat design)
 * - 44pt minimum touch targets
 * - Safe area aware
 */
const StandardHeader = ({
  navigation,
  title,
  subtitle,
  showBack = true,
  onBackPress,
  actionIcon,
  onActionPress,
  rightIcon,
  onRightPress,
}) => {
  const insets = useSafeAreaInsets();
  const { isRTL } = useApp();
  const backIcon = isRTL ? 'arrow-forward' : 'arrow-back'; // Points right in RTL

  const handleBack = () => {
    if (onBackPress) {
      onBackPress();
    } else {
      navigation?.goBack();
    }
  };

  const handleAction = () => {
    if (onActionPress) {
      onActionPress();
    }
  };

  const handleRight = () => {
    if (onRightPress) {
      onRightPress();
    }
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.content}>
        {/* LEFT Side: Actions (END in RTL) */}
        <View style={styles.leftContainer}>
          {actionIcon ? (
            <TouchableOpacity 
              onPress={handleAction} 
              style={styles.button}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
              activeOpacity={0.85}
            >
              <Ionicons name={actionIcon} size={24} color={colors.primary} />
            </TouchableOpacity>
          ) : rightIcon ? (
            <TouchableOpacity 
              onPress={handleRight} 
              style={styles.button}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
              activeOpacity={0.85}
            >
              <Ionicons name={rightIcon} size={24} color={colors.text} />
            </TouchableOpacity>
          ) : (
            <View style={styles.buttonSpacer} />
          )}
        </View>

        {/* CENTER: Title */}
        <View style={styles.titleContainer}>
          <Text 
            style={styles.title}
            numberOfLines={1}
          >
            {title}
          </Text>
          {subtitle ? (
            <Text 
              style={styles.subtitle}
              numberOfLines={1}
            >
              {subtitle}
            </Text>
          ) : null}
        </View>

        {/* RIGHT Side: Back Button (START in RTL) */}
        <View style={styles.rightContainer}>
          {showBack ? (
            <TouchableOpacity 
              onPress={handleBack} 
              style={styles.button}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
              activeOpacity={0.85}
            >
              <Ionicons name={backIcon} size={24} color={colors.primary} />
            </TouchableOpacity>
          ) : (
            <View style={styles.buttonSpacer} />
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    borderBottomWidth: Platform.OS === 'ios' ? 0 : 1,
    borderBottomColor: colors.borderLight,
  },
  content: {
    flexDirection: 'row', // Natural row: LEFT to RIGHT
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: 44, // Apple HIG: Minimum header height
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
  },
  leftContainer: {
    flex: 1,
    alignItems: 'flex-start',
  },
  titleContainer: {
    flex: 2,
    alignItems: 'center',
    paddingHorizontal: spacing.sm,
  },
  rightContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },
  button: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.card,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.borderLight,
  },
  buttonSpacer: {
    width: 44,
    height: 44,
  },
  title: {
    fontSize: 20,
    fontFamily: fonts.bold,
    color: colors.text,
    textAlign: 'center',
    writingDirection: 'rtl',
  },
  subtitle: {
    marginTop: 2,
    fontSize: 13,
    fontFamily: fonts.regular,
    color: colors.textSecondary,
    textAlign: 'center',
    writingDirection: 'rtl',
  },
});

export default StandardHeader;
