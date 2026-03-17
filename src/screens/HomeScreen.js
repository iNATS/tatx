import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, TextInput, Platform } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, spacing, typography, borderRadius, shadows } from '../constants/theme';
import { categories, restaurants } from '../data/staticData';
import { useApp } from '../context/AppContext';

const HomeScreen = ({ navigation }) => {
  const { isRTL, user } = useApp();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const insets = useSafeAreaInsets();

  const renderCategory = (category) => (
    <TouchableOpacity
      key={category.id}
      style={styles.categoryItem}
      onPress={() => setSelectedCategory(category.id)}
    >
      <View style={[styles.categoryIcon, { backgroundColor: category.color + '20' }]}>
        <Ionicons name={category.icon} size={28} color={category.color} />
      </View>
      <Text style={styles.categoryName}>{category.name}</Text>
    </TouchableOpacity>
  );

  const renderRestaurant = (restaurant) => (
    <TouchableOpacity
      key={restaurant.id}
      style={styles.restaurantItem}
      onPress={() => navigation.navigate('RestaurantDetail', { restaurant })}
    >
      <Image source={{ uri: restaurant.logo }} style={styles.restaurantLogo} />
      <View style={styles.restaurantInfo}>
        <Text style={styles.restaurantName}>{restaurant.name}</Text>
        <Text style={styles.restaurantTags}>{restaurant.tags.join(' • ')}</Text>
        <View style={styles.restaurantMeta}>
          <Text style={styles.restaurantDelivery}>
            التوصيل ر.س {restaurant.deliveryFee} | {restaurant.deliveryTime} دق
          </Text>
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={14} color={colors.warning} />
            <Text style={styles.ratingText}>{restaurant.rating}</Text>
          </View>
        </View>
      </View>
      <Ionicons name="chevron-forward" size={24} color={colors.gray} />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header with Safe Area */}
      <View style={[styles.header, { paddingTop: Math.max(insets.top, spacing.md) }]}>
        <TouchableOpacity onPress={() => navigation.navigate('Location')} style={styles.locationWrapper}>
          <View style={styles.locationContainer}>
            <View style={styles.locationIconWrapper}>
              <Ionicons name="location" size={18} color={colors.white} />
            </View>
            <View>
              <Text style={styles.locationLabel}>التوصيل الى</Text>
              <Text style={styles.locationText} numberOfLines={1}>
                شارع الملك عبد العزيز، الدمام
              </Text>
            </View>
            <Ionicons name="chevron-down" size={20} color={colors.white} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity 
          onPress={() => navigation.navigate('Search')}
          style={styles.searchButton}
        >
          <Ionicons name="search" size={22} color={colors.white} />
        </TouchableOpacity>
      </View>

      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Banner */}
        <View style={styles.banner}>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600' }}
            style={styles.bannerImage}
          />
          <View style={styles.bannerOverlay}>
            <Text style={styles.bannerTitle}>مطاعم منوعة</Text>
            <Text style={styles.bannerSubtitle}>و اكلات شهية</Text>
          </View>
          <View style={styles.bannerLogo}>
            <Text style={styles.bannerLogoText}>TATX</Text>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActions}>
          <TouchableOpacity 
            style={styles.quickAction}
            onPress={() => navigation.navigate('Taxi')}
          >
            <View style={[styles.quickActionIcon, { backgroundColor: colors.primary + '20' }]}>
              <Ionicons name="taxi" size={28} color={colors.primary} />
            </View>
            <Text style={styles.quickActionText}>تاكسي</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.quickAction}>
            <View style={[styles.quickActionIcon, { backgroundColor: colors.success + '20' }]}>
              <Ionicons name="fast-food" size={28} color={colors.success} />
            </View>
            <Text style={styles.quickActionText}>طعام</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.quickAction}>
            <View style={[styles.quickActionIcon, { backgroundColor: colors.info + '20' }]}>
              <Ionicons name="cart" size={28} color={colors.info} />
            </View>
            <Text style={styles.quickActionText}>تسوق</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.quickAction}>
            <View style={[styles.quickActionIcon, { backgroundColor: colors.warning + '20' }]}>
              <Ionicons name="gift" size={28} color={colors.warning} />
            </View>
            <Text style={styles.quickActionText}>هدايا</Text>
          </TouchableOpacity>
        </View>

        {/* Categories */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>التصنيفات</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>عرض الكل</Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.categoriesContainer}>
              {categories.map(renderCategory)}
            </View>
          </ScrollView>
        </View>

        {/* Featured Restaurants */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>المحلات المختارة</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>عرض الكل</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.restaurantsContainer}>
            {restaurants.map(renderRestaurant)}
          </View>
        </View>

        {/* Bottom padding for tab bar */}
        <View style={{ height: 20 }} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.md,
    backgroundColor: colors.primary,
  },
  locationWrapper: {
    flex: 1,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationIconWrapper: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.sm,
  },
  locationLabel: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.8)',
    marginBottom: 2,
  },
  locationText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.white,
    maxWidth: 200,
  },
  searchButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: spacing.sm,
  },
  scrollContent: {
    paddingBottom: spacing.xl,
  },
  banner: {
    height: 180,
    margin: spacing.md,
    borderRadius: borderRadius.xl,
    overflow: 'hidden',
    position: 'relative',
    ...shadows.md,
  },
  bannerImage: {
    width: '100%',
    height: '100%',
  },
  bannerOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'flex-end',
    padding: spacing.lg,
  },
  bannerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.white,
    textAlign: 'right',
  },
  bannerSubtitle: {
    fontSize: 20,
    color: colors.white,
    textAlign: 'right',
    marginTop: spacing.xs,
  },
  bannerLogo: {
    position: 'absolute',
    top: spacing.md,
    right: spacing.md,
    backgroundColor: colors.white,
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: borderRadius.full,
  },
  bannerLogoText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: colors.text,
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: spacing.md,
    marginBottom: spacing.lg,
  },
  quickAction: {
    alignItems: 'center',
  },
  quickActionIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  quickActionText: {
    fontSize: 13,
    color: colors.text,
    fontWeight: '600',
  },
  section: {
    marginTop: spacing.md,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    marginBottom: spacing.sm,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
  },
  seeAll: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '600',
  },
  categoriesContainer: {
    flexDirection: 'row',
    paddingHorizontal: spacing.sm,
  },
  categoryItem: {
    alignItems: 'center',
    padding: spacing.sm,
    minWidth: 80,
    marginRight: spacing.sm,
  },
  categoryIcon: {
    width: 60,
    height: 60,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  categoryName: {
    fontSize: 12,
    color: colors.text,
    textAlign: 'center',
  },
  restaurantsContainer: {
    backgroundColor: colors.white,
    marginHorizontal: spacing.md,
    borderRadius: borderRadius.xl,
    overflow: 'hidden',
    ...shadows.md,
  },
  restaurantItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.grayLight,
  },
  restaurantLogo: {
    width: 60,
    height: 60,
    borderRadius: 12,
    backgroundColor: colors.grayLight,
  },
  restaurantInfo: {
    flex: 1,
    marginHorizontal: spacing.md,
  },
  restaurantName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 2,
  },
  restaurantTags: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  restaurantMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  restaurantDelivery: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.text,
    marginLeft: 2,
  },
});

export default HomeScreen;
