import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, spacing, borderRadius, shadows, fonts } from '../constants/theme';
import { useApp } from '../context/AppContext';

const PageHeader = ({
  navigation,
  title,
  subtitle,
  showBack = true,
  onBackPress,
  actionIcon,
  onActionPress,
  searchValue,
  onSearchChange,
  searchPlaceholder = 'ابحث',
  filters = [],
  selectedFilter,
  onSelectFilter,
}) => {
  const insets = useSafeAreaInsets();
  const { isRTL, rowDirection, textAlignStart } = useApp();
  const backIcon = isRTL ? 'arrow-forward' : 'arrow-back';

  return (
    <View style={[styles.wrapper, { paddingTop: insets.top + spacing.sm }]}>
      <View style={[styles.topRow, { flexDirection: rowDirection }]}>
        {showBack ? (
          <TouchableOpacity
            onPress={onBackPress || (() => navigation?.goBack())}
            style={styles.iconButton}
            activeOpacity={0.85}
          >
            <Ionicons name={backIcon} size={22} color={colors.text} />
          </TouchableOpacity>
        ) : (
          <View style={styles.iconSpacer} />
        )}

        <View style={styles.titleWrap}>
          <Text style={[styles.title, { textAlign: textAlignStart }]}>{title}</Text>
          {!!subtitle && <Text style={[styles.subtitle, { textAlign: textAlignStart }]}>{subtitle}</Text>}
        </View>

        {actionIcon ? (
          <TouchableOpacity onPress={onActionPress} style={styles.iconButton} activeOpacity={0.85}>
            <Ionicons name={actionIcon} size={20} color={colors.primary} />
          </TouchableOpacity>
        ) : (
          <View style={styles.iconSpacer} />
        )}
      </View>

      {typeof onSearchChange === 'function' && (
        <View style={[styles.searchBar, { flexDirection: rowDirection }]}>
          <Ionicons name="search-outline" size={18} color={colors.textTertiary} />
          <TextInput
            value={searchValue}
            onChangeText={onSearchChange}
            placeholder={searchPlaceholder}
            placeholderTextColor={colors.textTertiary}
            style={[styles.searchInput, { textAlign: textAlignStart }]}
          />
          <TouchableOpacity style={styles.filterButton} activeOpacity={0.85}>
            <Ionicons name="options-outline" size={18} color={colors.textSecondary} />
          </TouchableOpacity>
        </View>
      )}

      {!!filters.length && (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={[styles.filtersRow, { flexDirection: rowDirection }]}
        >
          {filters.map((filter) => {
            const isActive = selectedFilter === filter.id;
            return (
              <TouchableOpacity
                key={filter.id}
                style={[styles.filterChip, isActive && styles.filterChipActive]}
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
                <Text style={[styles.filterText, isActive && styles.filterTextActive]}>{filter.label}</Text>
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
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.md,
    gap: spacing.md,
  },
  topRow: {
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  titleWrap: {
    flex: 1,
    paddingHorizontal: spacing.md,
  },
  title: {
    fontSize: 24,
    fontFamily: fonts.bold,
    color: colors.text,
  },
  subtitle: {
    marginTop: 2,
    color: colors.textSecondary,
    fontSize: 13,
    lineHeight: 20,
  },
  iconButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: colors.card,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.sm,
  },
  iconSpacer: {
    width: 42,
    height: 42,
  },
  searchBar: {
    backgroundColor: colors.card,
    borderRadius: 24,
    minHeight: 54,
    paddingHorizontal: spacing.md,
    alignItems: 'center',
    ...shadows.sm,
  },
  searchInput: {
    flex: 1,
    color: colors.text,
    fontFamily: fonts.regular,
    marginHorizontal: spacing.sm,
  },
  filterButton: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: colors.cardSecondary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  filtersRow: {
    gap: spacing.sm,
  },
  filterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    paddingHorizontal: spacing.md,
    paddingVertical: 10,
    borderRadius: borderRadius.full,
    backgroundColor: colors.card,
    ...shadows.sm,
  },
  filterChipActive: {
    backgroundColor: colors.primary,
  },
  filterText: {
    color: colors.textSecondary,
    fontFamily: fonts.semiBold,
    fontSize: 13,
  },
  filterTextActive: {
    color: colors.white,
  },
});

export default PageHeader;
