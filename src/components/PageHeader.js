import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, spacing, borderRadius, fonts } from '../constants/theme';
import { useApp } from '../context/AppContext';

/**
 * Standard iOS Page Header - Apple HIG RTL Compliant
 * 
 * Usage:
 * - Back button on RIGHT (→) for RTL
 * - Title right of back button
 * - Actions on LEFT
 * - No shadows (iOS 26+ flat design)
 * - 44pt minimum touch targets
 */
const PageHeader = ({
  navigation,
  title,
  subtitle,
  showBack = true,
  onBackPress,
  actionIcon,
  onActionPress,
  onSearchPress,
  searchValue,
  onSearchChange,
  searchPlaceholder = 'ابحث',
  filters = [],
  selectedFilter,
  onSelectFilter,
  largeTitle = true, // Apple HIG: Large title on scroll
}) => {
  const insets = useSafeAreaInsets();
  const { isRTL, rowDirection, textAlignStart } = useApp();
  const backIcon = isRTL ? 'arrow-forward' : 'arrow-back'; // Points right in RTL

  return (
    <View style={[styles.wrapper, { paddingTop: insets.top + spacing.sm }]}>
      {/* Main Header Row - Apple HIG: 44pt height */}
      <View style={[styles.headerRow, { flexDirection: rowDirection }]}>
        {/* Left Side: Actions */}
        {actionIcon ? (
          <TouchableOpacity 
            onPress={onActionPress} 
            style={styles.actionButton} 
            activeOpacity={0.85}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <Ionicons name={actionIcon} size={22} color={colors.primary} />
          </TouchableOpacity>
        ) : (
          <View style={styles.actionSpacer} />
        )}

        {/* Center-Right: Title */}
        <View style={styles.titleContainer}>
          <Text 
            style={[
              largeTitle ? styles.largeTitle : styles.title,
              { textAlign: textAlignStart }
            ]} 
            numberOfLines={1}
          >
            {title}
          </Text>
          {!!subtitle && (
            <Text 
              style={[styles.subtitle, { textAlign: textAlignStart }]}
              numberOfLines={1}
            >
              {subtitle}
            </Text>
          )}
        </View>

        {/* Right Side: Back Button */}
        {showBack ? (
          <TouchableOpacity
            onPress={onBackPress || (() => navigation?.goBack())}
            style={styles.backButton}
            activeOpacity={0.85}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <Ionicons name={backIcon} size={24} color={colors.primary} />
          </TouchableOpacity>
        ) : null}
      </View>

      {/* Optional Search Bar - Apple HIG: Integrated design */}
      {(typeof onSearchChange === 'function' || typeof onSearchPress === 'function') && (
        <TouchableOpacity
          activeOpacity={typeof onSearchPress === 'function' ? 0.86 : 1}
          onPress={onSearchPress}
          style={styles.searchBar}
          disabled={typeof onSearchPress !== 'function'}
        >
          <Ionicons name="search-outline" size={20} color={colors.textTertiary} />
          <TextInput
            value={searchValue}
            onChangeText={onSearchChange}
            placeholder={searchPlaceholder}
            placeholderTextColor={colors.textTertiary}
            style={[styles.searchInput, { textAlign: textAlignStart }]}
            editable={typeof onSearchChange === 'function'}
            pointerEvents={typeof onSearchPress === 'function' && typeof onSearchChange !== 'function' ? 'none' : 'auto'}
          />
          {typeof onSearchChange === 'function' && (
            <TouchableOpacity style={styles.filterButton} activeOpacity={0.85}>
              <Ionicons name="options-outline" size={18} color={colors.textSecondary} />
            </TouchableOpacity>
          )}
        </TouchableOpacity>
      )}

      {/* Optional Filter Chips - Apple HIG: Horizontal scroll */}
      {!!filters.length && (
        <ScrollView
          horizontal
          inverted={isRTL}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filtersRow}
        >
          {filters.map((filter) => {
            const isActive = selectedFilter === filter.id;
            return (
              <TouchableOpacity
                key={filter.id}
                style={[
                  styles.filterChip, 
                  { flexDirection: rowDirection },
                  isActive && styles.filterChipActive
                ]}
                onPress={() => onSelectFilter?.(filter.id)}
                activeOpacity={0.85}
              >
                {!!filter.icon && (
                  <Ionicons
                    name={filter.icon}
                    size={16}
                    color={isActive ? colors.white : colors.textSecondary}
                  />
                )}
                <Text 
                  style={[
                    styles.filterText, 
                    isActive && styles.filterTextActive
                  ]}
                >
                  {filter.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: colors.background,
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.sm,
    gap: spacing.sm,
    borderBottomWidth: Platform.OS === 'ios' ? 0 : 1,
    borderBottomColor: colors.borderLight,
  },
  headerRow: {
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: 44, // Apple HIG: Minimum header height
    paddingTop: spacing.xs,
  },
  titleContainer: {
    flex: 1,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
  },
  largeTitle: {
    fontSize: 34, // Apple HIG: Large Title
    fontFamily: fonts.bold,
    color: colors.text,
    lineHeight: 41,
  },
  title: {
    fontSize: 20, // Apple HIG: Title
    fontFamily: fonts.bold,
    color: colors.text,
    lineHeight: 25,
  },
  subtitle: {
    marginTop: 2,
    color: colors.textSecondary,
    fontSize: 13,
    lineHeight: 18,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.card,
    alignItems: 'center',
    justifyContent: 'center',
    // No shadow - Apple HIG iOS 26+ flat design
  },
  actionButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.card,
    alignItems: 'center',
    justifyContent: 'center',
    // No shadow - Apple HIG iOS 26+ flat design
  },
  actionSpacer: {
    width: 44,
    height: 44,
  },
  searchBar: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: 16,
    minHeight: 48,
    paddingHorizontal: spacing.md,
    borderWidth: 1,
    borderColor: colors.borderLight,
    gap: spacing.sm,
    // No shadow - Apple HIG iOS 26+ flat design
  },
  searchInput: {
    flex: 1,
    color: colors.text,
    fontFamily: fonts.regular,
    fontSize: 16,
    paddingVertical: Platform.OS === 'ios' ? 0 : spacing.xs,
  },
  filterButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.cardSecondary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  filtersRow: {
    gap: spacing.sm,
    paddingTop: spacing.xs,
  },
  filterChip: {
    alignItems: 'center',
    gap: spacing.xs,
    paddingHorizontal: spacing.md,
    paddingVertical: 10,
    borderRadius: borderRadius.full,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.borderLight,
    // No shadow - Apple HIG iOS 26+ flat design
  },
  filterChipActive: {
    backgroundColor: colors.primary,
    borderColor: 'transparent',
  },
  filterText: {
    color: colors.textSecondary,
    fontFamily: fonts.semiBold,
    fontSize: 13,
    textAlign: 'center',
  },
  filterTextActive: {
    color: colors.white,
  },
});

export default PageHeader;
