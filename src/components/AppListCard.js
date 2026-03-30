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
      <View style={[styles.imageWrap, { backgroundColor: mediaFill }]}>
        {imageUri ? (
          <Image source={{ uri: imageUri }} style={styles.image} resizeMode="cover" />
        ) : (
          <View style={styles.iconWrap}>
            <Ionicons name={mediaIcon || 'apps-outline'} size={22} color={mediaColor} />
          </View>
        )}
      </View>

      <View style={styles.content}>
        <View style={styles.header}>
          {!!badge && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{badge}</Text>
            </View>
          )}
          <Text style={[styles.title, { textAlign: textAlignStart }]} numberOfLines={1}>
            {title}
          </Text>
          {!!subtitle && (
            <Text style={[styles.subtitle, { textAlign: textAlignStart }]} numberOfLines={2}>
              {subtitle}
            </Text>
          )}
          {!!secondaryMeta && (
            <Text style={[styles.secondaryMeta, { textAlign: textAlignStart }]} numberOfLines={1}>
              {secondaryMeta}
            </Text>
          )}
          {!!footerNote && (
            <Text style={[styles.footerNote, { textAlign: textAlignStart }]} numberOfLines={1}>
              {footerNote}
            </Text>
          )}
        </View>

        <View style={[styles.footer, { flexDirection: rowDirection }]}>
          <View style={styles.meta}>
            {!!metaLabel && <Text style={[styles.metaLabel, { textAlign: textAlignStart }]}>{metaLabel}</Text>}
            {!!metaValue && <Text style={[styles.metaValue, { textAlign: textAlignStart }]}>{metaValue}</Text>}
          </View>

          <TouchableOpacity style={[styles.button, isAddAction && styles.addButton, { flexDirection: rowDirection }]} activeOpacity={0.85} onPress={onActionPress || onPress}>
            <Ionicons
              name={isAddAction ? 'add' : actionIcon}
              size={16}
              color={isAddAction ? colors.white : colors.textSecondary}
            />
            <Text style={[styles.buttonText, isAddAction && styles.addButtonText]}>
              {isAddAction ? 'إضافة' : actionLabel}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    minHeight: 116,
    backgroundColor: colors.card,
    borderRadius: 20,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.borderLight,
    padding: 12,
    alignItems: 'center',
    ...shadows.sm,
  },
  imageWrap: {
    width: 84,
    height: 84,
    borderRadius: 18,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  iconWrap: {
    width: 52,
    height: 52,
    borderRadius: 16,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    paddingHorizontal: 12,
    justifyContent: 'space-between',
    minHeight: 84,
  },
  header: {
    alignItems: 'stretch',
  },
  badge: {
    alignSelf: 'flex-end',
    backgroundColor: colors.grayLight,
    borderRadius: borderRadius.full,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginBottom: 6,
  },
  badgeText: {
    color: colors.textSecondary,
    fontFamily: fonts.semiBold,
    fontSize: 10,
    textAlign: 'right',
  },
  title: {
    color: colors.text,
    fontFamily: fonts.bold,
    fontSize: 16,
    lineHeight: 21,
  },
  subtitle: {
    color: colors.textSecondary,
    fontSize: 12,
    lineHeight: 17,
    marginTop: 4,
  },
  secondaryMeta: {
    color: colors.textSecondary,
    fontSize: 11,
    marginTop: 5,
  },
  footerNote: {
    color: colors.textTertiary,
    fontSize: 10,
    marginTop: 4,
  },
  footer: {
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    gap: 10,
    marginTop: 8,
  },
  meta: {
    flex: 1,
    alignItems: 'flex-end',
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
  button: {
    minWidth: 82,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.grayLight,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
    gap: 6,
  },
  addButton: {
    backgroundColor: colors.primary,
  },
  buttonText: {
    color: colors.textSecondary,
    fontFamily: fonts.semiBold,
    fontSize: 12,
  },
  addButtonText: {
    color: colors.white,
  },
});

export default AppListCard;
