import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import { Colors } from '@/constants/Colors';

interface ProfileMenuItemProps {
  id: string;
  title: string;
  subtitle?: string;
  icon: string;
  color: string;
  onPress?: () => void;
  showArrow?: boolean;
  badge?: string | number;
}

export function ProfileMenuItem({
  title,
  subtitle,
  icon,
  color,
  onPress,
  showArrow = true,
  badge,
}: ProfileMenuItemProps) {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={[styles.iconContainer, { backgroundColor: `${color}15` }]}>
        <Text style={[styles.icon, { color }]}>{getIconForType(icon)}</Text>
      </View>
      
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
      </View>
      
      {badge && (
        <View style={[styles.badge, { backgroundColor: color }]}>
          <Text style={styles.badgeText}>{badge}</Text>
        </View>
      )}
      
      {showArrow && (
        <Text style={styles.arrow}>›</Text>
      )}
    </TouchableOpacity>
  );
}

function getIconForType(type: string): string {
  const icons: Record<string, string> = {
    wallet: '💳',
    clock: '🕐',
    'shopping-bag': '🛍️',
    'map-pin': '📍',
    'credit-card': '💳',
    settings: '⚙️',
    headphones: '🎧',
    'log-out': '🚪',
  };
  return icons[type] || '📌';
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.backgroundSecondary,
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  icon: {
    fontSize: 22,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 3,
  },
  subtitle: {
    fontSize: 13,
    color: Colors.textMuted,
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 12,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.textInverse,
  },
  arrow: {
    fontSize: 22,
    color: Colors.textMuted,
    marginLeft: 8,
  },
});

export default ProfileMenuItem;
