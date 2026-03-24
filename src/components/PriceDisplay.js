import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing, fonts } from '../constants/theme';
import { useApp } from '../context/AppContext';
import SaudiRiyalIcon from './SaudiRiyalIcon';

const PriceDisplay = ({
  value,
  color = colors.text,
  size = 16,
  iconSize = 15,
  bold = false,
  muted = false,
  strike = false,
  align = 'auto',
  style,
}) => {
  const { locale, isRTL } = useApp();
  const numberValue = Number(value || 0);
  const absoluteValue = Math.abs(numberValue);
  const hasDecimals = absoluteValue % 1 !== 0;
  const formatted = new Intl.NumberFormat(locale, {
    minimumFractionDigits: hasDecimals ? 2 : 0,
    maximumFractionDigits: hasDecimals ? 2 : 0,
  }).format(absoluteValue);
  const direction = align === 'auto' ? (isRTL ? 'row-reverse' : 'row') : align;
  const tone = muted ? colors.textSecondary : color;

  return (
    <View style={[styles.wrap, { flexDirection: direction }, style]}>
      <SaudiRiyalIcon size={iconSize} color={tone} />
      <Text
        style={[
          styles.text,
          {
            color: tone,
            fontSize: size,
            fontFamily: bold ? fonts.bold : fonts.semiBold,
            textDecorationLine: strike ? 'line-through' : 'none',
          },
        ]}
      >
        {formatted}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: {
    alignItems: 'center',
    gap: spacing.xs,
  },
  text: {
    lineHeight: 20,
  },
});

export default PriceDisplay;
