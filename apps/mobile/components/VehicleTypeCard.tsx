import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import { Colors } from '@/constants/Colors';

interface VehicleType {
  id: string;
  name: string;
  description: string;
  icon: string;
  baseFare: number;
  perKm: number;
  eta: string;
}

interface VehicleTypeCardProps {
  vehicle: VehicleType;
  distance?: number;
  selected?: boolean;
  onSelect?: () => void;
}

export function VehicleTypeCard({
  vehicle,
  distance = 5,
  selected = false,
  onSelect,
}: VehicleTypeCardProps) {
  const totalFare = vehicle.baseFare + (vehicle.perKm * distance);

  const getIconForVehicle = (icon: string) => {
    const icons: Record<string, string> = {
      car: '🚗',
      'car-side': '🚙',
      van: '🚐',
    };
    return icons[icon] || '🚗';
  };

  return (
    <TouchableOpacity
      style={[
        styles.container,
        selected && styles.containerSelected,
        { borderColor: selected ? Colors.primary : Colors.border },
      ]}
      onPress={onSelect}
      activeOpacity={0.7}
    >
      <View style={styles.iconContainer}>
        <Text style={styles.icon}>{getIconForVehicle(vehicle.icon)}</Text>
      </View>
      
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={[styles.name, selected && styles.nameSelected]}>
            {vehicle.name}
          </Text>
          <Text style={styles.eta}>{vehicle.eta} away</Text>
        </View>
        <Text style={styles.description}>{vehicle.description}</Text>
        <Text style={styles.fare}>${totalFare.toFixed(2)}</Text>
      </View>
      
      {selected && (
        <View style={styles.checkmark}>
          <Text style={styles.checkmarkText}>✓</Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.backgroundSecondary,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: Colors.border,
    ...Colors.Shadows.sm,
  },
  containerSelected: {
    backgroundColor: `${Colors.primary}08`,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 14,
    backgroundColor: Colors.backgroundMuted,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  icon: {
    fontSize: 30,
  },
  content: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
  },
  nameSelected: {
    color: Colors.primary,
  },
  eta: {
    fontSize: 12,
    color: Colors.success,
    fontWeight: '600',
  },
  description: {
    fontSize: 13,
    color: Colors.textSecondary,
    marginBottom: 6,
  },
  fare: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.text,
  },
  checkmark: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  checkmarkText: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.textInverse,
  },
});

export default VehicleTypeCard;
