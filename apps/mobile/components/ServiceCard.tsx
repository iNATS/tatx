import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import { Colors } from '@/constants/Colors';

interface ServiceCardProps {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  gradient?: string[];
  onPress?: () => void;
  size?: 'sm' | 'md' | 'lg';
}

export function ServiceCard({
  id,
  name,
  description,
  color,
  onPress,
  size = 'md',
}: ServiceCardProps) {
  const sizeStyles = {
    sm: {
      container: { padding: 12 },
      icon: { width: 40, height: 40 },
      iconSize: 20,
      title: { fontSize: 14 },
      description: { fontSize: 12 },
    },
    md: {
      container: { padding: 16 },
      icon: { width: 56, height: 56 },
      iconSize: 28,
      title: { fontSize: 16 },
      description: { fontSize: 13 },
    },
    lg: {
      container: { padding: 20 },
      icon: { width: 64, height: 64 },
      iconSize: 32,
      title: { fontSize: 18 },
      description: { fontSize: 14 },
    },
  };

  const currentSize = sizeStyles[size];

  return (
    <TouchableOpacity
      style={[styles.container, currentSize.container]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View
        style={[
          styles.iconContainer,
          currentSize.icon,
          { backgroundColor: `${color}15` },
        ]}
      >
        <Text style={[styles.icon, { color: color, fontSize: currentSize.iconSize }]}>
          {getIconForService(id)}
        </Text>
      </View>
      <Text style={[styles.title, currentSize.title]}>{name}</Text>
      <Text style={[styles.description, currentSize.description]}>{description}</Text>
    </TouchableOpacity>
  );
}

function getIconForService(serviceId: string): string {
  const icons: Record<string, string> = {
    ride: '🚗',
    food: '🍔',
    grocery: '🛒',
    courier: '📦',
  };
  return icons[serviceId] || '⭐';
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.backgroundSecondary,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    ...Colors.Shadows.md,
  },
  iconContainer: {
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  icon: {
    textAlign: 'center',
  },
  title: {
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 4,
    textAlign: 'center',
  },
  description: {
    color: Colors.textMuted,
    textAlign: 'center',
  },
});

export default ServiceCard;
