import React from 'react';
import { View, StyleSheet } from 'react-native';

const SaudiRiyalIcon = ({ size = 16, color = '#111827', strokeWidth = 2, style }) => {
  const unit = size / 24;
  const stroke = Math.max(1.4, strokeWidth * unit);

  return (
    <View style={[styles.wrap, { width: size, height: size }, style]}>
      <View style={[styles.verticalMain, { right: 7 * unit, top: 2 * unit, width: stroke, height: 12 * unit, backgroundColor: color }]} />
      <View style={[styles.verticalSide, { left: 8 * unit, top: 1 * unit, width: stroke, height: 13 * unit, backgroundColor: color }]} />
      <View style={[styles.middleSlash, { left: 4 * unit, top: 10 * unit, width: 16 * unit, height: stroke, backgroundColor: color }]} />
      <View style={[styles.bottomSlash, { left: 3 * unit, bottom: 4 * unit, width: 7.5 * unit, height: stroke, backgroundColor: color }]} />
      <View style={[styles.topTail, { right: 2 * unit, top: 14 * unit, width: 5.8 * unit, height: stroke, backgroundColor: color }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: {
    position: 'relative',
  },
  verticalMain: {
    position: 'absolute',
    borderRadius: 999,
  },
  verticalSide: {
    position: 'absolute',
    borderRadius: 999,
  },
  middleSlash: {
    position: 'absolute',
    borderRadius: 999,
    transform: [{ rotate: '-13deg' }],
  },
  bottomSlash: {
    position: 'absolute',
    borderRadius: 999,
    transform: [{ rotate: '-14deg' }],
  },
  topTail: {
    position: 'absolute',
    borderRadius: 999,
    transform: [{ rotate: '-11deg' }],
  },
});

export default SaudiRiyalIcon;
