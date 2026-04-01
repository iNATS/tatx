/**
 * Standard RTL Card Components
 * Following Apple HIG for RTL languages - No Shadows, Border-based Design
 */

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { colors, spacing, borderRadius, typography } from '../../constants/theme';

// ============================================
// Base Card Container
// ============================================
export const RTLCard = ({ 
  children, 
  onPress,
  variant = 'default',
  padding = 'md',
  style,
  ...props 
}) => {
  const variants = {
    default: {
      backgroundColor: colors.card,
      borderWidth: 1,
      borderColor: colors.borderLight,
    },
    elevated: {
      backgroundColor: colors.card,
      borderWidth: 1,
      borderColor: colors.border,
    },
    filled: {
      backgroundColor: colors.cardSecondary,
      borderWidth: 0,
    },
    outline: {
      backgroundColor: colors.background,
      borderWidth: 1,
      borderColor: colors.borderLight,
    },
  };

  const paddings = {
    none: 0,
    sm: spacing.sm,
    md: spacing.md,
    lg: spacing.lg,
  };

  const CardWrapper = onPress ? TouchableOpacity : View;

  return (
    <CardWrapper
      style={[
        styles.card,
        variants[variant],
        { padding: paddings[padding] },
        style,
      ]}
      onPress={onPress}
      activeOpacity={onPress ? 0.88 : 1}
      {...props}
    >
      {children}
    </CardWrapper>
  );
};

// ============================================
// Card Header (Title + Subtitle)
// ============================================
export const RTLCardHeader = ({ 
  title, 
  subtitle,
  action,
  onActionPress,
}) => {
  return (
    <View style={styles.cardHeader}>
      <View style={styles.cardHeaderContent}>
        <Text style={styles.cardTitle}>{title}</Text>
        {subtitle && (
          <Text style={styles.cardSubtitle}>{subtitle}</Text>
        )}
      </View>
      {action && (
        <TouchableOpacity onPress={onActionPress} style={styles.cardAction}>
          {action}
        </TouchableOpacity>
      )}
    </View>
  );
};

// ============================================
// Service Card (Icon + Title + Subtitle)
// ============================================
export const RTLServiceCard = ({ 
  icon,
  iconColor = colors.primary,
  title,
  subtitle,
  onPress,
  size = 'default',
}) => {
  const sizes = {
    small: { width: 80, height: 80, iconSize: 16 },
    default: { width: 96, height: 96, iconSize: 20 },
    large: { width: 120, height: 120, iconSize: 24 },
  };

  const currentSize = sizes[size];

  return (
    <TouchableOpacity
      style={[
        styles.serviceCard,
        { width: currentSize.width, height: currentSize.height },
      ]}
      onPress={onPress}
      activeOpacity={0.88}
    >
      <View style={[styles.serviceIcon, { backgroundColor: `${iconColor}15` }]}>
        {icon}
      </View>
      <Text style={styles.serviceTitle}>{title}</Text>
      {subtitle && (
        <Text style={styles.serviceSubtitle}>{subtitle}</Text>
      )}
    </TouchableOpacity>
  );
};

