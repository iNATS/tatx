import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import { Colors } from '@/constants/Colors';

interface RecentActivityCardProps {
  id: string;
  type: 'ride' | 'food' | 'grocery' | 'courier';
  title: string;
  subtitle: string;
  amount: number;
  date: string;
  icon: string;
  status: 'completed' | 'in-progress' | 'cancelled';
  onPress?: () => void;
}

export function RecentActivityCard({
  title,
  subtitle,
  amount,
  date,
  icon,
  status,
  onPress,
}: RecentActivityCardProps) {
  const getStatusColor = () => {
    switch (status) {
      case 'completed':
        return Colors.success;
      case 'in-progress':
        return Colors.warning;
      case 'cancelled':
        return Colors.error;
      default:
        return Colors.textMuted;
    }
  };

  const getStatusText = () => {
    switch (status) {
      case 'completed':
        return 'Completed';
      case 'in-progress':
        return 'In Progress';
      case 'cancelled':
        return 'Cancelled';
      default:
        return '';
    }
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={[styles.iconContainer, { backgroundColor: getIconBackgroundColor(icon) }]}>
        <Text style={styles.icon}>{getIconForType(icon)}</Text>
      </View>
      
      <View style={styles.content}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>{subtitle}</Text>
          <Text style={styles.date}>{date}</Text>
        </View>
        
        <View style={styles.rightContainer}>
          <Text style={[styles.amount, { color: amount < 0 ? Colors.text : Colors.success }]}>
            {amount < 0 ? `-$${Math.abs(amount).toFixed(2)}` : `+$${amount.toFixed(2)}`}
          </Text>
          <View style={[styles.statusBadge, { backgroundColor: `${getStatusColor()}15` }]}>
            <Text style={[styles.statusText, { color: getStatusColor() }]}>
              {getStatusText()}
            </Text>
          </View>
        </View>
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
  return icons[type] || '⭐';
}

function getIconBackgroundColor(type: string): string {
  const colors: Record<string, string> = {
    car: '#3B82F6',
    utensils: '#F97316',
    'shopping-cart': '#22C55E',
    package: '#8B5CF6',
  };
  return `${colors[type] || '#6B7280'}15`;
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.backgroundSecondary,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    ...Colors.Shadows.sm,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  icon: {
    fontSize: 24,
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 13,
    color: Colors.textSecondary,
    marginBottom: 4,
  },
  date: {
    fontSize: 12,
    color: Colors.textMuted,
  },
  rightContainer: {
    alignItems: 'flex-end',
  },
  amount: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 6,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '600',
  },
});

export default RecentActivityCard;
