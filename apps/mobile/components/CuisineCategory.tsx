import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import { Colors } from '@/constants/Colors';

interface CuisineCategoryProps {
  id: string;
  name: string;
  icon: string;
  selected?: boolean;
  onPress?: () => void;
}

export function CuisineCategory({
  name,
  icon,
  selected = false,
  onPress,
}: CuisineCategoryProps) {
  const getIconForCuisine = (cuisineIcon: string) => {
    const icons: Record<string, string> = {
      utensils: '🍽️',
      coffee: '☕',
      hamburger: '🍔',
      'pizza-slice': '🍕',
      'bowl-rice': '🍜',
      'ice-cream': '🍦',
      leaf: '🥗',
    };
    return icons[cuisineIcon] || '🍴';
  };

  return (
    <TouchableOpacity
      style={[
        styles.container,
        selected && styles.containerSelected,
        { borderColor: selected ? Colors.primary : Colors.border },
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text style={[styles.icon, selected && styles.iconSelected]}>
        {getIconForCuisine(icon)}
      </Text>
      <Text
        style={[
          styles.name,
          selected && styles.nameSelected,
          { color: selected ? Colors.primary : Colors.textSecondary },
        ]}
      >
        {name}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.backgroundSecondary,
    marginRight: 10,
    ...Colors.Shadows.sm,
  },
  containerSelected: {
    backgroundColor: `${Colors.primary}08`,
    borderColor: Colors.primary,
  },
  icon: {
    fontSize: 24,
    marginBottom: 6,
    opacity: 0.7,
  },
  iconSelected: {
    opacity: 1,
  },
  name: {
    fontSize: 12,
    fontWeight: '500',
  },
  nameSelected: {
    fontWeight: '600',
  },
});

export default CuisineCategory;
