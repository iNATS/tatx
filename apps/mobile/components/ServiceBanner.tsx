import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet, Dimensions } from 'react-native';
import { Colors } from '@/constants/Colors';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface ServiceBannerProps {
  id: string;
  title: string;
  subtitle: string;
  gradient: string[];
  icon: string;
  onPress?: () => void;
}

export function ServiceBanner({
  title,
  subtitle,
  gradient,
  icon,
  onPress,
}: ServiceBannerProps) {
  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          backgroundColor: gradient[0],
        },
      ]}
      onPress={onPress}
      activeOpacity={0.9}
    >
      <View style={styles.content}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>{subtitle}</Text>
        </View>
        <View style={styles.iconContainer}>
          <Text style={styles.icon}>{getIconForType(icon)}</Text>
        </View>
      </View>
      <View style={styles.indicatorContainer}>
        <View style={styles.indicatorActive} />
        <View style={styles.indicator} />
        <View style={styles.indicator} />
      </View>
    </TouchableOpacity>
  );
}

function getIconForType(type: string): string {
  const icons: Record<string, string> = {
    car: '🚗',
    utensils: '🍔',
    'shopping-cart': '🛒',
    package: '📦',
  };
  return icons[type] || '🎉';
}

const styles = StyleSheet.create({
  container: {
    width: SCREEN_WIDTH - 32,
    borderRadius: 20,
    padding: 20,
    marginHorizontal: 16,
    ...Colors.Shadows.lg,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: Colors.textInverse,
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    color: Colors.textInverse,
    opacity: 0.9,
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    fontSize: 32,
  },
  indicatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
    gap: 6,
  },
  indicatorActive: {
    width: 24,
    height: 4,
    borderRadius: 2,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
  },
  indicator: {
    width: 8,
    height: 4,
    borderRadius: 2,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
  },
});

export default ServiceBanner;
