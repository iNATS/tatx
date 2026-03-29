import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { borderRadius, colors, fonts, shadows, spacing } from '../constants/theme';
import { useApp } from '../context/AppContext';

const OfferPromoCard = ({ offer, onPress, compact = false, fullWidth = false }) => {
  const { isRTL } = useApp();
  const cardHeight = compact ? 176 : 238;

  return (
    <TouchableOpacity
      activeOpacity={0.92}
      onPress={onPress}
      style={[styles.card, fullWidth ? styles.fullWidthCard : styles.railCard, { height: cardHeight }]}
    >
      <LinearGradient colors={['#8E0814', '#A10D1C', '#760610']} style={styles.background}>
        <View style={[styles.blob, styles.blobTop]} />
        <View style={[styles.blob, styles.blobMid]} />
        <View style={[styles.blob, styles.blobBottom]} />

        <View style={styles.content}>
          <View style={styles.leftColumn}>
            <View style={styles.badge}>
              <Ionicons name="sparkles-outline" size={14} color={colors.white} />
              <Text style={styles.badgeText}>{offer.vendor || 'عرض خاص'}</Text>
            </View>

            <Text style={[styles.title, compact && styles.titleCompact]} numberOfLines={compact ? 2 : 3}>
              {offer.title}
            </Text>

            <Text style={[styles.subtitle, compact && styles.subtitleCompact]} numberOfLines={compact ? 3 : 4}>
              {offer.subtitle}
            </Text>

            <View style={styles.ctaRow}>
              <View style={styles.ctaButton}>
                <Ionicons name={isRTL ? 'arrow-forward' : 'arrow-back'} size={18} color={colors.white} />
                <Text style={styles.ctaText}>تسوق الآن</Text>
              </View>
            </View>
          </View>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    overflow: 'hidden',
    borderRadius: 30,
    backgroundColor: '#8E0814',
    direction: 'rtl',
    ...shadows.md,
  },
  fullWidthCard: {
    width: '100%',
    marginBottom: spacing.md,
  },
  railCard: {
    width: 320,
  },
  background: {
    flex: 1,
    direction: 'rtl',
    justifyContent: 'center',
  },
  blob: {
    position: 'absolute',
    borderRadius: 999,
    backgroundColor: 'rgba(255,255,255,0.06)',
  },
  blobTop: {
    width: 120,
    height: 120,
    top: -20,
    right: -10,
  },
  blobMid: {
    width: 92,
    height: 92,
    top: 88,
    right: 96,
  },
  blobBottom: {
    width: 108,
    height: 108,
    bottom: -22,
    left: -12,
  },
  content: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    paddingRight: spacing.lg,
    paddingLeft: spacing.lg,
    paddingVertical: spacing.lg,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  leftColumn: {
    width: '74%',
    alignSelf: 'flex-start',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    maxWidth: '100%',
    gap: 6,
    backgroundColor: 'rgba(255,255,255,0.12)',
    borderRadius: borderRadius.full,
    paddingHorizontal: 14,
    paddingVertical: 8,
    marginBottom: spacing.md,
  },
  badgeText: {
    color: colors.white,
    fontFamily: fonts.semiBold,
    fontSize: 12,
    textAlign: 'left',
  },
  title: {
    color: colors.white,
    fontFamily: fonts.bold,
    fontSize: 31,
    lineHeight: 40,
    width: '100%',
    textAlign: 'left',
    alignSelf: 'stretch',
    writingDirection: 'ltr',
  },
  titleCompact: {
    fontSize: 24,
    lineHeight: 32,
  },
  subtitle: {
    color: 'rgba(255,255,255,0.9)',
    fontFamily: fonts.regular,
    fontSize: 14,
    lineHeight: 22,
    width: '100%',
    textAlign: 'left',
    alignSelf: 'stretch',
    marginTop: spacing.sm,
    writingDirection: 'ltr',
  },
  subtitleCompact: {
    fontSize: 12,
    lineHeight: 19,
  },
  ctaRow: {
    width: '100%',
    alignItems: 'flex-start',
    marginTop: spacing.lg,
  },
  ctaButton: {
    minWidth: 152,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-start',
    gap: 10,
    backgroundColor: '#FF8A1F',
    borderRadius: 18,
    paddingHorizontal: 22,
    paddingVertical: 14,
  },
  ctaText: {
    color: colors.white,
    fontFamily: fonts.bold,
    fontSize: 16,
    textAlign: 'left',
  },
});

export default OfferPromoCard;
