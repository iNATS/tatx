import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, borderRadius, shadows, fonts } from '../constants/theme';
import { useApp } from '../context/AppContext';

/**
 * Reusable Filter Tabs Component
 * Simple, clean design consistent with app theme
 */
const FilterTabs = ({ 
  filters, 
  selectedFilter, 
  onSelectFilter, 
  showIcons = true,
  compact = false 
}) => {
  const { isRTL, rowDirection, textAlignStart } = useApp();

  return (
    <View style={styles.container}>
      <ScrollView 
        horizontal
        inverted={isRTL}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {filters.map((filter, index) => {
          const isSelected = selectedFilter === filter.id || selectedFilter === filter;
          const label = typeof filter === 'string' ? filter : filter.label;
          const icon = typeof filter === 'object' ? filter.icon : null;
          
          return (
            <TouchableOpacity
              key={index}
              style={[
                styles.tab,
                { flexDirection: rowDirection },
                isSelected && styles.tabActive,
                compact && styles.tabCompact,
              ]}
              onPress={() => onSelectFilter(filter.id || filter)}
              activeOpacity={0.7}
            >
              {showIcons && icon && (
                <Ionicons 
                  name={icon} 
                  size={compact ? 16 : 18} 
                  color={isSelected ? colors.white : colors.textSecondary} 
                />
              )}
              <Text 
                style={[
                  styles.tabText, 
                  { textAlign: textAlignStart },
                  isSelected && styles.tabTextActive,
                  compact && styles.tabTextCompact,
                ]}
                numberOfLines={1}
              >
                {label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },
  scrollContent: {
    paddingHorizontal: spacing.md,
    gap: spacing.sm,
  },
  tab: {
    alignItems: 'center',
    backgroundColor: colors.cardSecondary,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.full,
    gap: spacing.xs,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  tabActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
    ...shadows.md,
  },
  tabCompact: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
  },
  tabText: {
    fontSize: 13,
    color: colors.textSecondary,
    fontFamily: fonts.semiBold,
  },
  tabTextActive: {
    color: colors.white,
    fontFamily: fonts.bold,
  },
  tabTextCompact: {
    fontSize: 12,
  },
});

export default FilterTabs;
