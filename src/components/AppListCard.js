import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { borderRadius, colors, fonts, shadows, spacing } from '../constants/theme';

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
}) => {
  const mediaFill = mediaBackground || `${mediaColor}18`;

  return (
    <TouchableOpacity style={styles.card} activeOpacity={0.92} onPress={onPress || onActionPress}>
      <View style={styles.contentSection}>
        <View style={styles.textBlock}>
          <Text style={styles.title} numberOfLines={2}>
            {title}
          </Text>
          {!!subtitle && (
            <Text style={styles.subtitle} numberOfLines={3}>
              {subtitle}
            </Text>
          )}
        </View>

        <View style={styles.footerRow}>
          <View style={styles.metaBlock}>
            {!!metaLabel && <Text style={styles.metaLabel}>{metaLabel}</Text>}
            {!!metaValue && <Text style={styles.metaValue}>{metaValue}</Text>}
          </View>

          <TouchableOpacity style={styles.actionButton} activeOpacity={0.88} onPress={onActionPress || onPress}>
            <Ionicons name="open-outline" size={18} color={colors.white} />
            <Text style={styles.actionText}>{actionLabel}</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={[styles.mediaSection, { backgroundColor: mediaFill }]}>
        {imageUri ? (
          <Image source={{ uri: imageUri }} style={styles.mediaImage} resizeMode="cover" />
        ) : (
          <View style={[styles.mediaIconWrap, { backgroundColor: colors.white }]}>
            <Ionicons name={mediaIcon || 'apps-outline'} size={34} color={mediaColor} />
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    minHeight: 188,
    flexDirection: 'row',
    backgroundColor: colors.card,
    borderRadius: 30,
    overflow: 'hidden',
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: '#E9EDF5',
    ...shadows.md,
  },
  contentSection: {
    flex: 1,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.lg,
    justifyContent: 'space-between',
    backgroundColor: colors.card,
  },
  textBlock: {
    alignItems: 'stretch',
  },
  title: {
    color: '#182033',
    fontFamily: fonts.bold,
    fontSize: 20,
    lineHeight: 30,
    textAlign: 'center',
  },
  subtitle: {
    color: '#6E7787',
    fontSize: 13,
    lineHeight: 22,
    marginTop: spacing.md,
    textAlign: 'center',
  },
  footerRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    marginTop: spacing.lg,
    gap: spacing.md,
  },
  metaBlock: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  metaLabel: {
    color: '#A0A8B7',
    fontFamily: fonts.bold,
    fontSize: 12,
    letterSpacing: 0.8,
  },
  metaValue: {
    color: '#182033',
    fontFamily: fonts.bold,
    fontSize: 18,
    marginTop: 6,
  },
  actionButton: {
    minWidth: 140,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    backgroundColor: '#141C30',
    borderRadius: 22,
    paddingHorizontal: 20,
    paddingVertical: 14,
    ...shadows.sm,
  },
  actionText: {
    color: colors.white,
    fontFamily: fonts.semiBold,
    fontSize: 15,
  },
  mediaSection: {
    width: 138,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.md,
  },
  mediaIconWrap: {
    width: 88,
    height: 88,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.sm,
  },
  mediaImage: {
    width: '100%',
    height: '100%',
    borderRadius: 0,
  },
});

export default AppListCard;
