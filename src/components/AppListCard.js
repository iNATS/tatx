import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { borderRadius, colors, fonts, shadows, spacing } from '../constants/theme';
import { useApp } from '../context/AppContext';

const AppListCard = ({
  title,
  subtitle,
  mediaIcon,
  mediaColor = colors.primary,
  mediaBackground,
  imageUri,
  actionLabel = 'فتح',
  onActionPress,
  onPress,
  metaLabel,
  metaValue,
  footerNote,
  badge,
  secondaryMeta,
  actionIcon = 'chevron-back',
}) => {
  const { rowDirection, textAlignStart } = useApp();
  const mediaFill = mediaBackground || colors.grayLight;
  const isAddAction = actionLabel === 'إضافة';

  return (
    <TouchableOpacity style={[styles.card, { flexDirection: rowDirection }]} activeOpacity={0.9} onPress={onPress || onActionPress}>
      <View style={[styles.thumbnailWrap, { backgroundColor: mediaFill }]}>
        {imageUri ? (
          <Image source={{ uri: imageUri }} style={styles.thumbnail} resizeMode="cover" />
        ) : (
          <View style={styles.iconWrap}>
            <Ionicons name={mediaIcon || 'apps-outline'} size={24} color={mediaColor} />
          </View>
        )}
      </View>

      <View style={styles.contentSection}>
        <View style={styles.topBlock}>
          <View style={[styles.titleRow, { flexDirection: rowDirection }]}>
            <Text style={[styles.title, { textAlign: textAlignStart }]} numberOfLines={1}>
              {title}
            </Text>
            {!!badge && (
              <View style={styles.badgeWrap}>
                <Text style={styles.badgeText}>{badge}</Text>
              </View>
            )}
          </View>

          {!!subtitle && (
            <Text style={[styles.subtitle, { textAlign: textAlignStart }]} numberOfLines={2}>
              {subtitle}
            </Text>
          )}

          <View style={[styles.infoRow, { flexDirection: rowDirection }]}>
            {!!secondaryMeta && (
              <View style={styles.infoChip}>
                <Text style={[styles.infoChipText, { textAlign: textAlignStart }]} numberOfLines={1}>
                  {secondaryMeta}
                </Text>
              </View>
            )}
            {!!footerNote && (
              <View style={styles.infoChip}>
                <Text style={[styles.infoChipText, { textAlign: textAlignStart }]} numberOfLines={1}>
                  {footerNote}
                </Text>
              </View>
            )}
          </View>
        </View>

        <View style={[styles.bottomRow, { flexDirection: rowDirection }]}>
          <View style={styles.metaPanel}>
            {!!metaLabel && <Text style={[styles.metaLabel, { textAlign: textAlignStart }]}>{metaLabel}</Text>}
            {!!metaValue && <Text style={[styles.metaValue, { textAlign: textAlignStart }]}>{metaValue}</Text>}
          </View>

          <TouchableOpacity style={[styles.accessoryButton, isAddAction && styles.addButton]} activeOpacity={0.8} onPress={onActionPress || onPress}>
            <Ionicons
              name={isAddAction ? 'add' : actionIcon}
              size={isAddAction ? 18 : 16}
              color={isAddAction ? colors.primary : colors.textTertiary}
            />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    minHeight: 126,
    backgroundColor: colors.card,
    borderRadius: 24,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.borderLight,
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 12,
    ...shadows.sm,
  },
  thumbnailWrap: {
    width: 86,
    height: 86,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  thumbnail: {
    width: '100%',
    height: '100%',
  },
  iconWrap: {
    width: 58,
    height: 58,
    borderRadius: 18,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentSection: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 14,
    minHeight: 86,
  },
  topBlock: {
    alignItems: 'stretch',
  },
  titleRow: {
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
  },
  title: {
    flex: 1,
    color: colors.text,
    fontFamily: fonts.bold,
    fontSize: 17,
    lineHeight: 22,
  },
  badgeWrap: {
    backgroundColor: colors.infoLight,
    borderRadius: borderRadius.full,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  badgeText: {
    color: colors.primary,
    fontFamily: fonts.semiBold,
    fontSize: 10,
    textAlign: 'right',
  },
  subtitle: {
    color: colors.textSecondary,
    fontSize: 12,
    lineHeight: 18,
    marginTop: 6,
  },
  infoRow: {
    flexWrap: 'wrap',
    gap: 6,
    marginTop: 8,
  },
  infoChip: {
    backgroundColor: colors.grayLight,
    borderRadius: borderRadius.full,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  infoChipText: {
    color: colors.textSecondary,
    fontSize: 10,
    fontFamily: fonts.semiBold,
  },
  bottomRow: {
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
    gap: 12,
  },
  metaPanel: {
    flex: 1,
    alignItems: 'flex-end',
    backgroundColor: colors.grayLight,
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  metaLabel: {
    color: colors.textTertiary,
    fontFamily: fonts.semiBold,
    fontSize: 10,
  },
  metaValue: {
    color: colors.text,
    fontFamily: fonts.bold,
    fontSize: 14,
    marginTop: 2,
  },
  accessoryButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.grayLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButton: {
    backgroundColor: colors.infoLight,
  },
});

export default AppListCard;