// ============================================
// Product Card (Image + Title + Price)
// ============================================
export const RTLProductCard = ({ 
  image,
  title,
  subtitle,
  price,
  currency = 'ر.س',
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={styles.productCard}
      onPress={onPress}
      activeOpacity={0.88}
    >
      <Image source={image} style={styles.productImage} resizeMode="cover" />
      <View style={styles.productContent}>
        <Text style={styles.productTitle} numberOfLines={2}>{title}</Text>
        {subtitle && (
          <Text style={styles.productSubtitle} numberOfLines={1}>{subtitle}</Text>
        )}
        <View style={styles.productPriceRow}>
          <Text style={styles.productPrice}>{price}</Text>
          <Text style={styles.productCurrency}>{currency}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

// ============================================
// Restaurant Card (Image + Info + Meta)
// ============================================
export const RLTRestaurantCard = ({ 
  image,
  name,
  category,
  deliveryTime,
  tags = [],
  isHot = false,
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={styles.restaurantCard}
      onPress={onPress}
      activeOpacity={0.88}
    >
      <Image source={image} style={styles.restaurantImage} resizeMode="cover" />
      <View style={styles.restaurantBody}>
        <View style={styles.restaurantTop}>
          {isHot && (
            <View style={styles.hotBadge}>
              <Text style={styles.hotBadgeText}>Hot</Text>
            </View>
          )}
          <View style={styles.restaurantInfo}>
            <Text style={styles.restaurantName}>{name}</Text>
            <Text style={styles.restaurantCategory}>{category}</Text>
          </View>
        </View>
        <View style={styles.restaurantBottom}>
          <View style={styles.deliveryBadge}>
            <Text style={styles.deliveryTime}>{deliveryTime} دقيقة</Text>
          </View>
          <View style={styles.tagsRow}>
            {tags.slice(0, 2).map((tag, index) => (
              <View key={index} style={styles.tagChip}>
                <Text style={styles.tagText}>{tag}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

// ============================================
// Offer Card (Full Image + Gradient Overlay)
// ============================================
export const RTLOfferCard = ({ 
  image,
  vendor,
  title,
  subtitle,
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={styles.offerCard}
      onPress={onPress}
      activeOpacity={0.88}
    >
      <Image source={image} style={styles.offerImage} resizeMode="cover" />
      <View style={styles.offerGradient}>
        <Text style={styles.offerVendor}>{vendor}</Text>
        <Text style={styles.offerTitle}>{title}</Text>
        <Text style={styles.offerSubtitle}>{subtitle}</Text>
      </View>
    </TouchableOpacity>
  );
};

// ============================================
// Menu Item Card (Horizontal Layout)
// ============================================
export const RTLMenuItemCard = ({ 
  icon,
  title,
  subtitle,
  price,
  currency = 'ر.س',
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={styles.menuItemCard}
      onPress={onPress}
      activeOpacity={0.88}
    >
      <View style={styles.menuItemIcon}>{icon}</View>
      <View style={styles.menuItemContent}>
        <Text style={styles.menuItemTitle}>{title}</Text>
        {subtitle && (
          <Text style={styles.menuItemSubtitle}>{subtitle}</Text>
        )}
      </View>
      <View style={styles.menuItemPrice}>
        <Text style={styles.menuItemPriceText}>{price}</Text>
        <Text style={styles.menuItemCurrency}>{currency}</Text>
      </View>
    </TouchableOpacity>
  );
};

// ============================================
// Stat Card (Value + Label)
// ============================================
export const RTLStatCard = ({ 
  value,
  label,
  icon,
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={styles.statCard}
      onPress={onPress}
      activeOpacity={0.88}
    >
      {icon && <View style={styles.statIcon}>{icon}</View>}
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </TouchableOpacity>
  );
};

// ============================================
// Filter Chip Card
// ============================================
export const RTLFilterChip = ({ 
  label,
  icon,
  isActive = false,
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.filterChip,
        isActive && styles.filterChipActive,
      ]}
      onPress={onPress}
      activeOpacity={0.88}
    >
      {icon && (
        <View style={styles.filterChipIcon}>
          {icon}
        </View>
      )}
      <Text style={[
        styles.filterChipText,
        isActive && styles.filterChipTextActive,
      ]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

// ============================================
// Profile Card (Avatar + Name + Info)
// ============================================
export const RTLProfileCard = ({ 
  avatar,
  name,
  subtitle,
  action,
  onActionPress,
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={styles.profileCard}
      onPress={onPress || onActionPress}
      activeOpacity={0.88}
    >
      <View style={styles.profileHeader}>
        <Image source={avatar} style={styles.profileAvatar} />
        <View style={styles.profileInfo}>
          <Text style={styles.profileName}>{name}</Text>
          {subtitle && (
            <Text style={styles.profileSubtitle}>{subtitle}</Text>
          )}
        </View>
        {action && (
          <TouchableOpacity onPress={onActionPress} style={styles.profileAction}>
            {action}
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );
};

// ============================================
// Empty State Card
// ============================================
export const RTLEmptyCard = ({ 
  icon,
  title,
  subtitle,
  action,
  onActionPress,
}) => {
  return (
    <View style={styles.emptyCard}>
      <View style={styles.emptyIcon}>{icon}</View>
      <Text style={styles.emptyTitle}>{title}</Text>
      {subtitle && (
        <Text style={styles.emptySubtitle}>{subtitle}</Text>
      )}
      {action && (
        <TouchableOpacity
          style={styles.emptyButton}
          onPress={onActionPress}
        >
          <Text style={styles.emptyButtonText}>{action}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

// ============================================
// Styles
// ============================================
const styles = StyleSheet.create({
  // Base Card
  card: {
    borderRadius: borderRadius.xl,
    writingDirection: 'rtl',
  },

  // Card Header
  cardHeader: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  cardHeaderContent: {
    flex: 1,
  },
  cardTitle: {
    ...typography.title3,
    color: colors.text,
    textAlign: 'right',
    writingDirection: 'rtl',
  },
  cardSubtitle: {
    ...typography.callout,
    color: colors.textSecondary,
    textAlign: 'right',
    writingDirection: 'rtl',
    marginTop: 2,
  },
  cardAction: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.cardSecondary,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.borderLight,
  },

  // Service Card
  serviceCard: {
    backgroundColor: colors.card,
    borderRadius: borderRadius.xl,
    borderWidth: 1,
    borderColor: colors.borderLight,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.md,
  },
  serviceIcon: {
    width: 48,
    height: 48,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
    borderWidth: 1,
    borderColor: colors.borderLight,
  },
  serviceTitle: {
    ...typography.subhead,
    color: colors.text,
    textAlign: 'center',
    writingDirection: 'rtl',
  },
  serviceSubtitle: {
    ...typography.caption1,
    color: colors.textSecondary,
    textAlign: 'center',
    writingDirection: 'rtl',
    marginTop: 4,
  },

  // Product Card
  productCard: {
    width: 176,
    backgroundColor: colors.card,
    borderRadius: borderRadius.xl,
    borderWidth: 1,
    borderColor: colors.borderLight,
    overflow: 'hidden',
  },
  productImage: {
    width: '100%',
    height: 120,
    backgroundColor: colors.cardSecondary,
  },
  productContent: {
    padding: spacing.sm,
  },
  productTitle: {
    ...typography.subhead,
    color: colors.text,
    textAlign: 'right',
    writingDirection: 'rtl',
  },
  productSubtitle: {
    ...typography.caption1,
    color: colors.textSecondary,
    textAlign: 'right',
    writingDirection: 'rtl',
    marginTop: 4,
  },
  productPriceRow: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    marginTop: spacing.xs,
    gap: 4,
  },
  productPrice: {
    ...typography.headline,
    color: colors.primary,
    writingDirection: 'rtl',
  },
  productCurrency: {
    ...typography.caption1,
    color: colors.primary,
  },

  // Restaurant Card
  restaurantCard: {
    backgroundColor: colors.card,
    borderRadius: borderRadius.xl,
    borderWidth: 1,
    borderColor: colors.borderLight,
    flexDirection: 'row-reverse',
    alignItems: 'center',
    padding: spacing.md,
    gap: spacing.md,
  },
  restaurantImage: {
    width: 88,
    height: 88,
    borderRadius: borderRadius.lg,
    backgroundColor: colors.cardSecondary,
  },
  restaurantBody: {
    flex: 1,
    gap: spacing.sm,
  },
  restaurantTop: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  restaurantInfo: {
    flex: 1,
    marginHorizontal: spacing.sm,
  },
  restaurantName: {
    ...typography.headline,
    color: colors.text,
    textAlign: 'right',
    writingDirection: 'rtl',
  },
  restaurantCategory: {
    ...typography.caption1,
    color: colors.textSecondary,
    textAlign: 'right',
    writingDirection: 'rtl',
    marginTop: 2,
  },
  hotBadge: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.full,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: colors.borderLight,
  },
  hotBadgeText: {
    ...typography.caption2,
    color: colors.primary,
    fontFamily: typography.bold,
    writingDirection: 'ltr',
  },
  restaurantBottom: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: spacing.sm,
  },
  deliveryBadge: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#FFE8EE',
    borderRadius: borderRadius.full,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: colors.borderLight,
  },
  deliveryTime: {
    ...typography.caption1,
    color: colors.primary,
    writingDirection: 'rtl',
  },
  tagsRow: {
    flexDirection: 'row-reverse',
    gap: spacing.xs,
  },
  tagChip: {
    backgroundColor: colors.cardSecondary,
    borderRadius: borderRadius.full,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: colors.borderLight,
  },
  tagText: {
    ...typography.caption2,
    color: colors.textSecondary,
    writingDirection: 'rtl',
  },

  // Offer Card
  offerCard: {
    width: 280,
    height: 200,
    borderRadius: borderRadius.xl,
    borderWidth: 1,
    borderColor: colors.borderLight,
    overflow: 'hidden',
  },
  offerImage: {
    width: '100%',
    height: '100%',
  },
  offerGradient: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    padding: spacing.lg,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  offerVendor: {
    ...typography.caption1,
    color: 'rgba(255,255,255,0.9)',
    textAlign: 'right',
    writingDirection: 'rtl',
  },
  offerTitle: {
    ...typography.title2,
    color: colors.white,
    textAlign: 'right',
    writingDirection: 'rtl',
    marginTop: spacing.xs,
  },
  offerSubtitle: {
    ...typography.callout,
    color: 'rgba(255,255,255,0.9)',
    textAlign: 'right',
    writingDirection: 'rtl',
    marginTop: spacing.xs,
  },

  // Menu Item Card
  menuItemCard: {
    backgroundColor: colors.card,
    borderRadius: borderRadius.xl,
    borderWidth: 1,
    borderColor: colors.borderLight,
    flexDirection: 'row-reverse',
    alignItems: 'center',
    padding: spacing.md,
    gap: spacing.md,
  },
  menuItemIcon: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: colors.cardSecondary,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.borderLight,
  },
  menuItemContent: {
    flex: 1,
  },
  menuItemTitle: {
    ...typography.headline,
    color: colors.text,
    textAlign: 'right',
    writingDirection: 'rtl',
  },
  menuItemSubtitle: {
    ...typography.caption1,
    color: colors.textSecondary,
    textAlign: 'right',
    writingDirection: 'rtl',
    marginTop: 2,
  },
  menuItemPrice: {
    alignItems: 'flex-end',
  },
  menuItemPriceText: {
    ...typography.headline,
    color: colors.primary,
    writingDirection: 'rtl',
  },
  menuItemCurrency: {
    ...typography.caption1,
    color: colors.primary,
    textAlign: 'left',
  },

  // Stat Card
  statCard: {
    flex: 1,
    backgroundColor: colors.card,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.borderLight,
    padding: spacing.md,
    alignItems: 'center',
  },
  statIcon: {
    marginBottom: spacing.sm,
  },
  statValue: {
    ...typography.title2,
    color: colors.text,
    writingDirection: 'ltr',
  },
  statLabel: {
    ...typography.caption1,
    color: colors.textSecondary,
    textAlign: 'center',
    writingDirection: 'rtl',
    marginTop: 2,
  },

  // Filter Chip
  filterChip: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    gap: spacing.xs,
    paddingHorizontal: spacing.md,
    paddingVertical: 10,
    borderRadius: borderRadius.full,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.borderLight,
  },
  filterChipActive: {
    backgroundColor: colors.primary,
    borderColor: 'transparent',
  },
  filterChipIcon: {
    width: 16,
    height: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterChipText: {
    ...typography.subhead,
    color: colors.textSecondary,
    writingDirection: 'rtl',
  },
  filterChipTextActive: {
    color: colors.white,
  },

  // Profile Card
  profileCard: {
    backgroundColor: colors.card,
    borderRadius: borderRadius.xl,
    borderWidth: 1,
    borderColor: colors.borderLight,
    padding: spacing.lg,
  },
  profileHeader: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    gap: spacing.md,
  },
  profileAvatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.cardSecondary,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    ...typography.headline,
    color: colors.text,
    textAlign: 'right',
    writingDirection: 'rtl',
  },
  profileSubtitle: {
    ...typography.caption1,
    color: colors.textSecondary,
    textAlign: 'right',
    writingDirection: 'rtl',
    marginTop: 2,
  },
  profileAction: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.cardSecondary,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.borderLight,
  },

  // Empty Card
  emptyCard: {
    backgroundColor: colors.card,
    borderRadius: borderRadius.xl,
    borderWidth: 1,
    borderColor: colors.borderLight,
    padding: spacing.xl,
    alignItems: 'center',
  },
  emptyIcon: {
    width: 82,
    height: 82,
    borderRadius: 28,
    backgroundColor: colors.cardSecondary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.borderLight,
  },
  emptyTitle: {
    ...typography.title3,
    color: colors.text,
    textAlign: 'center',
    writingDirection: 'rtl',
  },
  emptySubtitle: {
    ...typography.callout,
    color: colors.textSecondary,
    textAlign: 'center',
    writingDirection: 'rtl',
    marginTop: spacing.sm,
  },
  emptyButton: {
    marginTop: spacing.lg,
    backgroundColor: colors.primary,
    borderRadius: borderRadius.full,
    paddingVertical: 14,
    paddingHorizontal: spacing.xl,
  },
  emptyButtonText: {
    ...typography.button,
    color: colors.white,
    writingDirection: 'rtl',
  },
});

// Export all components
export default {
  RTLCard,
  RTLCardHeader,
  RTLServiceCard,
  RTLProductCard,
  RLTRestaurantCard,
  RTLOfferCard,
  RTLMenuItemCard,
  RTLStatCard,
  RTLFilterChip,
  RTLProfileCard,
  RTLEmptyCard,
};
