/**
 * Standard RTL Components for Tatx SA App
 * 
 * Based on the correct offer card RTL pattern:
 * - All text aligned RIGHT
 * - writingDirection: 'rtl'
 * - Natural flow from RIGHT to LEFT
 * - No shadows (iOS 26+ flat design)
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { colors, spacing, borderRadius, fonts } from '../../constants/theme';

// ============================================
// RTL Text Component
// ============================================
export const RTLText = ({ 
  children, 
  size = 'body', 
  align = 'right',
  color: textColor = colors.text,
  style,
  ...props 
}) => {
  const textStyles = {
    largeTitle: { fontSize: 34, fontFamily: fonts.bold, lineHeight: 41 },
    title1: { fontSize: 28, fontFamily: fonts.bold, lineHeight: 34 },
    title2: { fontSize: 22, fontFamily: fonts.semiBold, lineHeight: 28 },
    title3: { fontSize: 20, fontFamily: fonts.semiBold, lineHeight: 25 },
    headline: { fontSize: 17, fontFamily: fonts.semiBold, lineHeight: 22 },
    body: { fontSize: 17, fontFamily: fonts.regular, lineHeight: 24 },
    callout: { fontSize: 16, fontFamily: fonts.regular, lineHeight: 21 },
    subhead: { fontSize: 15, fontFamily: fonts.regular, lineHeight: 20 },
    footnote: { fontSize: 13, fontFamily: fonts.regular, lineHeight: 18 },
    caption: { fontSize: 12, fontFamily: fonts.regular, lineHeight: 16 },
  };

  const alignments = {
    right: 'right',
    left: 'left',
    center: 'center',
  };

  return (
    <Text
      style={[
        textStyles[size],
        { 
          textAlign: alignments[align], 
          color: textColor,
          writingDirection: 'rtl',
        },
        style,
      ]}
      {...props}
    >
      {children}
    </Text>
  );
};

// ============================================
// RTL Container Component
// ============================================
export const RTLContainer = ({ 
  children, 
  padding = 'md',
  style,
  ...props 
}) => {
  const paddings = {
    none: 0,
    sm: spacing.sm,
    md: spacing.md,
    lg: spacing.lg,
    xl: spacing.xl,
  };

  return (
    <View
      style={[
        styles.container,
        { paddingHorizontal: paddings[padding] },
        style,
      ]}
      {...props}
    >
      {children}
    </View>
  );
};

// ============================================
// RTL Card Component (Based on Offer Cards)
// ============================================
export const RTLCard = ({ 
  children, 
  onPress,
  width,
  height,
  borderRadius: radius = 28,
  style,
  ...props 
}) => {
  const cardStyle = [
    styles.card,
    { borderRadius: radius },
    width && { width },
    height && { height },
    style,
  ];

  const CardWrapper = onPress ? TouchableOpacity : View;

  return (
    <CardWrapper 
      style={cardStyle} 
      onPress={onPress}
      activeOpacity={onPress ? 0.88 : 1}
      {...props}
    >
      {children}
    </CardWrapper>
  );
};

// ============================================
// RTL Section Header Component
// ============================================
export const RTLSectionHeader = ({ 
  title, 
  linkText,
  onLinkPress,
  style,
  ...props 
}) => {
  return (
    <View style={[styles.sectionHeader, style]} {...props}>
      <RTLText size="title3" align="right">{title}</RTLText>
      {linkText && (
        <TouchableOpacity onPress={onLinkPress} activeOpacity={0.7}>
          <RTLText 
            size="caption" 
            align="left" 
            color={colors.primary}
          >
            {linkText}
          </RTLText>
        </TouchableOpacity>
      )}
    </View>
  );
};

// ============================================
// RTL Horizontal Scroll Component
// ============================================
export const RTLHorizontalScroll = ({ 
  children, 
  contentContainerStyle,
  style,
  ...props 
}) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={[styles.horizontalList, contentContainerStyle]}
      style={style}
      {...props}
    >
      {children}
    </ScrollView>
  );
};

// ============================================
// RTL Row Component
// ============================================
export const RTLRow = ({ 
  children, 
  align = 'space-between',
  style,
  ...props 
}) => {
  const alignments = {
    'space-between': 'space-between',
    'flex-start': 'flex-start',
    'flex-end': 'flex-end',
    'center': 'center',
  };

  return (
    <View
      style={[
        styles.row,
        { justifyContent: alignments[align] },
        style,
      ]}
      {...props}
    >
      {children}
    </View>
  );
};

// ============================================
// RTL Column Component
// ============================================
export const RTLColumn = ({ 
  children, 
  align = 'flex-end',
  gap = spacing.sm,
  style,
  ...props 
}) => {
  const alignments = {
    'flex-start': 'flex-start',
    'flex-end': 'flex-end',
    'center': 'center',
  };

  return (
    <View
      style={[
        styles.column,
        { alignItems: alignments[align], gap },
        style,
      ]}
      {...props}
    >
      {children}
    </View>
  );
};

// ============================================
// Styles
// ============================================
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  card: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.borderLight,
    overflow: 'hidden',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: spacing.xl,
    marginBottom: spacing.md,
  },
  horizontalList: {
    gap: spacing.md,
    paddingBottom: spacing.xs,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  column: {
    flexDirection: 'column',
  },
});

// ============================================
// RTL Text Presets (for common patterns)
// ============================================
export const RTLPresets = {
  // Card content aligned right (like offer cards)
  cardContent: {
    textAlign: 'right',
    writingDirection: 'rtl',
  },
  
  // Centered content (for hero sections)
  centered: {
    textAlign: 'center',
    writingDirection: 'rtl',
  },
  
  // Input text (right aligned)
  input: {
    textAlign: 'right',
    writingDirection: 'rtl',
  },
  
  // Numbers (maintain LTR for digits)
  numbers: {
    textAlign: 'center',
    writingDirection: 'ltr',
  },
};
